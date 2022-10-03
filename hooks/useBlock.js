import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const { nodes: blocksState, edges } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    let _blocksState = [...blocksState];
    let _edgesState = [...edges];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['type'] = 'drop';
    _blocksState[index]['data'] = { allowRemove: true, size: { width: 200, height: 100 } };

    // list data will remove
    const listRemove = removeChildrenByParentId(_blocksState, [id]);
    listRemove.shift();
    _blocksState = _blocksState.filter((item) => !listRemove.includes(item?.id));
    _edgesState = _edgesState.filter((item) => !listRemove.includes(item?.source));

    _blocksState = updateDropItemNodes(_blocksState, _edgesState);
    logicBlocks.setNodes(_blocksState);
    logicBlocks.setEdges(_edgesState);
  };

  const removeChildrenByParentId = (listBlock, listIdRemove) => {
    let isParent = false;
    const blockTemp = [...listBlock];
    for (let i = 0; i < listBlock.length; i++) {
      if (listBlock[i].parentNode && listIdRemove.includes(listBlock[i].parentNode)) {
        if (!isParent) {
          for (let j = 0; j < listBlock.length; j++) {
            // if node have children
            if (listBlock[j].parentNode === listBlock[i].id) {
              isParent = true;
              break;
            }
          }
        }

        // push to list will remove
        listIdRemove.push(listBlock[i].id);
        // remove element removed
        const index = blockTemp.findIndex((item) => item?.id === listBlock[i].id);
        blockTemp.splice(index, 1);
      }
    }

    if (isParent) {
      removeChildrenByParentId(blockTemp, listIdRemove);
    }

    // return list id will delete
    return listIdRemove;
  };

  const deleteDropNode = (id) => {
    //delete drop node
    let _nodesState = blocksState.filter((item) => item.id !== id);
    let _edgesState = [...edges];

    //find next block
    const nextBlockId = edges.find((item) => item.source === id)?.target;

    if (nextBlockId) {
      //delete edge(id, nexBlockId)
      _edgesState = _edgesState.filter((item) => item.source !== id);
      //update target of edge(preBlockId, id)
      const edgeIndex = _edgesState.findIndex((item) => item.target === id);
      _edgesState[edgeIndex].target = nextBlockId;
    } else {
      //delete edge(preNodeId, id)
      _edgesState = _edgesState.filter((item) => item.target !== id);
    }

    //update allowRemove atribute of drop item node
    _nodesState = updateDropItemNodes(_nodesState, _edgesState);

    //update nodes and edges to store
    logicBlocks.set({ nodes: _nodesState, edges: _edgesState });
  };

  const updateDropItemNodes = (nodes, edges) => {
    const dropItemNodes = nodes.filter((block) => block.type === 'drop');
    dropItemNodes.forEach((node) => {
      const { id } = node;
      const index = nodes.findIndex((item) => item?.id === id);
      //find next block and pre block
      const nextBlockId = edges.find((item) => item.source === id)?.target;
      const nextBlock = nodes.find((item) => item.id === nextBlockId);

      const preBlockId = edges.find((item) => item.target === id)?.source;
      const preBlock = nodes.find((item) => item.id === preBlockId);

      if (!nextBlock || nextBlock.type === 'activityFinal') {
        if (preBlock.type === 'drop') {
          nodes[index].data.allowRemove = true;
        } else {
          nodes[index].data.allowRemove = false;
        }
      } else {
        nodes[index].data.allowRemove = true;
      }
    });
    return nodes;
  };

  return {
    removeNode,
    deleteDropNode,
  };
};

export default useBlock;
