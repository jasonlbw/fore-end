// 新旧节点是否有可比性(是否为同类节点)
function sameVnode (oldVnode, vnode) {
	return oldVnode.key === vnode.key && oldVnode.sel === vnode.sel;
}

// 对比新旧根节点
function patch (oldVnode, vnode) {
	if(sameVnode(oldVnode, vnode)) {
		patchVnode(oldVnode, vnode);
	} else {
		let oldEl = oldVnode.el,
			 parentEl = api.parentNode(oldEl);
		createEle(vnode);
		if(parent) {
			api.insertBefore(parent, vnode.el, api.nextSibling(oldEl));
			api.removeChild(parent, oldEl);
			oldEl = null;
		}		
	}
	return vnode;
}

function patchVnode (oldVnode, vnode) {
	const el = vnode.el = oldVnode.el;
	let ch = vnode.children, oldCh = oldVnode.children;
	if (oldVnode === vnode) {
		return;
	}
	if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
		api.setTextContent(el, vnode.text);
	} else {
		updateEle(el, vnode, oldVnode);
		if(oldCh && ch && oldCh !== ch) {
			updateChildren(el, oldCh, ch);
		} else if (ch) {
			createEle(vnode);
		} else if (oldCh) {
			api.removeChildren(el);
		}
	}
}

function updateChildren (parenEle, oldCh, newCh) {
	let oldStartIndex = 0, newStartIndex = 0.
		 oldEndIndex = oldCh.length - 1, newEndIndex = newCh.length - 1,
		 oldStartVnode = oldCh[0], newStartVnode = newCh[0],
		 oldEndVnode = oldCh[oldEndIndex], newEndVnode = newCh[newEndVnode],
		 oldKeyToIdx, idxInOld, elToMove;
	while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
		if(oldStartVnode === null) {
			oldStartVnode = oldCh[++oldStartIndex];
		} else if (oldEndVnode === null) {
			oldEndVnode = oldCh[--oldEndIndex];
		} else if (newStartVnode === null) {
			newStartVnode = newCh[++newStartIndex];
		} else if (newEndVnode === null) {
			newEndVnode = newCh[--newEndIndex];
		} else if (sameVnode(oldStartVnode, newStartVnode)) {
			patchVnode(oldStartVnode, newStartVnode);
			newStartVnode = newCh[++newStartIndex];
			oldStartVnode = oldCh[++oldStartIndex];
		} else if (sameVnode(oldEndVnode, newEndVnode)) {
			patchVnode(oldEndVnode, newEndVnode);
			newEndVnode = newCh[--newEndIndex];
			oldEndVnode = oldCh[--oldEndIndex];
		} else if (sameVnode(oldStartVnode, newEndVnode)) {
			patchVnode(oldStartVnode, newEndVnode);
			api.insertBefore(parentEle, oldStartVnode.el, api.nextSibling(oldEndVnode.el));
			oldStartVnode = oldCh[++oldStartIndex];
			newEndVnode = newCh[--newEndIndex];
		} else if (sameVnode(oldEndVnode, newStartVnode)) {
			patchVnode(oldEndVnode, newStartVnode);
			api.insertBefore(parentEle, oldEndVnode.el, oldStartVnode.el);
			oldEndVnode = oldCh[--oldEndIndex];
			newStartVnode = newCh[++newStartIndex];
		} else {
			if(oldKeyToIdx === null) {
				oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIndex, oldEndIndex);
			}
			idxInOld = oldKeyToIdx[newStartVnode.key];
			if(!idxInOld) {
				api.insertBefore(parentEle, createEle(newStartVnode).el, oldStartVnode.el);
			} else {
				elToMove = oldCh[idxInOld];
				if(elToMove.sel !== newStartVnode.sel) {
					api.insertBefore(parentEle, createEle(newStartVnode).el, oldStartVnode.el);
				}
				patchVnode(elToMove, newStartVnode);
				api.insertBefore(parentEle, elToMove, oldStartVnode.el);
				oldCh[idxInOld] = null;
			}
			newStartVnode = newCh[++newStartIndex];
		}
	}

	if(oldStartIndex > oldEndIndex) {
		// 添加新虚拟树剩余节点
		let tmpNode = newCh[newStartIndex + 1];
		before = tmpNode && tmpNode.el;
		addNodes(parentEle, before, newCh, newStartIndex, newEndIndex);
	} else if(newStartIndex > newEndIndex) {
		removeNodes(parentEle, oldCh, oldStartIndex, oldEndIndex);
	}
}