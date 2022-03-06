/**
 * Bucket sort is mainly useful when input is uniformly distributed over a range.
 *
 * Bucket algorithm:
 * bucketSort(arr[], n)
 * 1) Create n empty buckets (Or lists).
 * 2) Do following for every array element arr[i].
 *    a) Insert arr[i] into bucket[n*array[i]]
 * 3) Sort individual buckets using insertion sort.
 * 4) Concatenate all sorted buckets.
 *
 * Time Complexity: If we assume that insertion in a bucket takes O(1) time
 * then steps 1 and 2 of the above algorithm clearly take O(n) time.
 * The O(1) is easily possible if we use a linked list to represent a bucket
 * (In the following code, C++ vector is used for simplicity).
 * Step 4 also takes O(n) time as there will be n items in all buckets.
 * The main step to analyze is step 3. This step also takes O(n) time on average
 * if all numbers are uniformly distributed
 *
 * @link https://www.geeksforgeeks.org/bucket-sort-2/
 */

const bucketSort = (
  arr: number[],
  // Default sort (JS engine will most likely use the quick sort for this),
  // can be any appropriate algo
  sort = (a: number, b: number) => a - b
): number[] => {
  const n = arr.length
  // This line works when we have only floats in range of 0..1
  // const buckets: number[][] = Array.from({ length: n }, () => [])
  const buckets: number[][] = []

  for (let i = 0; i < n; i++) {
    const idx = Math.floor(arr[i] * n)
    // Dynamic array size to support integer values
    if (!buckets[idx]) buckets[idx] = []

    buckets[idx].push(arr[i])
  }

  buckets.forEach(b => b.sort(sort))

  return buckets.flat()
}

describe('bucket sort', () => {
  it('sorts floats', () => {
    expect(bucketSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434])).toEqual([
      0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897,
    ])
  })

  it('sorts mixed input', () => {
    expect(bucketSort([2, 1, 0.5, 33, 0.33, 1.23, 100.5])).toEqual([
      0.33, 0.5, 1, 1.23, 2, 33, 100.5,
    ])
  })

  it('sorts integers', () => {
    expect(bucketSort([2, 1, 1000, 0, 14004, 0, 25, 2])).toEqual([
      0, 0, 1, 2, 2, 25, 1000, 14004,
    ])
  })

  // TODO support negative values
  // https://www.geeksforgeeks.org/bucket-sort-to-sort-an-array-with-negative-numbers/

  xit('sorts valid input', () => {
    expect(bucketSort([2, -1, 1000, 0, 14004, 0, -25, 2])).toEqual([
      -25, -1, 0, 0, 2, 2, 1000, 14004,
    ])
  })

  xit('handles sorted arrays', () => {
    expect(bucketSort([-10, -1, 0, 0.5, 1, 10])).toEqual([
      -10, -1, 0, 0.5, 1, 10,
    ])
  })
})

export {}
