import { Box } from '@mui/system';
import ObjectID from 'bson-objectid';
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
  const { declaration } = useDispatch();
  const { declarations, declaEditing } = useSelector((state) => state.declaration);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDrop = (event) => {
    if (declaEditing) return;
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!event.dataTransfer) return;
    const type = event.dataTransfer.getData('application/reactflow');
    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) return;
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    // const data = JSON.parse(event.dataTransfer.getData('foo'));
    if (type === 'declaration') {
      const dataDecla = [...declarations];
      const _id = ObjectID(32).toHexString();

      dataDecla.push({
        textDeclaration: '',
        _id,
        position,
        typeNode: 'declaration',
        mode: 'editing',
      });
      declaration.updateDeclarations(dataDecla);
      declaration.setDeclaEditing(_id);
    }

    if (type === 'assignment') {
      const dataDecla = [...declarations];
      dataDecla.push({
        data: {
          variable: null,
          value: '',
        },
        _id: ObjectID(32).toHexString(),
        position,
        typeNode: 'assignment',
        mode: 'editing',
      });
      declaration.updateDeclarations(dataDecla);
    }
  };

  const handleChangeMode = (declarationId) => {
    if (declaEditing) return;

    const data = [...declarations];
    const index = declarations.findIndex((item) => item?._id === declarationId);
    data[index]['mode'] = 'editing';

    declaration.updateDeclarations(data);
    declaration.setDeclaEditing(declarationId);
  };

  const handleConfirm = (declarationId, nodeData) => {
    const data = [...declarations];
    const index = declarations.findIndex((item) => item?._id === declarationId);
    // Update Declaration
    data[index]['mode'] = 'init';
    data[index]['type'] = nodeData?.type;
    data[index]['indentifier'] = nodeData?.indentifier;
    data[index]['isArray'] = nodeData?.isArray;
    data[index]['location'] = nodeData?.location;
    data[index]['value'] = nodeData?.value;
    data[index]['textDeclaration'] = nodeData?.textDeclaration;

    declaration.updateDeclarations(data);
    declaration.setDeclaEditing('');
  };

  const handleCancel = (declarationId) => {
    const data = [...declarations];
    const index = declarations.findIndex((item) => item?._id === declarationId);
    data[index]['mode'] = 'init';

    declaration.updateDeclarations(data);
    declaration.setDeclaEditing('');
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
      typeNode: 'circle',
      position: { x: data[0]?.position?.x - 200 || 200, y: data[0]?.position?.y || 200 },
    };
    const END_NODE = {
      indentifier: 'End',
      typeNode: 'circle',
      position: {
        x:
          data[data?.length - 1]?.mode === 'editing'
            ? data[data?.length - 1]?.position?.x + 600
            : data[data?.length - 1]?.position?.x + 300 || 500,
        y: data[data?.length - 1]?.position?.y || 200,
      },
    };

    data.forEach((item) => {
      item.handleChangeMode = handleChangeMode;
      item.handleConfirm = handleConfirm;
      item.handleCancel = handleCancel;
    });

    data.unshift(START_NODE);
    data.push(END_NODE);
    setNodes(createNodes(data));
  };

  useEffect(() => {
    setEdges(createEdges(nodes));
  }, [nodes]);

  return (
    <ReactFlowProvider>
      <Box sx={{ ...styles.backgroundFlow }} style={{ height: '100%', position: 'relative' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
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
    </ReactFlowProvider>
  );
};

export default ControlStructureCanvas;
