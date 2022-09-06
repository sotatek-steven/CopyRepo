import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const { nodes: blocksState, edges } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['type'] = 'drop';
    _blocksState[index]['data'] = {
      allowRemove: true,
    };

    logicBlocks.setBlocks(_blocksState);
  };

  const deleteDropNode = (id) => {
    const index = blocksState.findIndex((item) => item?.id === id);

    //find next block and pre block
    const nextBlockId = edges.find((item) => item.source === id).target;
    // const nextBlock = blocksState.find((item) => item.id === nextBlockId);

    const preBlockId = edges.find((item) => item.target === id).source;
    // const preBlock = blocksState.find((item) => item.id === preBlockId);

    _deleteBlock(index);
    createEdge(preBlockId, nextBlockId);

    updateDropItemNodes();

    // if (!nextBlock || nextBlock.type === 'activityFinal') {
    //   if (preBlock.type === 'drop') {
    //     _deleteBlock(index);
    //     createEdge(preBlockId, nextBlockId);
    //   }
    // } else {
    //   _deleteBlock(index);
    //   createEdge(preBlockId, nextBlockId);
    // }
  };

  const updateDropItemNodes = () => {
    const dropItemNodeIds = blocksState.filter((block) => block.type === 'drop');
    const _blocksState = [...blocksState];
    dropItemNodeIds.forEach((id) => {
      const index = blocksState.findIndex((item) => item?.id === id);

      //find next block and pre block
      const nextBlockId = edges.find((item) => item.source === id).target;
      const nextBlock = blocksState.find((item) => item.id === nextBlockId);

      const preBlockId = edges.find((item) => item.target === id).source;
      const preBlock = blocksState.find((item) => item.id === preBlockId);

      if (!nextBlock || nextBlock.type === 'activityFinal') {
        if (preBlock.type === 'drop') {
          // _deleteBlock(index);
          _blocksState[index].data.allowRemove = true;
          createEdge(preBlockId, nextBlockId);
        } else {
          _blocksState[index].data.allowRemove = false;
        }
      } else {
        // _deleteBlock(index);
        _blocksState[index].data.allowRemove = true;
        createEdge(preBlockId, nextBlockId);
      }
    });

    logicBlocks.setBlocks(_blocksState);
  };

  const _deleteBlock = (indexBlock) => {
    const _blocksState = [...blocksState];
    _blocksState.splice(indexBlock, 1);
    logicBlocks.setBlocks(_blocksState);
  };

  const createEdge = (source, target) => {
    const newEdge = {
      id: `${source}-${target}`,
      source,
      target,
      markerEnd: { type: 'arrowclosed', color: '#fff' },
      style: { strokeWidth: 2 },
    };
    logicBlocks.addEdge(newEdge);
  };

  return {
    removeNode,
    deleteDropNode,
  };
};

export default useBlock;
