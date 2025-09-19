// 215 数组中的第K个最大元素
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // 1. 构建大小为k的小顶堆（堆中存放当前最大的k个元素）
    let heap = nums.slice(0, k);
    buildMinHeap(heap);
    
    // 2. 遍历剩余元素，大于堆顶则替换并调整堆
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > heap[0]) {
            heap[0] = nums[i]; // 替换堆顶（当前第k大的元素）
            minHeapify(heap, 0, k); // 重新调整为小顶堆
        }
    }
    
    // 3. 堆顶元素即为第k大元素
    return heap[0];
};

/**
 * 构建小顶堆
 * @param {number[]} heap - 待构建堆的数组
 */
function buildMinHeap(heap) {
    const n = heap.length;
    // 从最后一个非叶子节点开始向前调整
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        minHeapify(heap, i, n);
    }
}

/**
 * 堆调整（确保以i为根的子树满足小顶堆特性）
 * @param {number[]} heap - 堆数组
 * @param {number} i - 当前需要调整的节点索引
 * @param {number} size - 堆的有效大小
 */
function minHeapify(heap, i, size) {
    let smallest = i; // 初始化最小值为当前节点
    const left = 2 * i + 1; // 左子节点索引
    const right = 2 * i + 2; // 右子节点索引
    
    // 比较左子节点与当前最小值
    if (left < size && heap[left] < heap[smallest]) {
        smallest = left;
    }
    
    // 比较右子节点与当前最小值
    if (right < size && heap[right] < heap[smallest]) {
        smallest = right;
    }
    
    // 若最小值不是当前节点，则交换并递归调整
    if (smallest !== i) {
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        minHeapify(heap, smallest, size);
    }
}

// 示例运行
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 输出: 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 输出: 4
