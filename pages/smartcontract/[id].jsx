import React, { useEffect, useState } from 'react';
import DesignSmartContractNav from 'components/SmartContractNav';
import ModuleDrag from '@/components/ModuleDrag';
import ModuleDrop from '@/components/ModuleDrop';
import { styled } from '@mui/material/styles';
import { useDispatch,useSelector } from 'react-redux';
// import { useRouter } from 'next/router'

const PageContainer = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E'
}));


const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#3D3D3E',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: {
    height: '74px',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  sidebar: {
    height: '100%',
    width: '444px',
  }
};

const Design = () => {
  const { contractApi, moduleApi } = useDispatch();
  const [contract, setContract] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // const contract = useSelector((state) => state.contractApi);
  // const router = useRouter();
  // const { contractId } = router.query;
  // console.log(contractId);

  useEffect(() => {
    const fetchDetailContract = async () => {
      try {
        const contractId = '62a854244a3b90a8b48cfa2a';
        const contract = await contractApi.getDetailContract(contractId);
        if (!contract) return;
        const moduleIds = [...contract.modules];
        const _nodes = await createNodes(moduleIds);
        const _edges = createEdges(moduleIds);
        // setContract(contract)
        setNodes(_nodes);
        setEdges(_edges);
      } catch (error) {
        console.log('Failed to fetch detail contract');
      }
    };
    fetchDetailContract();
  }, []);

  const createNodes = async (moduleIds) => {
    if (!moduleIds) return [];
    const modules = await Promise.all(
      moduleIds.map(moduleId => moduleApi.getDetailModule(moduleId))
    )
    const nodes = modules.map((module) => {
      const type = 'rectangle';
      const position = {
        x: 50,
        y: 50
      }
      const { _id } = module;
      return {
        id: _id,
        type,
        data: {
          ...module,
          label: 'Input Node',
        },
        position,
      }
    });

    return nodes;
  }

  const createEdges = (moduleIds) => {
    if (!moduleIds || moduleIds.length < 2) return [];
    const edges = [];
    for (let i = 0; i < moduleIds.length - 1; i++) {
      const source = moduleIds[i];
      const target = moduleIds[i + 1];
      const id = `e${source}-${target}`;
      edges.push({
        id,
        source,
        target
      })
    };
    return edges;
  }

  return (
    <PageContainer>
      <div>
        <DesignSmartContractNav data={contract} />
      </div>

      <div style={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <div style={{ flexGrow: 1 }}>
          {nodes.length > 0 && <ModuleDrop
            initialNodes={nodes}
            initialEdges={edges}
          />}
        </div>
        <div style={{
          height: '100%',
          width: '444px',
        }}>
          <ModuleDrag contract={contract}/>
        </div>
      </div>
    </PageContainer>
  )
};

export default Design;