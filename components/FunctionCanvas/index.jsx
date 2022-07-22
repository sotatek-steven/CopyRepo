import { Box } from '@mui/system';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, useNodesState, ReactFlowProvider } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CustomNodes from '../CustomNode';
import { generateNodeId } from './CreateElement';

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const FunctionCanvas = ({ initialNodes }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeDeleted, setNodeDeleted] = useState(null);
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const nodeTypes = useMemo(() => CustomNodes, []);

  /**
   * @param {*} id to update node list of react flow
   * @param {*} functionId to update module list of contract
   */
  const deleteNode = (id, functionId) => {
    if (!id || !functionId) return;
    setNodeDeleted({ id, functionId });
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(() => {
    const data = initialNodes.map((item) => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        },
      };
    });
    return data;
  });

  useEffect(() => {
    if (!nodeDeleted) return;
    const updatedNodes = nodes.filter((node) => node.id !== nodeDeleted.id);
    setNodes(updatedNodes);

    removeFunctionFromModule(nodeDeleted.functionId);
  }, [nodeDeleted, setNodes]);

  const removeFunctionFromModule = (functionId) => {
    let { functions, coordinates } = moduleState.sources;

    //update moudles feild
    const updatedFunctions = functions.filter((item) => item._id !== functionId);

    //update coordinates field
    const updatedCoordinates = coordinates.filter((item) => item.func !== functionId);

    updateModuleState(updatedFunctions, updatedCoordinates);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    const data = initialNodes.map((item) => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        },
      };
    });
    setNodes(data);
  }, [initialNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

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

      //get data of node
      const dataJson = event.dataTransfer.getData('foo');
      const data = JSON.parse(dataJson);

      const { functions } = moduleState.sources;
      if (!functions || functions.some((item) => item === data._id)) return;

      //add new node
      const newNode = {
        id: generateNodeId(),
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

      //update contract state
      addNewFuctionToModule(data, position);
    },
    [reactFlowInstance, setNodes, moduleState.functions, nodes]
  );

  const updateModuleState = async (modules, coordinates) => {
    userModule.updateFunctions(modules);
    userModule.updateCoordinates(coordinates);
    const { data } = await userModule.updateModule();
    userModule.update(data);
  };

  const addNewFuctionToModule = (functionInfo, position) => {
    if (!functionInfo) return;
    let { functions, coordinates } = moduleState.sources;

    //update moudles feild
    functions.push(functionInfo);

    //update coordinates field
    const newModule = {
      position,
      func: functionInfo._id,
    };
    coordinates.push(newModule);

    updateModuleState(functions, coordinates);
  };

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

  // const lockCanvas = (isInteractive) => {
  //   /**
  //    * lock the canvas
  //    */
  // };

  useEffect(() => {
    console.log('node: ', nodes);
  }, [nodes]);

  return (
    <ReactFlowProvider>
      <Box sx={{ ...styles.backgroundFlow }} style={{ height: '100%', position: 'relative' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          defaultZoom={1}>
          {}
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

export default FunctionCanvas;
