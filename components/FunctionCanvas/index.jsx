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

const styles = {
  backgroundFlow: {
    '& .react-flow__attribution': {
      display: 'none !important',
    },
  },
};

const FunctionCanvas = ({ initialNodes, initialEdges }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeDeleted, setNodeDeleted] = useState(null);
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const { functions: listFunction } = useSelector((state) => state.functions);
  const nodeTypes = useMemo(() => CustomNodes, []);

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

  const createNodeFromFunc = (funcData, type, position) => {
    let funcDepen = [];
    let nodeDepen = [];
    const nodeFunc = [
      {
        id: funcData?._id,
        type,
        position,
        data: {
          label: `${type} node`,
          ...funcData,
          onDeleteNode: deleteNode,
          event: 'drop',
        },
      },
    ];

    if (funcData?.dependencies?.length) {
      funcDepen = listFunction?.filter((item) => funcData?.dependencies?.includes(item?._id));

      nodeDepen = funcDepen.map((depen) => {
        return {
          id: depen?._id,
          type,
          position,
          data: {
            label: `${type} node`,
            ...depen,
            onDeleteNode: deleteNode,
            event: 'drop',
          },
        };
      });
    }
    const newNode = _.concat(nodeFunc, nodeDepen);
    const listFunc = _.concat([funcData], funcDepen);

    setNodes((nds) => _.concat(nds, newNode));
    addNewFuctionToModule(listFunc, position);
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
      createNodeFromFunc(data, type, position);
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
          y: position.y + (index + 1) * 80,
        },
        func: item?._id,
      };
    });
    const listCoordi = _.concat(coordinates, tempCoor);

    // update libraries
    const tempLi = funcData?.map((item) => {
      return item?.libraries.map((li) => {
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
    </ReactFlowProvider>
  );
};

export default FunctionCanvas;
