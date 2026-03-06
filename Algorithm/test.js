/**
 * 动态网格布局渲染 - 核心算法
 *
 * 题目：给定模块的行列位置和尺寸，计算每个模块的实际渲染位置
 *
 * 核心思路：
 * 1. 找出每行的最大高度、每列的最大宽度
 * 2. 计算每行的累积 top 位置、每列的累积 left 位置
 * 3. 根据模块的 row/col，查表得到实际的 top/left
 */

const UNIT_SIZE = 20; // 1份额 = 20px

/**
 * 核心函数：计算网格布局
 * @param {Array} data - 模块数据 [{row, col, sizeX, sizeY}, ...]
 * @returns {Object} 布局信息
 */
function calculateGridLayout(data) {
  // ============================================
  // Step 1: 找出网格的边界（最大行号和列号）
  // ============================================
  let maxRow = 0;
  let maxCol = 0;

  data.forEach(item => {
    maxRow = Math.max(maxRow, item.row);
    maxCol = Math.max(maxCol, item.col);
  });

  console.log(`网格范围: ${maxRow + 1} 行 × ${maxCol + 1} 列`);

  // ============================================
  // Step 2: 初始化每行每列的最大尺寸数组
  // ============================================
  // rowHeights[i] 表示第 i 行的最大高度（份额）
  // colWidths[i] 表示第 i 列的最大宽度（份额）
  const rowHeights = new Array(maxRow + 1).fill(0);
  const colWidths = new Array(maxCol + 1).fill(0);

  // ============================================
  // Step 3: 遍历所有模块，更新每行每列的最大值
  // ============================================
  data.forEach(item => {
    const { row, col, sizeX, sizeY } = item;

    // 关键：当前行的高度 = max(当前行已有高度, 当前模块的高度)
    rowHeights[row] = Math.max(rowHeights[row], sizeY);

    // 关键：当前列的宽度 = max(当前列已有宽度, 当前模块的宽度)
    colWidths[col] = Math.max(colWidths[col], sizeX);
  });

  console.log('每行高度（份额）:', rowHeights);
  console.log('每列宽度（份额）:', colWidths);

  // ============================================
  // Step 4: 计算每行的累积位置（top 坐标）
  // ============================================
  // rowPositions[i] 表示第 i 行的起始 top 位置（像素）
  const rowPositions = [0]; // 第 0 行从 0px 开始

  for (let i = 0; i < rowHeights.length; i++) {
    const prevTop = rowPositions[i];
    const currentHeight = rowHeights[i] * UNIT_SIZE;
    const nextTop = prevTop + currentHeight;
    rowPositions.push(nextTop);
  }

  console.log('每行起始位置（px）:', rowPositions);

  // ============================================
  // Step 5: 计算每列的累积位置（left 坐标）
  // ============================================
  // colPositions[i] 表示第 i 列的起始 left 位置（像素）
  const colPositions = [0]; // 第 0 列从 0px 开始

  for (let i = 0; i < colWidths.length; i++) {
    const prevLeft = colPositions[i];
    const currentWidth = colWidths[i] * UNIT_SIZE;
    const nextLeft = prevLeft + currentWidth;
    colPositions.push(nextLeft);
  }

  console.log('每列起始位置（px）:', colPositions);

  // ============================================
  // Step 6: 计算每个模块的实际位置和尺寸
  // ============================================
  const renderedItems = data.map((item, index) => {
    const { row, col, sizeX, sizeY } = item;

    return {
      id: index,
      // 原始数据
      row,
      col,
      sizeX,
      sizeY,
      // 计算出的实际位置和尺寸
      top: rowPositions[row],      // 查表：第 row 行的起始位置
      left: colPositions[col],     // 查表：第 col 列的起始位置
      width: sizeX * UNIT_SIZE,    // 宽度 = 份额 × 单位大小
      height: sizeY * UNIT_SIZE,   // 高度 = 份额 × 单位大小
    };
  });

  // ============================================
  // Step 7: 计算容器总尺寸
  // ============================================
  const containerWidth = colPositions[colPositions.length - 1];
  const containerHeight = rowPositions[rowPositions.length - 1];

  console.log(`容器尺寸: ${containerWidth}px × ${containerHeight}px`);

  return {
    renderedItems,      // 渲染数据
    containerWidth,     // 容器宽度
    containerHeight,    // 容器高度
    rowHeights,         // 每行高度（份额）
    colWidths,          // 每列宽度（份额）
    rowPositions,       // 每行起始位置（像素）
    colPositions,       // 每列起始位置（像素）
  };
}

// ============================================
// 测试数据
// ============================================
const testData = [
  {row: 13, col: 12, sizeX: 12, sizeY: 8},
  {row: 1, col: 6, sizeX: 3, sizeY: 2},
  {row: 1, col: 3, sizeX: 3, sizeY: 2},
  {row: 3, col: 15, sizeX: 3, sizeY: 2},
  {row: 3, col: 6, sizeX: 3, sizeY: 2},
  {row: 5, col: 0, sizeX: 12, sizeY: 8},
  {row: 13, col: 0, sizeX: 12, sizeY: 8},
  {row: 1, col: 21, sizeX: 3, sizeY: 2},
  {row: 3, col: 21, sizeX: 3, sizeY: 2},
  {row: 1, col: 0, sizeX: 3, sizeY: 2},
  {row: 1, col: 18, sizeX: 3, sizeY: 2},
  {row: 3, col: 18, sizeX: 3, sizeY: 2},
  {row: 5, col: 12, sizeX: 12, sizeY: 8},
  {row: 0, col: 0, sizeX: 24, sizeY: 1},
  {row: 3, col: 3, sizeX: 3, sizeY: 2},
  {row: 3, col: 9, sizeX: 3, sizeY: 2},
  {row: 1, col: 9, sizeX: 3, sizeY: 2},
  {row: 1, col: 15, sizeX: 3, sizeY: 2},
  {row: 3, col: 12, sizeX: 3, sizeY: 2},
  {row: 1, col: 12, sizeX: 3, sizeY: 2},
  {row: 3, col: 0, sizeX: 3, sizeY: 2},
];

// ============================================
// 执行测试
// ============================================
console.log('========================================');
console.log('开始计算网格布局');
console.log('========================================\n');

const layout = calculateGridLayout(testData);

console.log('\n========================================');
console.log('渲染数据示例（前3个模块）：');
console.log('========================================');
layout.renderedItems.slice(0, 3).forEach(item => {
  console.log(`模块 ${item.id}:`);
  console.log(`  位置: row=${item.row}, col=${item.col}`);
  console.log(`  尺寸: ${item.sizeX}×${item.sizeY} 份额 = ${item.width}×${item.height}px`);
  console.log(`  渲染: top=${item.top}px, left=${item.left}px`);
  console.log('');
});

// ============================================
// 简化版本：如果只需要渲染位置
// ============================================
function simpleRender(data) {
  const layout = calculateGridLayout(data);

  return layout.renderedItems.map(item => ({
    id: item.id,
    style: {
      position: 'absolute',
      top: `${item.top}px`,
      left: `${item.left}px`,
      width: `${item.width}px`,
      height: `${item.height}px`,
    }
  }));
}

// ============================================
// React 组件示例
// ============================================
function GridLayoutComponent_Example() {
  /*
  const GridLayout = ({ data }) => {
    const layout = calculateGridLayout(data);

    return (
      <div
        className="grid-container"
        style={{
          position: 'relative',
          width: layout.containerWidth,
          height: layout.containerHeight,
        }}
      >
        {layout.renderedItems.map(item => (
          <div
            key={item.id}
            className="grid-item"
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
            }}
          >
            Row {item.row}, Col {item.col}
          </div>
        ))}
      </div>
    );
  };
  */
}

// ============================================
// Vue 组件示例
// ============================================
function VueComponent_Example() {
  /*
  <template>
    <div
      class="grid-container"
      :style="{
        position: 'relative',
        width: layout.containerWidth + 'px',
        height: layout.containerHeight + 'px',
      }"
    >
      <div
        v-for="item in layout.renderedItems"
        :key="item.id"
        class="grid-item"
        :style="{
          position: 'absolute',
          top: item.top + 'px',
          left: item.left + 'px',
          width: item.width + 'px',
          height: item.height + 'px',
        }"
      >
        Row {{ item.row }}, Col {{ item.col }}
      </div>
    </div>
  </template>

  <script>
  export default {
    props: ['data'],
    computed: {
      layout() {
        return calculateGridLayout(this.data);
      }
    }
  }
  </script>
  */
}

// ============================================
// 导出（如果在模块环境中使用）
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateGridLayout,
    simpleRender,
    UNIT_SIZE,
  };
}
