# 国际化
## locale
目录结构

``` TS
locale/
├── context.ts          # LocaleContext 的 React Context 定义
├── index.tsx           # LocaleProvider 组件和 Locale 类型导出
├── useLocale.ts        # useLocale Hook - 组件获取国际化文案的钩子
├── zh_CN.ts            # 中文简体语言包
├── zh_TW.ts            # 繁体中文语言包
├── zh_HK.ts            # 香港繁体语言包
├── en_US.ts            # 英文语言包
├── pt_BR.ts            # 巴西葡萄牙语语言包
├── pt_PT.ts            # 葡萄牙语语言包
└── utils/
    ├── index.ts
    └── localeComponent.tsx   # 国际化相关工具函数
```
### context.ts - Context 定义
``` TS
import { createContext } from 'react';

import type { Locale } from '.';

export type LocaleContextProps = Locale & { exist?: boolean };

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export default LocaleContext;
```
#### TS
``` TS
export type LocaleContextProps = Locale & { exist?: boolean };
```
1. 交叉类型 `&`：组合两个类型生成一个新的类型。
2. 可选属性 `?`：标记属性为可选，可存在可不存在。
3. 类型别名 `type`：定义类型别名，便于代码重用和提高可读性。

###  index.tsx - LocaleProvider 组件
内容
``` TS
// Locale 类型定义
export interface Locale {
  locale: string;              // 语言代码：'zh_CN', 'en_US' 等
  ErrorPage: ErrorPageLocale;  // ErrorPage 组件的文案
  BeTable: BeTableLocale;      // BeTable 组件的文案
  Filter: FilterLocale;        // Filter 组件的文案
  // ... 17+ 个组件的国际化配置
  mtd: any;                    // MTD 组件库的配置
}

// LocaleProvider 组件
const LocaleProvider = (props: LocaleProviderProps) => {
  const { locale = {} as Locale, children } = props;
  const getMemoizedContextValue = useMemo(() => {
    return { ...locale, exist: true };
  }, [locale]);
  
  return (
    <LocaleContext.Provider value={getMemoizedContextValue}>
      {children}
    </LocaleContext.Provider>
  );
};
```
作用
- 定义了完整的 Locale 类型，包含所有组件的国际化配置
- 提供 LocaleProvider 组件，包裹子组件并向下传递 locale 配置
- 使用 useMemo 优化性能，避免不必要的重新渲染

知识点
1. React Context API
- LocaleContext.Provider 用于向组件树中的任何位置提供 LocaleContext，使得所有子组件都能通过 useContext 或 Consumer 来访问它的值。
- Context 用来解决组件间的"传递 props"问题，避免了逐层传递 props 的麻烦。
2. useMemo Hook：
- useMemo 用来缓存计算结果，只有在依赖项（[locale]）发生变化时才会重新计算值。它有助于优化性能，避免不必要的计算和渲染。
- 在这里，它确保当 locale 改变时，getMemoizedContextValue 会重新计算，否则就使用之前计算好的值。
3. 类型断言：
- 在 locale = {} as Locale 中，使用了类型断言，将空对象 {} 强制转换为 Locale 类型。
4. 解构赋值
- const { locale = {} as Locale, children } = props; 语法是解构赋值的标准用法，从 props 中提取 locale 和 children 属性，locale 如果没有传递，则默认为一个空对象。

### useLocale.ts - Hook 核心逻辑
``` TS
import React, { useContext } from 'react';
import { isFunction } from 'lodash-es';

import type { Locale } from '.';
// eslint-disable-next-line no-duplicate-imports
import LocaleContext from './context';
import defaultLocaleData from './zh_CN';

// TS 是 Locale 类型的所有键（keyof Locale）中排除了 'locale' 键的集合。
export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

// TS 泛型 C extends LocaleComponentName，这意味着 componentName 的类型会从 LocaleComponentName 中选择一个具体的值
const useLocale = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
) => {
  const fullLocale = useContext(LocaleContext);
  const getLocale = React.useMemo(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = fullLocale?.[componentName] ?? {};
    return {
      ...(isFunction(locale) ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, fullLocale]);

  const getLocaleCode = React.useMemo(() => {
    const localeCode = fullLocale?.locale;
    /** ant 有bug */
    if (!fullLocale?.exist || !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }, [fullLocale]);

  // as const 确保 useLocale 返回的元组是不可变的
  return [getLocale, getLocaleCode] as const;
};

export default useLocale;
```

作用：
- 核心 Hook，所有组件通过它获取国际化文案
- 支持默认值和 Context 值的合并（Context 优先级更高）
- 返回两个值：
    - locale - 组件的国际化文案对象
    - localeCode - 当前语言代码

### 工作流程
``` plain text
1. 全局配置
   <BeConfigProvider locale={enLocale}>

2. LocaleProvider 包装
   <LocaleProvider locale={enLocale}>
     <LocaleContext.Provider value={enLocale}>

3. 组件使用 Hook
   const [locale] = useLocale('BeTable');
   ↓
   从 Context 中获取 BeTable 的配置
   ↓
   返回 { empty: 'No data', sort: {...} }

4. 渲染文案
   <div>{locale.empty}</div>
   ↓
   显示 "No data"
```

## 国际化的三重架构
``` plain text
第一层：BeConfigProvider
   │
   ├─ 接收 locale prop
   ├─ 同步验证器语言 (bv.setLocale)
   └─ 传递给 MTD 和 BeConfigContext
   
第二层：BeConfigContext + LocaleProvider
   │
   ├─ 处理 locale 继承
   ├─ 包装 LocaleProvider
   └─ 分发到 ConfigContext
   
第三层：组件内部
   │
   └─ 使用 useLocale Hook 获取文案
```

## 数据流程图
``` TS
// Step 1: 组件接收 props
<BeConfigContext locale={enLocale}>

// Step 2: 读取父级 Context
const legacyLocale = useContext(LocaleContext);  // zhLocale (父级的)

// Step 3: 处理继承
const baseConfig = {
  locale: enLocale || zhLocale  // enLocale (当前层的)
}

// Step 4: 合并配置
const config = {
  ...parentContext,
  locale: enLocale  // ← 覆盖父级的
}

// Step 5: Memo 优化
const memoedConfig = useRcMemo(() => config, ...)

// Step 6: 包装 LocaleProvider
let childNode = <>{children}</>;
if (enLocale) {  // 有 locale
  childNode = (
    <LocaleProvider locale={enLocale}>
      {children}
    </LocaleProvider>
  );
}

// Step 7: LocaleProvider 内部
<LocaleContext.Provider value={{ ...enLocale, exist: true }}>
  {children}
</LocaleContext.Provider>

// Step 8: 分发到 ConfigContext
<ConfigContext.Provider value={memoedConfig}>
  {childNode}
</ConfigContext.Provider>

// Step 9: 最终结构
<ConfigContext.Provider value={{ locale: enLocale, ... }}>
  <LocaleContext.Provider value={{ ...enLocale, exist: true }}>
    {children}  // ← 子组件可以通过两种方式获取 locale
  </LocaleContext.Provider>
</ConfigContext.Provider>
```