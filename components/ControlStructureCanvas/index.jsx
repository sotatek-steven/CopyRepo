import { FAKE_DATA } from '@/store/models/fakeData';
import { Box } from '@mui/system';
import ObjectID from 'bson-objectid';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
  addEdge,
  updateEdge,
  Controls,
} from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import CustomNodes from '../CustomNode';
import { createEdges } from './CreateElement';

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const ControlStructureCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes: blocksState, edges: edgesState } = useSelector((state) => state.logicBlocks);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(blocksState);
    setEdges(edgesState);
  }, [blocksState, edgesState]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  };

  // useEffect(() => {
  //   setEdges(createEdges(nodes));
  // }, [nodes]);

  return (
    <ReactFlowProvider>
      <Box sx={{ ...styles.backgroundFlow }} style={{ height: '100%', position: 'relative' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          draggable={false}
          // onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultZoom={1}
          zoomOnScroll={false}
          onEdgeUpdate={onEdgeUpdate}>
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      {/* <button onClick={onDrop}>Lorem ipsum</button> */}
    </ReactFlowProvider>
  );
};

export default ControlStructureCanvas;
