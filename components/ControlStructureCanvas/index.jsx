import { convertToELKFormat } from '@/utils/functionData/convertToELKFormat';
import { Box } from '@mui/system';
import _ from 'lodash';
import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
  addEdge,
  updateEdge,
} from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import CustomNodes from '../CustomNode';
import ELK from 'elkjs/lib/elk.bundled.js';
import { convertFromELKDataToDisplayData } from '@/utils/functionData/convertFromELKDataToDisplayData';

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const ControlStructureCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const logicBlocks = useSelector((state) => state.logicBlocks);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(async () => {
    const elk = new ELK();
    const graph = convertToELKFormat(logicBlocks);

    if (!graph || _.isEmpty(graph)) return;

    const layout = await elk.layout(graph);

    const { nodes, edges } = convertFromELKDataToDisplayData(layout);
    setNodes(nodes);
    setEdges(edges);
  }, [logicBlocks]);

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
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          zoomActivationKeyCode={false}
          onEdgeUpdate={onEdgeUpdate}>
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      {/* <button onClick={onDrop}>Lorem ipsum</button> */}
    </ReactFlowProvider>
  );
};

export default ControlStructureCanvas;
