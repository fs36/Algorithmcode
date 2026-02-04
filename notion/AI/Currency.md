# Currency 组件实现完全指南

**目录**
1. [需求分析](#需求分析)
2. [技术调研](#技术调研)
3. [架构设计](#架构设计)
4. [API 设计](#api-设计)
5. [类型系统](#类型系统)
6. [工具函数和 Hooks](#工具函数和-hooks)
7. [自动化测试](#自动化测试)

---

## 需求分析

### 核心功能需求

Currency 是一个**企业级货币金额输入组件**，主要解决如下问题：

#### 1.1 输入功能需求

- **精确的数值输入**：支持任意精度的金额输入（整数位、小数位）
- **自动格式化**：在用户输入时自动添加千分位分隔符
- **实时验证**：验证输入的合法性，过滤非数字字符
- **小数精度**：支持配置小数位数（如 CNY 2 位，JPY 0 位）

**场景示例**：
```
用户输入："1234567.1"
自动格式化为："1,234,567.10" (CNY, 2位小数)
实际值存储："1234567.1"
```

#### 1.2 多币种需求

- **单币种模式**：默认单一币种，如仅支持 CNY
- **多币种模式**：通过下拉框切换币种
- **币种保留**：币种切换时可选是否保留金额
- **币种格式**：不同币种有不同的格式化规则
  - CNY：千分位 `,`，小数点 `.`，2 位小数
  - USD：千分位 `,`，小数点 `.`，2 位小数
  - JPY：无小数，整数显示

**场景示例**：
```
切换前：CNY 1000.50
切换币种到 USD → USD 1000.50 (保留)
```

#### 1.3 显示需求

- **前缀/后缀**：可配置显示币种代码或符号
  - `prefix="currency"`：显示 "CNY 1,000.00"
  - `prefix="symbol"`：显示 "￥1,000.00"
  - `suffix="currency"`：显示 "1,000.00 CNY"

- **占位符**：当无值时显示占位提示文字

#### 1.4 交互需求

- **受控/非受控**：支持 React 受控组件模式
- **值变更触发**：支持 `onInput`、`onBlur`、`onPressEnter` 多种触发时机
- **范围限制**：`min`/`max` 值限制，超出时触发回调
- **滚轮支持**：支持鼠标滚轮进行 ±step 操作
- **键盘事件**：支持 Enter 提交、Tab 切换等

**场景示例**：
```
默认：blur 时触发 onChange
配置：dispatchChange=['onInput', 'onBlur']，输入时实时触发
滚轮：聚焦时滚动，金额 ±1
```

#### 1.5 表单集成

- **表单控件**：集成 BeForm，支持 `fieldName` 绑定
- **校验集成**：支持表单的校验流程
- **状态同步**：表单的 disabled、readOnly 状态同步到组件

### 使用场景

| 场景 | 需求 |
|------|------|
| 订单系统 | 多币种支持、金额精确性 |
| 转账页面 | 范围限制（min/max）、实时提交 |
| 报价单 | 自定义显示格式、前缀后缀 |
| 财务系统 | 极大金额支持、精度保证 |
| 移动端 | 响应式尺寸、键盘友好 |

---

## 技术调研

### 2.1 浮点数精度问题

JavaScript 原生浮点数计算存在精度丢失：

```javascript
// 问题演示
0.1 + 0.2                    // 0.30000000000000004
100.1 + 0.2                  // 100.29999999999999
Math.round(0.1 * 100) / 100  // 0.1（看起来正常，但中间过程有损失）
```

**解决方案**：
- ✅ **字符串存储**：所有金额使用字符串存储，永不转为浮点数
- ✅ **BigNumber 库**：计算时使用 BigNumber 而不是原生运算符
- ✅ **拆分存储**：整数部分和小数部分分别存储和处理

### 2.2 输入法兼容性

中文输入法会产生圆角/全角符号：

```
输入法输入：。（圆角句号）
需要修复为：. （半角英文句号）

输入法输入：，（圆角逗号）
需要修复为：, （半角英文逗号）
```

**解决方案**：
- 在 Parser 阶段进行 `fixDot()` 转换
- 统一所有小数点符号到标准格式

### 2.3 光标位置管理

用户输入 "1000"，格式化为 "1,000" 时，光标位置会错乱：

```
用户输入：1|000（光标在 1 后）
格式化后：1,|000（光标应该在 1, 后）
```

**解决方案**：
- 记录格式化前的光标位置
- 格式化后恢复到正确位置
- 使用 `useCursor` Hook 管理

### 2.4 竞品分析

| 组件 | 特点 | 不足 |
|------|------|------|
| Ant Design InputNumber | 支持 step、min/max | 不支持多币种 |
| Material-UI TextField | 灵活高度 | 需要手动组合 |
| 自定义方案 | 完全控制 | 复杂度高 |

**Currency 的优势**：
- ✅ 完整的多币种支持
- ✅ 企业级精度保证
- ✅ 富交互能力（滚轮、快捷键等）
- ✅ 表单深度集成

### 2.5 依赖库选择

```json
{
  "dependencies": {
    "bignumber.js": "^9.0.0",      // 精确计算
    "@ss/mtd-react3": "^3.0.0",    // 基础 Input/Select
    "ahooks": "^10.0.0",            // useControllableValue
    "lodash-es": "^4.17.0",        // 工具函数
    "@finfe/beetle-utils": "^1.0.0" // warning 日志
  }
}
```

---

## 架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────┐
│                    用户输入                          │
└────────────────┬────────────────────────────────────┘
                 ▼
    ┌────────────────────────────┐
    │   CurrencyPC (主分发组件)    │ ◄─── 根据 multiple 决策
    └─┬──────────────────┬───────┘
      │                  │
      ▼                  ▼
  ┌─────────┐        ┌──────────┐
  │  Single │        │ Multiple │
  │         │        │          │
  │ Input   │        │ Select + │
  │         │        │ Input    │
  └────┬────┘        └──────┬───┘
       │                    │
       └────────┬───────────┘
                ▼
   ┌─────────────────────────────┐
   │   CurrencyProvider (全局配置) │
   │  - currencyOption           │
   │  - localFormat              │
   │  - formatConfig             │
   └─────────────────────────────┘
```

### 3.2 数据流

```
┌──────────────────┐
│   用户输入事件     │
└────────┬─────────┘
         ▼
  ┌─────────────┐
  │  validateDisplayValue (验证)  │
  │  是否合法数字？              │
  └─────┬───────┘
        │ 合法
        ▼
  ┌──────────────┐
  │  parseMoney  │ (清洗)
  │  移除千分位  │
  │  统一小数点  │
  └──────┬───────┘
         ▼
  ┌────────────────────┐
  │  new Money()       │ (拆分存储)
  │  integerPart       │
  │  decimalPart       │
  └────────┬───────────┘
           ▼
  ┌────────────────────┐
  │  stripZeroInlineStart │ (去除前置0)
  └────────┬───────────┘
           ▼
  ┌────────────────────┐
  │  fixDecimalBite    │ (小数精度)
  │  补零/去零         │
  │  四舍五入/截断    │
  └────────┬───────────┘
           ▼
  ┌──────────────────┐
  │  formatValue()   │ (添加千分位)
  │  显示格式化      │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │   setInputValue  │ (更新 UI)
  │   恢复光标位置   │
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │   onChange()     │ (通知外层)
  │   触发回调       │
  └──────────────────┘
```

### 3.3 组件分工

| 组件 | 职责 | 复杂度 |
|------|------|--------|
| **CurrencyPC** | 路由分发，props 处理 | ⭐ |
| **Single** | 单币种输入核心逻辑 | ⭐⭐⭐⭐⭐ |
| **Multiple** | 多币种选择 + 输入 | ⭐⭐⭐ |
| **BeFormatAmount** | 纯展示组件 | ⭐ |
| **CurrencyProvider** | 全局配置提供者 | ⭐ |

### 3.4 状态管理策略

**关键决策：分离 `decimalValue` 和 `inputValue`**

```typescript
// ❌ 反面例子：两个值混在一起
const [value, setValue] = useState("1000.1");
// 格式化时直接改 value，导致父组件重新渲染

// ✅ 正确做法：分离实际值和显示值
const [decimalValue, setDecimalValue] = useState("1000.1");  // 实际值
const [inputValue, setInputValue] = useState("1,000.10");    // 显示值
// 格式化只改 inputValue，decimalValue 保持不变
```

**好处**：
1. 避免频繁 re-render（decimalValue 不变时不触发重新计算）
2. 保持内部值的精确性（decimalValue 永不格式化）
3. 减少状态同步问题

---

## API 设计

### 4.1 组件 Props 设计

```typescript
interface CurrencyProps extends FormControlProps {
  // ========== 显示配置 ==========
  prefix?: 'currency' | 'symbol' | 'none';      // 前缀显示模式
  suffix?: 'currency' | 'symbol' | 'none';      // 后缀显示模式
  
  // ========== 多币种配置 ==========
  multiple?: boolean;                           // 是否支持多币种切换
  currencyOption?: ICurrencyMeta | ICurrencyMeta[];  // 币种列表
  keepAmountOnCurrencyChange?: boolean;         // 币种切换时是否保留金额
  
  // ========== 值控制 ==========
  defaultValue?: ICurrencyValue;                // 默认值 {currency, value}
  value?: ICurrencyValue;                       // 受控值
  onChange?: (value: ICurrencyValue) => void;   // 值变更回调
  
  // ========== 格式化配置 ==========
  localFormat?: Partial<FormatType>;            // 个性化格式配置
  formatConfig?: IFormatConfig;                 // 格式化选项
  
  // ========== 事件回调 ==========
  onBlur?: (event: React.FocusEvent) => void;
  onPressEnter?: (event: React.KeyboardEvent) => void;
  onStep?: (value: string, options: any) => void;
  onChangeMax?: (value: string) => void;        // 超过最大值
  onChangeMin?: (value: string) => void;        // 低于最小值
  
  // ========== 交互配置 ==========
  dispatchChange?: Array<'onInput' | 'onPressEnter' | 'onBlur'>;
  min?: number;                                 // 最小值
  max?: number;                                 // 最大值
  wheel?: boolean;                              // 是否启用滚轮
  step?: number;                                // 滚轮步长
  
  // ========== UI 配置 ==========
  size?: SizeType;                              // 尺寸
  disabled?: boolean;                           // 禁用
  readOnly?: boolean;                           // 只读
  placeholder?: string;                         // 占位提示
  renderOption?: (option: ICurrencyMeta) => React.ReactNode;
  
  // ========== 样式 ==========
  className?: string;
  classNames?: {
    inputCls?: string;
    selectCls?: string;
    prefixCls?: string;
    suffixCls?: string;
  };
  
  // ========== 透传 ==========
  inputProps?: Partial<CurrInputProps>;
  selectProps?: Partial<CurrSelectProps>;
}
```

### 4.2 值格式设计

```typescript
// 组件值格式：始终是对象
interface ICurrencyValue {
  currency?: string;   // 币种代码："CNY"
  value?: string;      // 金额字符串："1000.50"
}

// 使用示例
defaultValue={{ currency: 'CNY', value: '' }}
value={{ currency: 'USD', value: '1234.56' }}
```

**为什么用对象而不是字符串？**
- ✅ 币种和金额必须一起变更
- ✅ 便于未来扩展（如添加汇率、转换信息）
- ✅ 类型安全，避免解析字符串的复杂性

### 4.3 格式化配置设计

```typescript
interface IBaseFormatConfig {
  // 前置零处理
  removeZeroInHead: boolean;
  // 如果为 true：00123 → 123
  // 如果为 false：00123 → 00123
  
  // 小数零处理
  zeroMode: 'padZero' | 'stripZero' | 'none';
  // 'padZero'：3.1 → 3.10（补零）
  // 'stripZero'：3.10 → 3.1（去零）
  // 'none'：保持不变
  
  // 小数精度处理
  decimalMode: 'round' | 'truncate' | 'none';
  // 'round'：3.149 → 3.15（四舍五入）
  // 'truncate'：3.149 → 3.14（截断）
  // 'none'：保持不变
}
```

### 4.4 货币元数据设计

```typescript
interface ICurrencyMeta {
  currency: string;      // 币种代码："CNY"
  symbol: string;        // 币种符号："￥"
  currencyName?: string; // 币种名称："人民币"
  group: number;         // 千分位分割位置：3
  groupSymbol: string;   // 千分位符号：","
  decimalSymbol: string; // 小数点符号："."
  decimal: number;       // 小数位数：2
  integer: number;       // 最大整数位数：15
}

// 预定义常数
const CurrencyMeta = {
  CNY: {
    currency: 'CNY',
    symbol: '￥',
    currencyName: '人民币',
    group: 3,
    groupSymbol: ',',
    decimalSymbol: '.',
    decimal: 2,
    integer: 15,
  },
  USD: {
    currency: 'USD',
    symbol: '$',
    currencyName: '美元',
    group: 3,
    groupSymbol: ',',
    decimalSymbol: '.',
    decimal: 2,
    integer: 15,
  },
};
```

### 4.5 BeFormatAmount Props

```typescript
interface IFormatAmountProps extends HTMLBeetleProps<'span'> {
  // 显示配置
  prefix?: 'currency' | 'symbol' | 'none';
  suffix?: 'currency' | 'symbol' | 'none';
  
  // 值
  value?: ICurrencyValue;                      // {currency, value}
  
  // 格式化
  formatConfig?: IFormatConfig;
  currencyOption?: ICurrencyMeta | ICurrencyMeta[];
  
  // UI
  placeholder?: string;                        // 无值时的占位
  className?: string;
  classNames?: {
    textCls?: string;
    prefixCls?: string;
    suffixCls?: string;
    placeholderCls?: string;
  };
}
```

---

## 类型系统

### 5.1 核心类型定义

```typescript
// ========== Money 类的元数据 ==========
interface IMoneyMeta {
  originValue: string;        // 原始输入
  integerPart: string;        // 整数部分
  decimalPart: string;        // 小数部分
  negative: boolean;          // 是否负数
  hasDecimal: boolean;        // 是否有小数点
  displayIntegerPart: string; // 显示用整数部分
  displayDecimalPart: string; // 显示用小数部分
  zero: boolean;              // 是否为零
  empty: boolean;             // 是否为空
  nan: boolean;               // 是否非法
}

// ========== DecimalClass 接口 ==========
interface DecimalClass {
  add(value: string): DecimalClass;           // 加法
  multi(value: string): DecimalClass;         // 乘法
  isEmpty(): boolean;
  isNaN(): boolean;
  isInvalidate(): boolean;                    // 非法或为空
  toNumber(): number;
  toString(): string;
  equal(value: DecimalClass): boolean;        // 完全相等
  lessEqual(value: DecimalClass): boolean;    // 小于等于
  negate(): DecimalClass;                     // 取反
}

// ========== FormatType 格式类型 ==========
interface FormatType {
  group: number;              // 千分位分割位置
  groupSymbol: string;        // 千分位分割符号
  decimalSymbol: string;      // 小数点符号
  decimal: number;            // 小数位数
  integer: number;            // 整数位数
}

// ========== 币种 Context ==========
interface ICurrencyContext {
  currencyOption?: ICurrencyMeta | ICurrencyMeta[];
  localFormat?: Partial<FormatType>;
  formatConfig?: IFormatConfig;
}
```

### 5.2 类型系统设计要点

1. **分离关切**：
   - `Money.Meta`：数据元信息
   - `DecimalClass`：行为接口
   - `ICurrencyMeta`：币种配置

2. **扩展性**：
   - 所有配置都用 `Partial<T>` 支持部分配置
   - 使用接口而不是类型别名，便于扩展

3. **类型安全**：
   - 金额始终是字符串（`ValueType = string`）
   - 不允许直接转换为数字计算

### 5.3 导出类型供外部使用

```typescript
// 用户应该导入这些
export type { 
  ICurrencyProps as CurrencyProps,
  IFormatAmountProps as FormatAmountProps,
  ICurrencyValue,
  ICurrencyMeta,
  IFormatConfig,
};

// 开发者可能需要的
export { CurrencyMeta, CurrencyProvider, helper };
```

---

## 工具函数和 Hooks

### 6.1 Money 类 - 核心工具类

```typescript
class Money implements DecimalClass {
  private amount: string;
  public meta: IMoneyMeta;

  constructor(value: string, opts?: { decimalSymbol: string }) {
    // 初始化：验证 → 拆分存储 → 构建元数据
  }

  // ========== 计算方法 ==========
  add(value: string): Money {
    // 使用 BigNumber 进行精确加法
    const num1 = new BigNumber(this.value());
    const num2 = new BigNumber(value);
    return new Money(num1.plus(num2).toString());
  }

  multi(value: string): Money {
    // 使用 BigNumber 进行精确乘法
  }

  // ========== 比较方法 ==========
  equal(value: Money): boolean {
    // 字符串值完全相等
    return this.value() === value.toString();
  }

  lessEqual(value: Money): boolean {
    // 通过加法比较：this + (-value) <= 0
    return this.add(value.negate().toString()).toNumber() <= 0;
  }

  // ========== 格式化方法 ==========
  formatValue(opts: { decimalSymbol, group, groupSymbol }): string {
    // 添加千分位，返回显示格式
    const showIntegerPart = ThousandPoint(integerPart, group, groupSymbol);
    return `${showIntegerPart}${decimalSymbol}${decimalPart}`;
  }

  // ========== 管道模式 ==========
  pipe(formatter: (money: Money) => void): Money {
    formatter(this);
    return this;  // 链式调用
  }
}
```

**为什么设计 pipe 方法？**

```typescript
// 支持链式调用，实现函数组合
money
  .pipe(stripZeroInlineStart(formatConfig))
  .pipe(fixDecimalBite(currencyMeta, formatConfig))
  .formatValue(meta);
```

### 6.2 Parser 工具函数

```typescript
// ========== 验证输入格式 ==========
export const validateDisplayValue = (meta: ICurrencyMeta) => (value: string) => {
  // 1. 修复输入法（圆角→半角）
  value = fixDot(meta)(value);
  
  // 2. 验证是否是合法数字格式
  return isValidNumber(meta)(value) && !invalidCharacters(meta)(value);
};

// ========== 清洗输入 ==========
export const parseMoney = (meta: ICurrencyMeta) => (value: string) => {
  // 1. 移除千分位和其他符号
  const newVal = value.replace(/[^\\d\\-.]/g, '');
  
  // 2. 统一小数点符号为标准的 "."
  return newVal.replace(/。|，/g, '.');
};

// ========== 修复输入法 ==========
export const fixDot = (meta: ICurrencyMeta) => (value: string) => {
  const { decimalSymbol } = meta;
  if (decimalSymbol === '.') {
    return value.replace(/。/g, '.');  // 圆角句号 → 半角句号
  }
  if (decimalSymbol === ',') {
    return value.replace(/，/g, ',');  // 圆角逗号 → 半角逗号
  }
  return value;
};
```

### 6.3 Formatter 工具函数

```typescript
// ========== 去除前置零 ==========
export const stripZeroInlineStart = (formatOpts: IFormatConfig) => {
  return (money: Money) => {
    const { integerPart } = money.Meta;
    if (formatOpts.removeZeroInHead) {
      let cleaned = integerPart.replace(/^0+/, '');
      if (cleaned === '' && integerPart.length > 0) {
        cleaned = '0';  // 保留一个零
      }
      money.setMeta({ integerPart: cleaned });
    }
  };
};

// ========== 小数精度处理 ==========
export const fixDecimalBite = (meta: ICurrencyMeta, formatOpts: IFormatConfig) => {
  return (money: Money) => {
    let { decimalPart, hasDecimal } = money.Meta;
    const { decimal } = meta;
    const { zeroMode, decimalMode } = formatOpts;
    
    // 1. 零处理
    if (zeroMode === 'padZero') {
      // 补零：3.1 → 3.10
      decimalPart = decimalPart.padEnd(decimal, '0');
    } else if (zeroMode === 'stripZero') {
      // 去零：3.10 → 3.1
      decimalPart = decimalPart.replace(/0+$/, '');
      if (decimalPart === '') hasDecimal = false;
    }
    
    // 2. 精度处理
    if (decimalMode === 'truncate') {
      // 截断：3.149 → 3.14
      decimalPart = decimalPart.slice(0, decimal);
    } else if (decimalMode === 'round') {
      // 四舍五入：3.1415 → 3.14
      // 关键：只在显示时做，不改变内部值
      const tmpValue = Number(`1.${decimalPart}`);
      const multiplier = Math.pow(10, decimal);
      const rounded = Math.round(tmpValue * multiplier - multiplier) / multiplier;
      decimalPart = rounded.toString().split('.')[1]?.padEnd(decimal, '0') || '';
    }
    
    money.setMeta({ decimalPart, hasDecimal });
  };
};

// ========== 千分位格式化 ==========
export const ThousandPoint = (value: string, group: number, groupSymbol: string) => {
  let result = '';
  for (let i = value.length; i > 0; i -= group) {
    const startPos = Math.max(0, i - group);
    const segment = value.substring(startPos, i);
    result = segment + (result ? groupSymbol + result : '');
  }
  return result;
};
```

### 6.4 自定义 Hooks

#### useControllableValue（来自 ahooks）

```typescript
// 支持受控/非受控模式的 Hook
const [value, setValue] = useControllableValue({
  value: props.value,
  defaultValue: props.defaultValue,
  onChange: props.onChange,
});

// 相当于
const [value, setValue] = useState(defaultValue);
useEffect(() => {
  if (value !== undefined) setValue(value);
}, [value]);
```

#### useCurrencyOptions

```typescript
export const useCurrencyOptions = (props: ICurrencyProps) => {
  // 1. 获取全局配置
  const { currencyOption: globalOpt, localFormat: globalFormat } = useGlobal();
  
  // 2. 合并配置（全局 < 组件 < 用户）
  const mergedOpt = currencyOption ?? globalOpt;
  const mergedFormat = { ...globalFormat, ...localFormat };
  
  // 3. 构建 Map（快速查询）
  const optionMap = formatMap(options, mergedFormat);
  
  return { options, optionMap };
};
```

#### useCursor

```typescript
export const useCursor = (ref: RefObject<HTMLInputElement>, focus: boolean) => {
  const [prevCursor, setPrevCursor] = useState<number | null>(null);
  
  const recordCursor = useCallback(() => {
    if (!ref.current) return;
    // 记录当前光标位置
    setPrevCursor(ref.current.selectionStart);
  }, [ref]);
  
  const restoreCursor = useCallback(() => {
    if (!ref.current || prevCursor === null || !focus) return;
    // 恢复光标位置
    ref.current.setSelectionRange(prevCursor, prevCursor);
  }, [ref, prevCursor, focus]);
  
  return [recordCursor, restoreCursor];
};
```

#### useLayoutUpdateEffect

```typescript
// 比 useEffect 早触发，在浏览器绘制前执行
// 避免 UI 闪烁
export const useLayoutUpdateEffect = (effect, deps) => {
  useLayoutEffect(() => {
    return effect();
  }, deps);
};
```

### 6.5 Helper 辅助函数

```typescript
const helper = {
  // 格式化显示
  formatAmount: (value: string, { currencyMeta, formatConfig }) => {
    return new Money(value)
      .pipe(stripZeroInlineStart(formatConfig))
      .pipe(fixDecimalBite(currencyMeta, formatConfig))
      .formatValue(currencyMeta);
  },
  
  // 校验
  isValid: (value: string, { currencyMeta }) => {
    return validateDisplayValue(currencyMeta)(value);
  },
  
  isValidAmount: (value: string, { currencyMeta }) => {
    return isValidNumber(currencyMeta)(value);
  },
  
  // 校验整数位
  isValidInteger: (value: string, { currencyMeta }) => {
    const money = new Money(value);
    return money.Meta.integerPart?.length <= currencyMeta.integer;
  },
  
  // 校验小数位
  isValidDecimal: (value: string, { currencyMeta }) => {
    const money = new Money(value);
    return money.Meta.decimalPart.length <= currencyMeta.decimal;
  },
};
```

---

## 自动化测试

### 7.1 测试框架与工具

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",              // 单元测试框架
    "@vitest/ui": "^1.0.0",          // UI 展示
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

### 7.2 快照测试 (Currency.test.tsx)

快照测试验证组件的结构，当 UI 变更时会提示更新快照。

```typescript
describe('Currency Component Snapshot Tests', () => {
  // ========== 基础渲染 ==========
  test('should render basic currency component', () => {
    const { container } = render(
      <BeCurrency 
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // ========== 受控模式 ==========
  test('should render controlled currency component', () => {
    const { container } = render(
      <BeCurrency
        value={{ currency: 'CNY', value: '1000.50' }}
        onChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // ========== 前缀后缀 ==========
  test('should render currency component with prefix and suffix', () => {
    const { container } = render(
      <BeCurrency
        prefix="symbol"
        suffix="currency"
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // ========== 多币种 ==========
  test('should render multiple currency component', () => {
    const { container } = render(
      <BeCurrency
        multiple
        defaultValue={{ currency: 'CNY' }}
        currencyOption={[CurrencyMeta.CNY, CurrencyMeta.USD]}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // ========== 禁用状态 ==========
  test('should render disabled currency component', () => {
    const { container } = render(
      <BeCurrency
        disabled
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
```

### 7.3 集成测试 (integration.test.tsx)

集成测试验证交互行为和功能逻辑。

#### 测试输入功能

```typescript
describe('Currency Input Functionality', () => {
  // ========== 基础输入 ==========
  test('should input numeric value correctly', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '1234567');
    
    // 验证格式化：1234567 → 1,234,567
    expect(input!.value).toBe('1,234,567');
  });

  // ========== 小数输入 ==========
  test('should handle decimal input', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '1000.1');
    
    // blur 时应自动补零：1000.1 → 1,000.10
    await userEvent.click(document.body);
    
    expect(input!.value).toBe('1,000.10');
    expect(onChange).toHaveBeenCalledWith({
      currency: 'CNY',
      value: '1000.1'
    });
  });

  // ========== 输入法修复 ==========
  test('should fix IME input (Chinese punctuation)', async () => {
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    
    const input = container.querySelector('input');
    // 模拟输入中文句号（应自动转为英文句号）
    await userEvent.type(input!, '123。45');
    
    expect(input!.value).toContain('123.45');
  });

  // ========== 验证非法字符 ==========
  test('should reject invalid characters', async () => {
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '12a34b56');
    
    // 应该只保留数字
    expect(input!.value).toBe('123,456');
  });
});
```

#### 测试多币种功能

```typescript
describe('Multi-Currency Support', () => {
  // ========== 币种切换 ==========
  test('should switch currency correctly', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        multiple
        defaultValue={{ currency: 'CNY' }}
        currencyOption={[CurrencyMeta.CNY, CurrencyMeta.USD]}
        onChange={onChange}
      />
    );
    
    const select = container.querySelector('select');
    await userEvent.selectOption(select!, 'USD');
    
    expect(onChange).toHaveBeenCalledWith({
      currency: 'USD',
      value: ''  // 默认清空金额
    });
  });

  // ========== 保留金额 ==========
  test('should keep amount when switching currency', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        multiple
        defaultValue={{ currency: 'CNY', value: '1000' }}
        currencyOption={[CurrencyMeta.CNY, CurrencyMeta.USD]}
        keepAmountOnCurrencyChange={true}
        onChange={onChange}
      />
    );
    
    const select = container.querySelector('select');
    await userEvent.selectOption(select!, 'USD');
    
    expect(onChange).toHaveBeenCalledWith({
      currency: 'USD',
      value: '1000'  // 保留了金额
    });
  });
});
```

#### 测试格式化功能

```typescript
describe('Formatting', () => {
  // ========== 千分位 ==========
  test('should apply thousand separator', async () => {
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY', value: '1234567890' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    
    const input = container.querySelector('input');
    expect(input!.value).toBe('1,234,567,890');
  });

  // ========== 补零 ==========
  test('should pad zeros for decimal places', async () => {
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY', value: '100.1' }}
        currencyOption={CurrencyMeta.CNY}
        formatConfig={{ zeroMode: 'padZero' }}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.click(document.body); // blur
    
    expect(input!.value).toBe('100.10');
  });

  // ========== 四舍五入 ==========
  test('should round decimal correctly', async () => {
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY', value: '100.1415' }}
        currencyOption={CurrencyMeta.CNY}
        formatConfig={{ decimalMode: 'round' }}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.click(document.body); // blur
    
    expect(input!.value).toContain('100.14');
  });
});
```

#### 测试范围限制

```typescript
describe('Min/Max Validation', () => {
  // ========== 超出最大值 ==========
  test('should trigger onChangeMax when exceeding max', async () => {
    const onChangeMax = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        max={1000}
        onChangeMax={onChangeMax}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '2000');
    await userEvent.click(document.body); // blur
    
    expect(onChangeMax).toHaveBeenCalledWith('2000');
  });

  // ========== 在范围内 ==========
  test('should accept value within range', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        min={100}
        max={1000}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '500');
    await userEvent.click(document.body); // blur
    
    expect(onChange).toHaveBeenCalledWith({
      currency: 'CNY',
      value: '500'
    });
  });
});
```

#### 测试事件触发时机

```typescript
describe('Event Dispatch Timing', () => {
  // ========== onInput 触发 ==========
  test('should trigger onChange on input when configured', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        dispatchChange={['onInput']}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '123');
    
    // 应该在输入过程中触发
    expect(onChange).toHaveBeenCalled();
  });

  // ========== onBlur 触发 ==========
  test('should trigger onChange on blur', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        dispatchChange={['onBlur']}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '123');
    
    // 输入过程中不触发
    expect(onChange).not.toHaveBeenCalled();
    
    // blur 时触发
    await userEvent.click(document.body);
    expect(onChange).toHaveBeenCalled();
  });

  // ========== onPressEnter 触发 ==========
  test('should trigger onChange on Enter key', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <BeCurrency
        defaultValue={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        dispatchChange={['onPressEnter']}
        onChange={onChange}
      />
    );
    
    const input = container.querySelector('input');
    await userEvent.type(input!, '123');
    await userEvent.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalled();
  });
});
```

### 7.4 BeFormatAmount 测试

```typescript
describe('BeFormatAmount Component', () => {
  // ========== 基础格式化 ==========
  test('should format amount correctly', () => {
    const { container } = render(
      <BeFormatAmount
        value={{ currency: 'CNY', value: '1234567.8' }}
        currencyOption={CurrencyMeta.CNY}
      />
    );
    
    expect(container.textContent).toContain('1,234,567.80');
  });

  // ========== 前缀显示 ==========
  test('should display prefix symbol', () => {
    const { container } = render(
      <BeFormatAmount
        value={{ currency: 'CNY', value: '1000' }}
        currencyOption={CurrencyMeta.CNY}
        prefix="symbol"
      />
    );
    
    expect(container.textContent).toContain('￥1,000');
  });

  // ========== 占位符 ==========
  test('should show placeholder when no value', () => {
    const { container } = render(
      <BeFormatAmount
        value={{ currency: 'CNY' }}
        currencyOption={CurrencyMeta.CNY}
        placeholder="请输入金额"
      />
    );
    
    expect(container.textContent).toContain('请输入金额');
  });
});
```

### 7.5 运行测试命令

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm run test Currency.test.tsx

# 监听模式（代码变更自动重新运行）
npm run test -- --watch

# 生成覆盖率报告
npm run test -- --coverage

# 更新快照
npm run test -- --updateSnapshot

# 运行 UI 展示
npm run test -- --ui
```

### 7.6 测试覆盖率目标

| 项目 | 目标 |
|------|------|
| Statements | ≥ 80% |
| Branches | ≥ 75% |
| Functions | ≥ 80% |
| Lines | ≥ 80% |

### 7.7 关键测试场景检查清单

- [ ] **输入验证**：数字、小数点、非法字符
- [ ] **格式化**：千分位、小数精度、前置零
- [ ] **多币种**：切换、保留金额、格式规则
- [ ] **事件**：onChange、onBlur、onPressEnter、onStep
- [ ] **受控/非受控**：value/defaultValue、onChange 同步
- [ ] **范围限制**：min、max、超出提示
- [ ] **光标管理**：输入时光标不乱跳
- [ ] **状态**：disabled、readOnly、size
- [ ] **前缀后缀**：currency、symbol、none
- [ ] **边界情况**：空值、零值、负数、超大数

---

## 总结

### 实现核心要点

1. **精度保证**：字符串存储 + BigNumber 计算
2. **状态分离**：decimalValue（实际值）vs inputValue（显示值）
3. **灵活配置**：完整的 Props API，支持全局和局部配置
4. **增强交互**：滚轮、多种触发方式、光标恢复
5. **完整测试**：快照 + 集成测试，覆盖所有场景

### 学习路径建议

1. **第一步**：理解需求和架构
2. **第二步**：学习 Money 类和精度处理
3. **第三步**：实现 Single 组件的输入流程
4. **第四步**：添加多币种支持
5. **第五步**：编写完整的测试用例

### 最佳实践

- ✅ 始终从测试开始（TDD）
- ✅ 组件职责单一，易于测试
- ✅ 使用 Hook 进行状态管理
- ✅ 提供完整的类型定义
- ✅ 支持全局和局部配置
- ✅ 光标、焦点等细节处理

---

**文档版本**：1.0  
**最后更新**：2024-02-03  
**相关文件**：
- 组件源码：`src/Scenes/Currency/`
- 测试文件：`src/Scenes/Currency/test/`
- 演示 Demo：`src/Scenes/Currency/demos/`