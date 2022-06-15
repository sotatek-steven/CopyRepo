import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'react-flow-renderer';
import CustomNodes from './CustomNode';

const initialNodes = [
];

const initialEdges = [
  { id: 'e2-3', source: '1', target: '2' },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const SmartContractDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), []);

  const onNodeClick = (event, el) => {
    console.log('click node: ', el.id);
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const deleteNode = () => {
    if (!nodeId) return;
    const _nodes = currentNodes.filter(node => node._id !== nodeId);
    console.log('nodes result: ', _nodes);
    // setNodes(_nodes);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!event.dataTransfer) return;
      const type = event.dataTransfer.getData('application/reactflow');
      const dataJson = event.dataTransfer.getData('foo');
      const data = JSON.parse(dataJson);

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        _id: data._id,
        type,
        position,
        data: {
          label: `${type} node`,
          ...data,
          onDeleteNode: deleteNode,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );


  return (
    <ReactFlowProvider>
      <div style={{ height: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          nodeTypes={CustomNodes}
          onDragOver={onDragOver}
        // fitView
        // attributionPosition="top-right"
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default SmartContractDrop;
