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
import useEnumPage from '../EnumTabPanel/hooks/useEnumPage';
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
  const { enums } = useSelector((state) => state.enumState);
  const nodeTypes = useMemo(() => CustomNodes, []);
  const { handelAddStruct, convertStructToFEDisplay } = useStructPage();
  const { handelAddEnum, convertEnumToFEDisplay } = useEnumPage();
  const [identifierModalOpen, setIdentifierModalOpen] = useState(false);
  const [missingIdentifiers, setMissingIdentifiers] = useState([]);

  const handleIdentifierModalClose = () => {
    setIdentifierModalOpen(false);
  };

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

  const createNodeFromFunc = (
    funcData,
    type,
    position,
    newNode = [],
    listFunc = [],
    listStruct = [],
    listEnum = []
  ) => {
    let funcDepen = [];

    // Create Struct
    let listStructName = _.concat(structs, listStruct).map((item) => item?.name);
    let listEnumName = _.concat(enums, listEnum).map((item) => item?.name);

    funcData?.structs?.forEach((struct) => {
      if (!listStructName.includes(struct?.name)) {
        listStruct.push(struct);
      }
    });

    // Create Enum
    funcData?.enums?.forEach((item) => {
      if (!listEnumName.includes(item?.name)) {
        listEnum.push(item);
      }
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

    if (funcData?.modifiers?.length) {
      let modifierDepen = [];
      funcData?.modifiers?.forEach((modi) => {
        modifierDepen = _.concat(modifierDepen, modi?.content?.dependencies);
      });

      funcDepen = _.uniq(_.concat(funcDepen, modifierDepen));
    }

    funcDepen.forEach((depen, index) => {
      position = {
        ...position,
        y: position.y - (index + 1) * 120,
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

      listStructName = _.concat(structs, listStruct).map((item) => item?.name);
      listEnumName = _.concat(enums, listEnum).map((item) => item?.name);

      // Create Struct of dependence
      depen?.structs?.forEach((struct) => {
        if (!listStructName.includes(struct?.name)) {
          listStruct.push(struct);
        }
      });

      // Create Enum of dependence
      depen?.enums?.forEach((item) => {
        if (!listEnumName.includes(item?.name)) {
          listEnum.push(item);
        }
      });

      if (depen?.dependencies?.length) {
        createNodeFromFunc(depen, type, position, newNode, listFunc, listStruct, listEnum);
      }
    });
    newNode = _.unionBy(newNode, 'id');
    listFunc = _.unionBy(listFunc, '_id');

    return { newNode, listFunc, listStruct, listEnum };
  };

  const getMissingIdentifiers = (listFunc) => {
    const allMissingIdentifiers = listFunc.reduce((arr, item) => {
      const { globalVariables, _id } = item;
      const updatedGlobalVariables = globalVariables?.map((item) => ({
        ...item,
        func: _id,
      }));
      return arr.concat(updatedGlobalVariables);
    }, []);

    //remove duplicate missing variables
    const paramsMapper = {};
    allMissingIdentifiers.forEach((el) => {
      const key = JSON.stringify(_.omit(el, ['func', '_id']));
      if (!paramsMapper[key]) {
        paramsMapper[key] = [];
      }
      paramsMapper[key].push(el);
    });

    const missingIdentifiers = Object.entries(paramsMapper).map(([key, value]) => ({
      ...JSON.parse(key),
      func: value.map((e) => e.func),
    }));

    return missingIdentifiers;
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
      const { newNode, listFunc, listStruct, listEnum } = createNodeFromFunc(data, type, position);

      //open Identifier modal
      const missingIdentify = getMissingIdentifiers(listFunc);
      const isOpen = !!missingIdentify.length;
      setIdentifierModalOpen(isOpen);
      setMissingIdentifiers(missingIdentify);

      setNodes((nds) => _.unionBy(_.concat(nds, newNode), 'id'));
      addNewFuctionToModule(listFunc, position);
      handelAddStruct(convertStructToFEDisplay(listStruct));
      handelAddEnum(convertEnumToFEDisplay(listEnum));
    },
    [reactFlowInstance, setNodes, moduleState.functions, nodes]
  );

  const updateModuleState = async (modules, coordinates, libraries) => {
    userModule.updateFunctions(modules);
    userModule.updateCoordinates(coordinates);
    userModule.updateLibraries(libraries);
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
          y: position.y - (index + 1) * 120,
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
          <Controls style={{ bottom: '100px', left: '65px' }} />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      <IndentifierModal
        open={identifierModalOpen}
        onClose={handleIdentifierModalClose}
        identifiers={missingIdentifiers}
        redirectToAddField={redirectToAddField}
      />
    </ReactFlowProvider>
  );
};

export default FunctionCanvas;
