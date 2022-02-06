function bfs(root) {
	let queue = [root];
	let ret = [];
	while (queue.length) {
		let node = queue.shift();
		ret.push(node.val);
		if (node.left) queue.push(node.left);
		if (node.right) queue.push(node.right);
	}
	return ret;
}
