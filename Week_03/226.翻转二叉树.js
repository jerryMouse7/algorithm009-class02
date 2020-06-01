/*
 * @Author: your name
 * @Date: 2020-06-01 14:38:49
 * @LastEditTime: 2020-06-01 14:40:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm009-class02/Users/jack/.leetcode/226.翻转二叉树.js
 */

/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
	if (root == null) {
		return null
	}

	let right = invertTree(root.right)
	let left = invertTree(root.left)

	root.left = right
	root.right = left
	return root
}
// @lc code=end
