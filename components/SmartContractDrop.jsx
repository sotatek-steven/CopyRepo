import React, { useState, useRef, useCallback } from 'react';
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
  {
    id: '1',
    type: 'rectangle',
    data: { label: 'Input Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '2',
    type: 'diamond',
    data: { label: 'Input Node' },
    position: { x: 50, y: 50 },
  },
  {
    id: '3',
    type: 'circle',
    data: { label: 'Input Node' },
    position: { x: 300, y: 50 },
  },
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


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!event.dataTransfer) return;
      const type = event.dataTransfer.getData('application/reactflow');
      const data = event.dataTransfer.getData('data');
      console.log('data:', data);
      console.log(data);

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
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
        <div>
            <ReactFlowProvider>
                <div style={{ height: 500 }}>
                    <div style={{ height: 500 }} ref={reactFlowWrapper}>
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
                            fitView
                        // attributionPosition="top-right"
                        >
                            <Controls />
                            <Background color="#aaa" gap={16} />
                        </ReactFlow>
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
  );
};

export default SmartContractDrop;
