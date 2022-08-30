import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const { nodes: blocksState, edges } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['type'] = 'drop';
    _blocksState[index]['data'] = null;

    logicBlocks.setBlocks(_blocksState);
  };

  const deleteDropNode = (id) => {
    const index = blocksState.findIndex((item) => item?.id === id);

    //find next block and pre block
    const nextBlock = edges.findLast((item) => item.source === id);
    const preBlock = edges.findLast((item) => item.target === id);

    console.log('blocksState: ', blocksState);
    console.log('nextBlock: ', nextBlock);
    console.log('preBlock: ', preBlock);
    if (!nextBlock || nextBlock.type === 'activityFinal') {
      if (preBlock.type === 'drop') _deleteBlock(index);
    } else _deleteBlock(index);
  };

  const _deleteBlock = (indexBlock) => {
    const _blocksState = [...blocksState];
    _blocksState.splice(indexBlock, 1);
    logicBlocks.setBlocks(_blocksState);
  };

  return {
    removeNode,
    deleteDropNode,
  };
};

export default useBlock;
