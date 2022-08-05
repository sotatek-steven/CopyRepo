import { FUNCTION_TYPE, STRUCT_POOLINFO, STRUCT_USERINFO } from '@/config/constant/common';
import { Box } from '@mui/system';
import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { toast } from 'react-toastify';
import CustomNodes from '../CustomNode';
import ErrorsCompileModal from '../ErrorsCompileModal';
import IndentifierModal from '../IndentifierModal';
import useStructPage from '../StructTabPanel/hooks/useStructPage';

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const FunctionCanvas = ({ initialNodes, initialEdges, redirectToAddField }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeDeleted, setNodeDeleted] = useState(null);
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const { functions: listFunction } = useSelector((state) => state.functions);
  const { structs } = useSelector((state) => state.struct);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const { handelAddStruct } = useStructPage();
  const [identifierModalOpen, setIdentifierModalOpen] = useState(false);
  const [stateVariablesOfDropFunctions, setStateVariablesOfDropFunctions] = useState([]);

  const handleIdentifierModalClose = () => {
    setIdentifierModalOpen(false);
  };

  // useEffect(() => {
  //   console.log('identifier: ', identifierModalOpen);
  // }, [identifierModalOpen]);

  /**
   * @param {*} id to update node list of react flow
   * @param {*} functionId to update module list of contract
   */
  const deleteNode = (id, functionId) => {
    if (!id || !functionId) return;

    let isDependence = false;
    nodes.every((node) => {
      if (node?.data?.dependencies?.includes(functionId)) {
        isDependence = true;
        return false;
      }
      return true;
    });

    if (isDependence) {
      toast.warning('This function is using');
      return;
    }

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

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Effect Remove node
  useEffect(() => {
    if (!nodeDeleted) return;
    const updatedNodes = nodes.filter((node) => node.id !== nodeDeleted.id);
    setNodes(updatedNodes);

    removeFunctionFromModule(nodeDeleted.functionId);
  }, [nodeDeleted, setNodes]);

  const removeFunctionFromModule = (functionId) => {
    let { functions, coordinates, libraries } = moduleState.sources;

    //update moudles feild
    const updatedFunctions = functions.filter((item) => item._id !== functionId);

    //update coordinates field
    const updatedCoordinates = coordinates.filter((item) => item.func !== functionId);

    updateModuleState(updatedFunctions, updatedCoordinates, libraries);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    const data = initialNodes?.map((item) => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        },
      };
    });

    setNodes(data);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const createNodeFromFunc = (funcData, type, position, newNode = [], listFunc = [], listStruct = []) => {
    let funcDepen = [];

    // Create Struct
    const listStructName = _.concat(structs, listStruct).map((item) => item?.name?.toUpperCase());

    funcData?.globalVariables?.every((variable) => {
      if (variable?.type.toUpperCase() === FUNCTION_TYPE.POOLINFO && !listStructName.includes(FUNCTION_TYPE.POOLINFO)) {
        listStruct.push(STRUCT_POOLINFO);
        return false;
      }
      return true;
    });

    funcData?.globalVariables?.every((variable) => {
      if (
        variable?.type.toUpperCase()?.includes(FUNCTION_TYPE.USERINFO) &&
        !listStructName.includes(FUNCTION_TYPE.USERINFO)
      ) {
        listStruct.push(STRUCT_USERINFO);
        return false;
      }
      return true;
    });

    // Create Node
    newNode.push({
      id: funcData?._id,
      type,
      position,
      data: {
        label: `${type} node`,
        ...funcData,
        onDeleteNode: deleteNode,
        event: 'drop',
      },
    });
    listFunc.push(funcData);

    funcDepen = listFunction?.filter((item) => funcData?.dependencies?.includes(item?._id));
    funcDepen.forEach((depen, index) => {
      position = {
        ...position,
        y: position.y + (index + 1) * 120,
      };
      newNode.push({
        id: depen?._id,
        type,
        position,
        data: {
          label: `${type} node`,
          ...depen,
          onDeleteNode: deleteNode,
          event: 'drop',
        },
      });
      listFunc.push(depen);

      if (depen?.dependencies?.length) {
        createNodeFromFunc(depen, type, position, newNode, listFunc, listStruct);
      }
    });
    newNode = _.unionBy(newNode, 'id');
    listFunc = _.unionBy(listFunc, '_id');

    return { newNode, listFunc, listStruct };
  };

  const getStateVariables = (listFunc) => {
    listFunc?.concat(listFunc);
    const stateVariable = listFunc.reduce((arr, item) => {
      const { globalVariables, _id } = item;
      const updatedGlobalVariables = globalVariables?.map((item) => ({
        ...item,
        func: _id,
      }));
      return arr.concat(updatedGlobalVariables);
    }, []);

    return stateVariable;
  };

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
      const { newNode, listFunc, listStruct } = createNodeFromFunc(data, type, position);

      const stateVariables = getStateVariables(listFunc);

      //open Identifier modal
      const isOpen = !!data.globalVariables.length;
      setIdentifierModalOpen(isOpen);
      setStateVariablesOfDropFunctions(stateVariables);
      setNodes((nds) => _.unionBy(_.concat(nds, newNode), 'id'));
      addNewFuctionToModule(listFunc, position);
      handelAddStruct(listStruct);
    },
    [reactFlowInstance, setNodes, moduleState.functions, nodes]
  );

  const updateModuleState = async (modules, coordinates, libraries) => {
    userModule.updateFunctions(modules);
    userModule.updateCoordinates(coordinates);
    userModule.updateLibraries(libraries);
    // const { data } = await userModule.updateModule();
    // userModule.update(data);
  };

  const addNewFuctionToModule = (funcData, position) => {
    if (!funcData) return;
    let { functions, coordinates, libraries } = moduleState.sources;

    //update moudles feild
    const listFunc = _.concat(functions, funcData);

    //update coordinates field
    const tempCoor = funcData?.map((item, index) => {
      return {
        position: {
          ...position,
          y: position.y + (index + 1) * 120,
        },
        func: item?._id,
      };
    });
    const listCoordi = _.concat(coordinates, tempCoor);

    // update libraries
    const tempLi = funcData?.map((item) => {
      return item?.libraries?.map((li) => {
        return li?.name;
      });
    });
    const listLibrary = _.uniq(_.concat(libraries, tempLi?.flat(1)));
    updateModuleState(listFunc, listCoordi, listLibrary);
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

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
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
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          defaultZoom={1}
          onEdgeUpdate={onEdgeUpdate}>
          <Controls
            style={{ bottom: '100px', left: '65px' }}
            // onInteractiveChange={lockCanvas}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      <IndentifierModal
        open={identifierModalOpen}
        onClose={handleIdentifierModalClose}
        stateVariables={stateVariablesOfDropFunctions}
        redirectToAddField={redirectToAddField}
      />
      {/* <ErrorsCompileModal /> */}
    </ReactFlowProvider>
  );
};

export default FunctionCanvas;
