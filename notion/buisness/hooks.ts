import { useRef, useState } from 'react';
import { SearchTableConfig, SearchTableFns, UseFormReturn, useSearchTable } from '@finfe/beetle-ui';
import { openDownloadBox } from '@share/utils';
import { Modal, message, notification } from '@ss/mtd-react3';
import { useMemoizedFn, useUpdateEffect } from 'ahooks';
import { CHEQUE_OPERATION_TYPE } from '@src/constants';
import type { FieldMapping } from '@src/utils';
import { buildSubmitData, transformLedgerFormParams } from '@src/utils';

interface UseCheckLedgerLogicConfig<TFormValues = any, TPageItem = any> {
  // 表单实例
  form: UseFormReturn<TFormValues>;

  // 字段映射配置（用于 transformLedgerFormParams）
  fieldMapping: FieldMapping;

  // 搜索 API
  searchApi: (params: any) => Promise<{
    pageList?: TPageItem[];
    page?: {
      pageNo?: number;
      pageSize?: number;
      totalCount?: number;
      totalPageCount?: number;
    };
  }>;

  // 导出 API 端点
  exportUrl: string;

  // 获取详情 API
  getDetailApi: (params: { id: number }) => Promise<any>;

  // 操作 API 映射
  operationApis?: {
    [key: string]: (params: any) => Promise<any>;
  };

  // 是否激活（用于 tab 页控制）
  isActive?: boolean;
}

interface UseCheckLedgerLogicReturn {
  // 表格相关
  config: SearchTableConfig;
  commands: SearchTableFns;

  // 抽屉相关
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
  drawerLoading: boolean;
  detailData: any;
  detailType: string;
  detailRef: React.RefObject<any>;

  // 事件处理
  handleExport: () => void;
  handleDetail: (row: any) => void;
  handleSave: () => void;
  handleEdit: (row: any) => void;
  handleIssue: (row: any) => void;
  handleVoid: (row: any) => void;
  handleConfirm: (row: any) => void;
  handleStorage: () => void;
}

/**
 * 支票台账页面逻辑 Hook
 *
 * 核心职责：
 * 1. 管理表格搜索逻辑（useSearchTable）
 * 2. 管理抽屉状态和数据加载
 * 3. 提供统一的事件处理函数（导出、查看、保存）
 * 4. 处理表单验证和数据转换
 */
export function useCheckLedgerLogic(config: UseCheckLedgerLogicConfig): UseCheckLedgerLogicReturn {
  const detailRef = useRef(null);

  // 抽屉状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailType, setDetailType] = useState<string>('');

  // 抽屉加载状态
  const [drawerLoading, setDrawerLoading] = useState(false);

  /**
   * 打开详情抽屉
   *
   * 流程：
   * 1. 清空旧数据
   * 2. 打开抽屉
   * 3. 记录操作类型（编辑/查看）
   * 4. 异步加载详情数据（入库模式除外，入库不需要加载数据）
   *
   * 注意：使用 useMemoizedFn 包装以确保函数引用稳定，避免不必要的重渲染
   */
  const showDetail = useMemoizedFn(async (row: any, type: string) => {
    setDetailData(null);
    setDetailType(type);
    setDrawerLoading(true);
    setDrawerVisible(true);

    // 支票入库模式：直接使用空对象，不需要加载详情
    if (!row.id && type === CHEQUE_OPERATION_TYPE.STORAGE) {
      setDetailData({});
      setDrawerLoading(false);
      return;
    }

    // 其他模式：从 API 加载详情数据
    const detailInfo = await config.getDetailApi({ id: row.id });
    setDetailData(detailInfo);
    setDrawerLoading(false);
  });

  /**
   * 初始化表格搜索逻辑
   *
   * 使用 useSearchTable hook 统一管理：
   * 1. 表单状态
   * 2. 表格数据和分页
   * 3. 搜索和刷新操作
   *
   * 注意：
   * - 初始分页为第 0 页，每页 20 条（与后端分页方式对应）
   * - 搜索时需要进行字段映射转换（使用 transformLedgerFormParams）
   * - 返回的数据必须符合 SearchTableConfig 的类型要求
   */
  const { config: tableConfig, commands } = useSearchTable({
    form: config.form,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    onSearch: async ({ pagination }) => {
      // 没激活的 tab 就不查了
      // 每个 tab 权限不同，避免用户在 tab1 看到数据正常，但是右上角提示没权限的弹窗
      if (config.isActive === false) {
        return {
          data: [],
          pagination: {
            pageNo: 1,
            pageSize: 20,
            total: 0,
          },
        };
      }

      const params = transformLedgerFormParams(config.form.getValues(), config.fieldMapping);
      const { pageList = [], page = { pageNo: 1, pageSize: 20, totalCount: 0 } } = await config.searchApi({
        ...params,
        page: {
          pageNo: pagination.pageNo,
          pageSize: pagination.pageSize,
        },
      });

      return {
        data: pageList,
        pagination: {
          pageNo: pagination.pageNo,
          pageSize: pagination.pageSize,
          total: page.totalCount,
        },
      };
    },
  });

  // 监听激活状态，仅在首次激活时触发搜索
  const hasActivatedRef = useRef(config.isActive);
  useUpdateEffect(() => {
    if (config.isActive && !hasActivatedRef.current) {
      hasActivatedRef.current = true;
      commands.search();
    }
  }, [config.isActive]);

  /**
   * 导出处理函数
   *
   * 使用 useMemoizedFn 包装以确保函数引用稳定，特别是当此函数作为 props 传给子组件时
   *
   * 导出流程：
   * 1. 获取当前表格的分页信息（当前页、页大小）
   * 2. 获取表单的筛选条件并进行字段映射转换
   * 3. 调用 openDownloadBox 下载文件，传递转换后的参数
   */
  const handleExport = useMemoizedFn(() => {
    const {
      tableState: {
        pagination: { pageIndex, pageSize },
      },
    } = tableConfig;
    const params = transformLedgerFormParams(config.form.getValues(), config.fieldMapping);
    openDownloadBox(config.exportUrl, {
      ...params,
      page: {
        pageNo: pageIndex + 1,
        pageSize,
      },
    });
  });
  /**
   * 编辑处理函数
   *
   * 点击编辑按钮时调用，打开编辑模式的抽屉
   */
  const handleEdit = useMemoizedFn((row) => {
    showDetail(row, CHEQUE_OPERATION_TYPE.EDIT);
  });

  /**
   * 查看详情处理函数
   *
   * 点击查看按钮时调用，打开只读模式的详情抽屉
   */
  const handleDetail = useMemoizedFn((row) => {
    showDetail(row, CHEQUE_OPERATION_TYPE.DETAIL);
  });

  /**
   * 支票入库处理函数
   *
   * 新增支票入库时调用，打开空的入库表单
   * 传入空对象而不是具体行数据
   */
  const handleStorage = useMemoizedFn(() => {
    showDetail({}, CHEQUE_OPERATION_TYPE.STORAGE);
  });

  /**
   * 支票出票处理函数
   *
   * 点击出票按钮时调用，打开编辑模式的出票抽屉
   */
  const handleIssue = useMemoizedFn((row) => {
    showDetail(row, CHEQUE_OPERATION_TYPE.ISSUE);
  });

  /**
   * 待确认处理函数
   *
   * 点击确认付款按钮时调用，打开编辑模式的付款确认抽屉
   */
  const handleConfirm = useMemoizedFn((row) => {
    showDetail(row, CHEQUE_OPERATION_TYPE.CONFIRM);
  });

  /**
   * 支票作废处理函数
   *
   * 点击作废按钮时调用，打开编辑模式的作废抽屉
   */
  const handleVoid = useMemoizedFn((row) => {
    showDetail(row, CHEQUE_OPERATION_TYPE.VOID);
  });

  /**
   * 保存详情数据
   *
   * 此函数在用户确认提交后调用，处理流程：
   * 1. 获取抽屉中的文件状态
   * 2. 使用 buildSubmitData 构建后端接受的提交数据（进行字段转换、附件处理等）
   * 3. 根据操作类型从 config.operationApis 中查找对应的 API 函数
   * 4. 调用 API 提交数据
   * 5. 成功后关闭抽屉并刷新表格
   *
   * 错误处理：
   * - 如果操作类型不支持，抛出错误
   * - finally 块确保 loading 状态被正确重置
   */
  const save = useMemoizedFn(async (formValues: any) => {
    let loadingReset = false;
    try {
      // 获取抽屉内部组件的文件状态（包括各种附件）
      const { getFileStates } = detailRef.current || {};
      const fileStates = getFileStates?.() || {};

      // 根据操作类型和表单数据构建提交格式的数据
      const submitData = buildSubmitData(detailType, formValues, fileStates, detailData?.id);

      // 查找该操作类型对应的 API 函数
      if (config.operationApis?.[detailType]) {
        setDrawerLoading(true);
        loadingReset = true;
        await config.operationApis[detailType](submitData);
        message.success({ message: '保存成功' });
        setDrawerVisible(false);
        commands.search();
      } else {
        throw new Error(`不支持的操作类型: ${detailType}`);
      }
    } finally {
      // 确保 loading 状态被重置，即使发生错误也会执行
      if (loadingReset) {
        setDrawerLoading(false);
      }
    }
  });

  /**
   * 保存处理函数
   *
   * 用户点击保存按钮时调用，处理流程：
   * 1. 获取抽屉内部的 form 实例和表单值
   * 2. 对表单进行验证（包括业务验证）
   * 3. 验证通过后弹出确认对话框
   * 4. 用户确认后调用 save 函数提交数据
   *
   * 特殊处理：
   * - 入库模式：需要验证支票票号列表不能为空
   * - 不同操作类型有不同的确认提示文案
   */
  const handleSave = useMemoizedFn(() => {
    // 获取抽屉内部的主 form 实例
    const formInstance = detailRef?.current?.getForm();
    const values = formInstance.getValues();

    // 获取当前编辑组件的 form 实例（用于验证）
    const editableForm = detailRef?.current?.getEditableForm();

    // 根据操作类型获取不同的确认消息
    const getMessage = (type: string) => {
      const messageMap: Record<string, string> = {
        [CHEQUE_OPERATION_TYPE.STORAGE]: '确定保存支票信息？',
        [CHEQUE_OPERATION_TYPE.ISSUE]: '确定提交出票信息？',
      };
      return messageMap[type] || '确定保存信息？';
    };

    // 使用编辑组件的 form 进行表单验证
    editableForm.submit(
      // 校验成功回调
      () => {
        // 入库时进行额外的业务验证：检查支票票号列表是否为空和有效性
        if (detailType === CHEQUE_OPERATION_TYPE.STORAGE) {
          const validateChequeNoList = detailRef?.current?.validateChequeNoList;
          if (validateChequeNoList) {
            const { valid, message: errorMessage } = validateChequeNoList();
            if (!valid) {
              notification.error({
                title: '错误',
                message: errorMessage,
              });
              return;
            }
          }
        }
        Modal.confirm({
          title: '提示',
          message: getMessage(detailType),
          okBtnProps: { type: 'primary' },
          onOk: () => {
            save(values);
          },
        });
      },
      // 校验失败回调：不做任何处理，让表单显示错误提示
      () => {},
      values, // 将 getValues 获取到的值作为 submit 的 value
    );
  });

  return {
    // 表格相关
    config: tableConfig,
    commands,

    // 抽屉相关
    drawerVisible,
    setDrawerVisible,
    drawerLoading,
    detailData,
    detailType,
    detailRef,

    // 事件处理
    handleExport,
    handleDetail,
    handleSave,
    handleIssue,
    handleVoid,
    handleEdit,
    handleConfirm,
    handleStorage,
  };
}
