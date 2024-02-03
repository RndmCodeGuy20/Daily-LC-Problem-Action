
<style>
*{
    font-family: "Plus Jakarta Sans", sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.diff{
    background: #3a3f4b;
    padding: 5px;
    width: max-content;
    border-radius: 5px;
    font-size: 12px;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: 700;
}
</style>

# Partition Array for Maximum Sum

<div style="display: flex; justify-content: space-between; align-items: center">
<div class="diff" style="color: #fac31d;padding: 2px; background-color: '#3a3f4b'; border-radius: 5px;">Medium</div>
<br>
<div class="diff" style="color: #46c6c2">Array</div>
<div class="diff" style="color: #46c6c2">Dynamic Programming</div>
</div>

---

Given an integer array `arr`, partition the array into (contiguous) subarrays of length **at most** `k`. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return _the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a **32-bit** integer._

**Example 1:**

**Input:** arr = \[1,15,7,9,2,5,10\], k = 3
**Output:** 84
**Explanation:** arr becomes \[15,15,15,9,10,10,10\]

**Example 2:**

**Input:** arr = \[1,4,1,5,7,3,6,1,9,9,3\], k = 4
**Output:** 83

**Example 3:**

**Input:** arr = \[1\], k = 1
**Output:** 1

**Constraints:**

*   `1 <= arr.length <= 500`
*   `0 <= arr[i] <= 109`
*   `1 <= k <= arr.length`
