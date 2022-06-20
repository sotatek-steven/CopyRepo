import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  updateEdge,
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CustomNodes from '../CustomNode';
import { createEdges, generateEdgeId, generateNodeId } from './CreateElement';

const ModuleDrop = ({ initialNodes, initialEdges }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeDeleted, setNodeDeleted] = useState(null);
  const { contract } = useDispatch();
  const contractState = useSelector(state => state.contract);
  const nodeTypes = useMemo(() => (CustomNodes), []);

  /**
   * @param {*} id to update node list of react flow
   * @param {*} moduleId to update module list of contract
   */
  const deleteNode = (id, moduleId) => {
    if (!id || !moduleId) return;
    setNodeDeleted({ id, moduleId });
  };

  useEffect(() => {
    if (!nodeDeleted) return;
    const updatedNodes = nodes.filter((node) => node.id !== nodeDeleted.id);
    setNodes(updatedNodes);

    const updatedEdges = createEdges(updatedNodes);
    setEdges(updatedEdges);

    removeModuleFromContract(nodeDeleted.moduleId);
  }, [nodeDeleted, setNodes, nodes, setEdges]);


  const [nodes, setNodes, onNodesChange] = useNodesState(() => {
    const data = initialNodes.map(item => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        }
      }
    });
    return data;
  });

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }, []);
  useEffect(() => {
    const data = initialNodes.map(item => {
      return {
        ...item,
        data: {
          ...item.data,
          onDeleteNode: deleteNode,
        }
      }
    });
    setNodes(data);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onDrop = useCallback((event) => {
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

    const { modules } = contractState;
    if (modules.some(item => item === data._id)) return;

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

    //add new edge
    if (nodes.length >= 1) {
      const source = nodes[nodes.length - 1].id;
      const target = newNode.id;
      const id = generateEdgeId(source, target);
      const newEdge = {
        id,
        source,
        target,
        markerEnd: { type: 'arrowclosed', color: '#fff' },
        style: { strokeWidth: 2 },
      };
      setEdges((eds) => eds.concat(newEdge));
    }

    //update contract state
    addNewModuleToContract(data, position);
  },
    [reactFlowInstance, setNodes, contractState.modules, nodes],
  );

  const updateContractState = (modules, coordinates) => {
    const newContract = {
      ...contractState,
      modules,
      coordinates,
    };

    contract.update(newContract);
    // contract.updateContract(newContract);
  }

  const addNewModuleToContract = (moduleInfo, position) => {
    if (!moduleInfo) return;

    let { modules, coordinates } = contractState;

    //update moudles feild
    const { _id } = moduleInfo;
    modules.push(_id);

    //update coordinates field
    const newModule = {
      module: moduleInfo,
      position: {
        left: position.x,
        top: position.y,
      },
      _id: _id,
    };
    coordinates.push(newModule);

    updateContractState(modules, coordinates);
  }

  const removeModuleFromContract = (moduleId) => {
    let { modules, coordinates } = contractState;

    //update moudles feild
    const newModules = modules.filter(id => id !== moduleId);

    //update coordinates field
    const newCoordinates = coordinates.filter(item => item.module._id !== moduleId);

    updateContractState(newModules, newCoordinates);
  }

  const onNodeClick = (event, el) => {
    console.log('click node: ', el.id);
  }

  // const onNodeDragStop = (event, node) => {
  //   const { data, position } = node;
  //   // const newPosition = 
  // };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }

  return (
    <ReactFlowProvider>
      <div style={{ height: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          // onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          defaultZoom={1}
          onEdgeUpdate={onEdgeUpdate}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ModuleDrop;
