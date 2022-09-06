import { createEdge } from '@/store/models/logicBlocks';
import { useDispatch, useSelector } from 'react-redux';

const useBlock = () => {
  const { nodes: blocksState, edges } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const removeNode = (id) => {
    let _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['type'] = 'drop';
    _blocksState[index]['data'] = {
      allowRemove: true,
    };

    _blocksState = updateDropItemNodes(_blocksState, edges);
    logicBlocks.setBlocks(_blocksState);
  };

  const deleteDropNode = (id) => {
    const index = blocksState.findIndex((item) => item?.id === id);

    //find next block and pre block
    const nextBlockId = edges.find((item) => item.source === id).target;
    const preBlockId = edges.find((item) => item.target === id).source;

    //delete drop node
    let _blocksState = [...blocksState];
    _blocksState.splice(index, 1);

    //remove all the edge connected
    const updatedEdges = edges.filter((edge) => edge.target !== id && edge.source !== id);

    //create edge bettween preBlock and newBlock
    updatedEdges.push(createEdge(nextBlockId, preBlockId));

    //update allowRemove atribute of drop item node
    _blocksState = updateDropItemNodes(_blocksState, updatedEdges);

    //update nodes and edges to store
    logicBlocks.set({ nodes: _blocksState, edges: updatedEdges });
  };

  const updateDropItemNodes = (nodes, edges) => {
    const dropItemNodes = nodes.filter((block) => block.type === 'drop');
    dropItemNodes.forEach((node) => {
      const { id } = node;
      const index = nodes.findIndex((item) => item?.id === id);

      //find next block and pre block
      const nextBlockId = edges.find((item) => item.source === id).target;
      const nextBlock = nodes.find((item) => item.id === nextBlockId);

      const preBlockId = edges.find((item) => item.target === id).source;
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
