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
  // const { declaration } = useDispatch();
  // const { declarations, declaEditing } = useSelector((state) => state.declaration);
  const logicBlocksState = useSelector((state) => state.logicBlocks);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(logicBlocksState);
  }, [logicBlocksState]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  //event, { position, dropItemId }
  // const onDrop = () => {
  // event.preventDefault();
  // if (!event.dataTransfer) return;
  // const type = event.dataTransfer.getData('application/reactflow');

  // const newNode = {
  //   id: ObjectID(24).toHexString(),
  //   type: type,
  //   position,
  //   data: null,
  // };

  // console.log('logicBlocksState: ', logicBlocksState);
  // console.log('dropItemId: ', dropItemId);
  // const dropItemIndex = logicBlocksState.findIndex((item) => item.id === dropItemId);
  // console.log('dropItemIndex: ', dropItemIndex);
  // const dropItem = logicBlocks[dropItemIndex];
  // dropItem.position = {
  //   x: dropItem.position.x,
  //   y: dropItem.position.y + 100,
  // };

  // logicBlocksState.splice(dropItemIndex, 1, newNode, dropItem);

  // logicBlocks.set(logicBlocks);

  // const data = JSON.parse(event.dataTransfer.getData('foo'));
  // if (type === 'declaration') {
  //   const dataDecla = [...declarations];
  //   const _id = ObjectID(32).toHexString();

  //   dataDecla.push({
  //     textDeclaration: '',
  //     _id,
  //     position,
  //     typeNode: 'declaration',
  //     mode: 'editing',
  //   });
  //   declaration.updateDeclarations(dataDecla);
  //   declaration.setDeclaEditing(_id);
  // }

  // if (type === 'assignment') {
  //   const dataDecla = [...declarations];
  //   dataDecla.push({
  //     data: {
  //       variable: null,
  //       value: '',
  //     },
  //     _id: ObjectID(32).toHexString(),
  //     position,
  //     typeNode: 'assignment',
  //     mode: 'editing',
  //   });
  //   declaration.updateDeclarations(dataDecla);
  // }
  // };
  // const handleChangeMode = (declarationId) => {
  //   if (declaEditing) return;

  //   const data = [...declarations];
  //   data.forEach((item) => {
  //     item['mode'] = item?._id === declarationId ? 'editing' : 'init';
  //   });

  //   declaration.updateDeclarations(data);
  //   declaration.setDeclaEditing(declarationId);
  // };

  // const handleConfirm = (declarationId, textValue) => {
  //   const data = [...declarations];
  //   data.forEach((item) => {
  //     item['mode'] = 'init';
  //     item['textDeclaration'] = item?._id === declarationId ? textValue : item?.textDeclaration;
  //   });

  //   declaration.updateDeclarations(data);
  //   declaration.setDeclaEditing('');
  // };

  // const handleCancel = (declarationId) => {
  //   const data = [...declarations];
  //   const index = declarations.findIndex((item) => item?._id === declarationId);
  //   data[index]['mode'] = 'init';
  // };

  // const handleConfirm = (declarationId, textValue) => {
  //   const data = [...declarations];
  //   data.forEach((item) => {
  //     item['mode'] = 'init';
  //     item['textDeclaration'] = item?._id === declarationId ? textValue : item?.textDeclaration;
  //   });

  //   declaration.updateDeclarations(data);
  //   declaration.setDeclaEditing('');
  // };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  };

  // useEffect(() => {
  //   handleCreateNode();
  // }, [declarations]);

  // const handleCreateNode = () => {
  //   const data = [...declarations];
  //   const START_NODE = {
  //     indentifier: 'Start',
  //     typeNode: 'circle',
  //     position: { x: data[0]?.position?.x - 200 || 200, y: data[0]?.position?.y || 200 },
  //   };

  //   const DROP_NODE = {
  //     handleDrop: handleDrop,
  //     typeNode: 'drop',
  //     position: {
  //       x:
  //         data[data?.length - 1]?.mode === 'editing'
  //           ? data[data?.length - 1]?.position?.x + 500
  //           : data[data?.length - 1]?.position?.x + 300 || 500,
  //       y: data[data?.length - 1]?.position?.y || 200,
  //     },
  //   };

  //   const END_NODE = {
  //     indentifier: 'End',
  //     typeNode: 'circle',
  //     position: {
  //       x:
  //         data[data?.length - 1]?.mode === 'editing'
  //           ? data[data?.length - 1]?.position?.x + 800
  //           : data[data?.length - 1]?.position?.x + 600 || 800,
  //       y: data[data?.length - 1]?.position?.y || 200,
  //     },
  //   };

  //   data.forEach((item) => {
  //     item.handleChangeMode = handleChangeMode;
  //     item.handleConfirm = handleConfirm;
  //     item.handleCancel = handleCancel;
  //   });

  //   data.unshift(START_NODE);
  //   data.push(END_NODE);
  //   setNodes(createNodes(data));
  // };

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
          // onDrop={onDrop}
          onInit={setReactFlowInstance}
          onDragOver={onDragOver}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultZoom={1}
          onEdgeUpdate={onEdgeUpdate}>
          {/* <Controls
            style={{ bottom: '100px', left: '65px' }}
            // onInteractiveChange={lockCanvas}
          /> */}
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      {/* <button onClick={onDrop}>Lorem ipsum</button> */}
    </ReactFlowProvider>
  );
};

export default ControlStructureCanvas;
