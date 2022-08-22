import { Box } from '@mui/system';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState,
  addEdge,
  updateEdge,
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CustomNodes from '../CustomNode';
import DeclarationModal from '../functionsPage/DeclarationModal';

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const ControlStructureCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const { userModule, declaration } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const { declaration: dataDeclaration } = useSelector((state) => state.declaration);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [isOpenDeclaration, setIsOpenDeclaration] = useState(false);

  // Reset Declaration
  useEffect(() => {
    if (!isOpenDeclaration) {
      declaration.resetDeclaration();
    }
  }, [isOpenDeclaration]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDrop = () => {
    setIsOpenDeclaration(true);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDragStop = (event, node) => {
    const { data, position } = node;
    const { coordinates } = moduleState.sources;
    const updatedCoordinates = coordinates.map((item) => {
      return item.func === data._id
        ? {
            ...item,
            position,
          }
        : item;
    });
    userModule.updateCoordinates(updatedCoordinates);
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  };

  const onComfirm = () => {
    setIsOpenDeclaration(false);
  };

  return (
    <ReactFlowProvider>
      <Box sx={{ ...styles.backgroundFlow }} style={{ height: '100%', position: 'relative' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultZoom={1}
          onEdgeUpdate={onEdgeUpdate}>
          <Controls
            style={{ bottom: '100px', left: '65px' }}
            // onInteractiveChange={lockCanvas}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      <DeclarationModal open={isOpenDeclaration} onClose={() => setIsOpenDeclaration(false)} onComfirm={onComfirm} />
    </ReactFlowProvider>
  );
};

export default ControlStructureCanvas;
