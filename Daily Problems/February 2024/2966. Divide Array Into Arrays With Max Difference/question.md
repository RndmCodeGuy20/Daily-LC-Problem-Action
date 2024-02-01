
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

# Divide Array Into Arrays With Max Difference

<div style="display: flex; justify-content: space-between; align-items: center">
<div class="diff" style="color: #fac31d;padding: 2px; background-color: '#3a3f4b'; border-radius: 5px;">Medium</div>
<br>
<div class="diff" style="color: #46c6c2">Array</div>
<div class="diff" style="color: #46c6c2">Greedy</div>
<div class="diff" style="color: #46c6c2">Sorting</div>
</div>

---

You are given an integer array `nums` of size `n` and a positive integer `k`.

Divide the array into one or more arrays of size `3` satisfying the following conditions:

*   **Each** element of `nums` should be in **exactly** one array.
*   The difference between **any** two elements in one array is less than or equal to `k`.

Return _a_ **2D** _array containing all the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return **any** of them._

**Example 1:**

**Input:** nums = \[1,3,4,8,7,9,3,5,1\], k = 2
**Output:** \[\[1,1,3\],\[3,4,5\],\[7,8,9\]\]
**Explanation:** We can divide the array into the following arrays: \[1,1,3\], \[3,4,5\] and \[7,8,9\].
The difference between any two elements in each array is less than or equal to 2.
Note that the order of elements is not important.

**Example 2:**

**Input:** nums = \[1,3,3,2,7,3\], k = 3
**Output:** \[\]
**Explanation:** It is not possible to divide the array satisfying all the conditions.

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 105`
*   `n` is a multiple of `3`.
*   `1 <= nums[i] <= 105`
*   `1 <= k <= 105`
