import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const logicBlocksState = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    const _logicBlocksState = [...logicBlocksState];
    const index = logicBlocksState.findIndex((item) => item?.id === id);

    _logicBlocksState[index]['type'] = 'drop';
    _logicBlocksState[index]['data'] = null;

    logicBlocks.set(_logicBlocksState);
  };

  const deleteDropNode = (id) => {
    const _logicBlocksState = [...logicBlocksState];
    const index = logicBlocksState.findIndex((item) => item?.id === id);

    _logicBlocksState.splice(index, 1);
    logicBlocks.set(_logicBlocksState);
  };

  return {
    removeNode,
    deleteDropNode,
  };
};

export default useBlock;
