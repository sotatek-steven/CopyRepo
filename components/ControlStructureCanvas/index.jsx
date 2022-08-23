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
import useDeclaration from '../functionsPage/hooks/useDeclaration';
import { createEdges, createNodes } from './CreateElement';

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
  const { indentifierError } = useDeclaration();
  const { declarations, declaration: dataDeclaration, position } = useSelector((state) => state.declaration);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
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

  const onDrop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('foo'));
    if (data?.name === 'Declaration') {
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!event.dataTransfer) return;
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      declaration.setPosition(position);
      setIsOpenDeclaration(true);
    }
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

  useEffect(() => {
    handleCreateNode();
  }, [declarations]);

  const handleCreateNode = () => {
    const data = [...declarations];
    const START_NODE = {
      indentifier: 'Start',
      type: 'circle',
      position: { x: data[0]?.position?.x - 200 || 200, y: data[0]?.position?.y || 200 },
    };
    const END_NODE = {
      indentifier: 'End',
      type: 'circle',
      position: {
        x: data[data?.length - 1]?.position?.x + 300 || 200,
        y: data[data?.length - 1]?.position?.y || 200,
      },
    };
    data.unshift(START_NODE);
    data.push(END_NODE);
    setNodes(createNodes(data));
  };

  useEffect(() => {
    setEdges(createEdges(nodes));
  }, [nodes]);

  const onComfirm = () => {
    // check error declaration
    const errorText = indentifierError(dataDeclaration?.indentifier);
    if (errorText) {
      const declara = { ...dataDeclaration, indentifierError: errorText };
      declaration.updateDeclaration(declara);
      return;
    }

    const data = [...declarations];
    data.push({ ...dataDeclaration, position, type: 'declaration' });
    declaration.updateDeclarations(data);
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
          onInit={setReactFlowInstance}
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
