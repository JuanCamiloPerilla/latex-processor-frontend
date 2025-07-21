import React, { useMemo } from 'react';
import LogicTree from './LogicTree';

function treeToReactFlow(tree, baseX = 0, baseY = 0, level = 0) {
  if (!tree) return { nodes: [], edges: [] };

  const height = getTreeHeight(tree);
  const offset = ((height*50))+100

  const id = `${tree.value}-` + Math.random().toString(36).substring(2, 8);
  const node = {
    id,
    data: { label: tree.value },
    position: { x: baseX, y: baseY + level * 100 },
  };

  const children = [];
  const edges = [];

  if (tree.left) {
    const left = treeToReactFlow(tree.left, baseX - offset, baseY, level + 1);
    children.push(...left.nodes);
    edges.push(...left.edges, { id: `${id}-left`, source: id, target: left.nodes[0].id });
  }

  if (tree.right) {
    const right = treeToReactFlow(tree.right, baseX + offset, baseY, level + 1);
    children.push(...right.nodes);
    edges.push(...right.edges, { id: `${id}-right`, source: id, target: right.nodes[0].id });
  }

  return {
    nodes: [node, ...children],
    edges,
  };
}

function TreeBuilder({ currentTree, stack }) {
  const currentTreeHeight = getTreeHeight(currentTree);
  const { nodes: currentTreeNodes, edges: currentTreeEdges } = useMemo(() => treeToReactFlow(currentTree), [currentTree]);
  let stackNodes = [];
  let stackEdges = [];
  stack.forEach((subtree, i) => {
    if (i=== 0) return;
    let offset = 0;
    if (currentTreeHeight > 0) {
      offset = ((currentTreeHeight)*i*200)+120;
    }
    const { nodes, edges } = treeToReactFlow(subtree, 0, offset);
    offset += offset;
    stackNodes.push(...nodes);
    stackEdges.push(...edges);
  });
  return <LogicTree nodes={[...currentTreeNodes, ...stackNodes]} edges={[...currentTreeEdges, ...stackEdges]} />;
}

function getTreeHeight(subtree) {
  if (!subtree) return 0;

  const leftHeight = getTreeHeight(subtree.left);
  const rightHeight = getTreeHeight(subtree.right);

  return 1 + Math.max(leftHeight, rightHeight);
}

export default TreeBuilder;
