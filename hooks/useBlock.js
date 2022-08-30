import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['type'] = 'drop';
    _blocksState[index]['data'] = null;

    logicBlocks.setBlocks(_blocksState);
  };

  const deleteDropNode = (id) => {
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState.splice(index, 1);
    logicBlocks.setBlocks(_blocksState);
  };

  return {
    removeNode,
    deleteDropNode,
  };
};

export default useBlock;
