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

let id = 0;
const getId = () => `dndnode_${id++}`;

const ModuleDrop = ({ initialNodes, initialEdges }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const deleteNode = (nodeId) => {
    if (!nodeId) return;
    const _nodes = nodes.filter(node => node.id !== nodeId);
    setNodes(_nodes);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(() => {
    const data = initialNodes.map(item => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        }
      }
    });
    return data;
  });
  
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
          event: 'drop',
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

export default ModuleDrop;
