学习笔记

##### [22括号生成M](https://leetcode-cn.com/problems/generate-parentheses/)

```javascript
//brute forve O(2^3n * n) - O(n)
var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (level, max, s) => {
		//recursion terminal
		if (level >= max) {
			if (isValid(s)) {
				ret.push(s)
			}
			return
		}

		//precess login of current level
		//drill down
		recursionParenthesis(level + 1, max, `${s}(`)
		recursionParenthesis(level + 1, max, `${s})`)

		//reverse current params if needed
	}

	let isValid = (s) => {
		let balance = 0
		for (let c of s) {
			if (c === '(') {
				balance++
			} else {
				balance--
			}
			if (balance < 0) return false
		}
		return balance === 0
	}

	recursionParenthesis(0, 2 * n, '')
	return ret
}

//回溯,直接过滤掉无效的组合
var generateParenthesis = function (n) {
	let ret = []

	let backTracking = (left, right, n, ret, s) => {
		if (left === n && right === n) {
			ret.push(s)
			return
		}

		if (left < n) {
			backTracking(left + 1, right, n, ret, s + '(')
		}

		if (left > right) {
			backTracking(left, right + 1, n, ret, s + ')')
		}
	}

	backTracking(0, 0, n, ret, '')
	return ret
}

var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (left, right, s) => {
		if (left === 0 && right === 0) {
			ret.push(s)
			return
		}

		if (left) {
			recursionParenthesis(left - 1, right, s + '(')
		}

		if (right > left) {
			recursionParenthesis(left, right - 1, s + ')')
		}
	}

	recursionParenthesis(n, n, '')
	return ret
}
```

##### [98验证二叉树搜索M](https://leetcode-cn.com/problems/validate-binary-search-tree/)

```javascript
var isValidBST = function (root) {
	let helper = (node, lower, upper) => {
		if (!node) return true
		if (node.val <= lower || node.val >= upper) return false
		return (
			helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
		)
	}
	return helper(root, -Infinity, Infinity)
}
```

##### [104二叉树的最大深度E](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript
var maxDepth = function (root) {
	if (!root) {
		return 0
	} else {
		let maxLeftDepth = maxDepth(root.left)
		let maxRightDepth = maxDepth(root.right)
		return Math.max(maxLeftDepth, maxRightDepth) + 1
	}
}
```

##### [111二叉树的最小深度E](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript
var minDepth = function (root) {
	if (!root) return 0
	if (!root.left && !root.right) return 1

	let tempMinDepth = Number.MAX_SAFE_INTEGER
	if (root.left) {
		tempMinDepth = Math.min(minDepth(root.left), tempMinDepth)
	}

	if (root.right) {
		tempMinDepth = Math.min(minDepth(root.right), tempMinDepth)
	}

	return tempMinDepth + 1
}
```

##### [226翻转二叉树E](https://leetcode-cn.com/problems/invert-binary-tree/)

```javascript
var invertTree = function (root) {
	if (!root) return null

	let left = invertTree(root.left)
	let right = invertTree(root.right)

    //reverse current level node
	root.right = left
	root.left = right

	return root
}
```

##### [50Pow(x, n)M](https://leetcode-cn.com/problems/powx-n/)

```javascript
//brute force
var myPow = function (x, n) {
	if (n < 0) return 1 / myPow(x, -n)
	if (n === 0) return 1
	if (n === 1) return x

	let res = 1
	for (let i = 0; i <= n - 1; i++) {
		res *= x
	}
	return res
}

//divide-and-conquer分治
var myPow = function (x, n) {
	if (n < 0) return 1 / myPow(x, -n)
	if (n === 0) return 1
	if (n === 1) return x

	let res = 1
	while (n > 1) {
		if (n % 2 === 1) {
			res *= x
			n--
		}
		x *= x
		n /= 2
	}
	return res * x
}

//recursion
var myPow = function (x, n) {
	if (n < 0) return 1 / myPow(x, -n)
	if (n === 0) return 1
	if (n === 1) return x

	return n % 2 === 1 ? x * myPow(x, n - 1) : myPow(x * x, n / 2)
}
```

##### [78子集M](https://leetcode-cn.com/problems/subsets/)

```javascript
//recursion
var subsets = function (nums) {
	let res = [[]]

	for (let i = 0; i < nums.length; i++) {
		res.forEach(item => {
			res.push([...item, nums[i]])
		})
	}

	return res
}

//Backtracking
var subsets = function (nums) {
	const powerset = []
	generatePowerset([], 0)

	function generatePowerset(path, index) {
		powerset.push(path)
		for (let i = index; i < nums.length; i++) {
			generatePowerset([...path, nums[i]], i + 1)
		}
	}

	return powerset
}
```

##### [169多数元素E](https://leetcode-cn.com/problems/majority-element/)

```javascript
//hash and sort
var majorityElement = function (nums) {
	let map = {},
		ret = []

	for (let num of nums) {
		map[num] ? map[num]++ : (map[num] = 1)
	}

  //also can define a param, loop map to re-assign max-value
	Object.keys(map).forEach((key) => {
		ret.push({ key, val: map[key] })
	})

	ret.sort((a, b) => b.val - a.val)

	return ret[0].key
}

//hash
var majorityElement = function (nums) {
	let map = {}

	for (let c of nums) {
		map[c] ? map[c]++ : (map[c] = 1)
	}

	let maxVal = 0,
		ret
	Object.keys(map).forEach((key) => {
		if (map[key] > maxVal) {
			maxVal = map[key]
			ret = key
		}
	})

	return ret
}

// sort the array and the middle is the majority
var majorityElement = function(nums) {
    nums.sort((a,b) => a - b);
    return nums[Math.floor(nums.length/2)];
}; 

//O(n) time O(1) space fastest solution
//O(n) time O(1) space fastest solution
var majorityElement = function (nums) {
	let ret = nums[0],
		count = 1

	for (let i = 1; i < nums.length; i++) {
        //have to judge sequence
		if (count === 0) {
			count++
			ret = nums[i]
		} else if (ret === nums[i]) {
			count++
		} else {
			count--
		}
	}
	return ret
}
```

##### [17电话号码的字母组合M](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

```javascript
//recursion
var letterCombinations = function(digits) {
    if (!digits) return []
    let ret = [],
        map = new Map([
        [2, 'abc'],
        [3, 'def'],
        [4, 'ghi'],
        [5, 'jkl'],
        [6, 'mno'],
        [7, 'pqrs'],
        [8, 'tuv'],
        [9, 'wxyz']
    ])

    let search = (s, digits, level, ret, map) => {
        if (level === digits.length) {
            ret.push(s)
            return
        }
        let letters = map.get(+digits.charAt(level))

        for (let l of letters) {
            search(s + l, digits, level + 1, ret, map)
        }
    }

    search('', digits, 0, ret, map)

    return ret
};

//more simple
var letterCombinations = function (digits) {
	if (digits.length === 0) return []

	const map = {
		2: 'abc',
		3: 'def',
		4: 'ghi',
		5: 'jkl',
		6: 'mno',
		7: 'pqrs',
		8: 'tuv',
		9: 'wxyz',
	}

	let res = []
	function go(i, s) {
		if (i === digits.length) {
			res.push(s)
			return
		}

		for (let c of map[digits[i]]) {
			go(i + 1, s + c)
		}
	}

	go(0, '')
	return res
}
```

##### [51N皇后H](https://leetcode-cn.com/problems/n-queens/) backlog

##### [46全排列M](https://leetcode-cn.com/problems/permutations/)

```javascript
//回溯 dfs
var permute = function (nums) {
	if (nums.length === 0) return []

	let ret = [],
		path = []
	used = Array.from({ length: nums.length }, (item) => false)

	let dfs = (nums, depth, path, used, ret) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0; i < nums.length; i++) {
			if (used[i]) continue
			path.push(nums[i])
			used[i] = true
			dfs(nums, depth + 1, path, used, ret)

			//reverse
			path.pop(nums[i])
			used[i] = false
		}
	}

	dfs(nums, 0, path, used, ret)

	return ret
}
```

##### [47全排列2M](https://leetcode-cn.com/problems/permutations-ii/)

```javascript
var permuteUnique = function (nums) {
	if (!Array.isArray(nums) || nums.length === 0) {
		return []
	}

	let ret = []
	path = []
	used = Array.from({ length: nums.length }, (item) => false)
	// 排序（升序或者降序都可以），排序是剪枝的前提
	nums.sort()

	let dfs = (nums, depth, path, used, ret) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0; i < nums.length; i++) {
			if (used[i]) continue
			// 剪枝条件：i > 0 是为了保证 nums[i - 1] 有意义
             // 写 !used[i - 1] 是因为 nums[i - 1] 在深度优先遍历的过程中刚刚被撤销选择
			if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue

			path.push(nums[i])
			used[i] = true

			dfs(nums, depth + 1, path, used, ret)

			path.pop(nums[i])
			used[i] = false
		}
	}

	dfs(nums, 0, path, used, ret)

	return ret
}
```
