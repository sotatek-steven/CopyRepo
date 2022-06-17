import React, { useEffect, useState } from 'react';
import DesignSmartContractNav from 'components/SmartContractNav';
import ModuleDrag from '@/components/ModuleDrag';
import ModuleDrop from '@/components/ModuleDrop';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import useUserBackup from '@/hooks/useUserActive';
import { useRouter } from 'next/router';
import { generateEdgeId, generateNodeId } from '@/components/ModuleDrop/generateNodeId';
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
  const { contract, moduleApi } = useDispatch();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useUserBackup();
  const contractState = useSelector((state) => state.contract);
  const router = useRouter();
  const { id } = router.query;
  // console.log(contractId);

  useEffect(() => {
    const fetchDetailContract = async () => {
      try {
        if (!id) {
          return;
        }
        const contractDetail = await contract.getDetailContract(id);
        if (!contractDetail) return;
        const moduleIds = [...contractDetail.modules];
        const _nodes = createNodes(contractDetail);
        const _edges = createEdges(_nodes);
        setNodes(_nodes);
        setEdges(_edges);
      } catch (error) {
        console.log('Failed to fetch detail contract', error);
      }
    };
    fetchDetailContract();
  }, [id]);

  const createNodes = (contractDetail) => {
    const { coordinates } = contractDetail;
    const nodes = coordinates.map((item) => {
      const type = 'rectangle';
      const position = {
        x: item.position.left,
        y: item.position.top,
      }
      return {
        id: generateNodeId(),
        type,
        data: {
          ...item.module,
          label: 'Input Node',
        },
        position,
      }
    });

    return nodes;
  }

  const createEdges = (nodes) => {
    if (!nodes || nodes.length < 2) return [];
    const edges = [];
    console.log(nodes);
    for (let i = 0; i < nodes.length - 1; i++) {
      const source = nodes[i].id;
      const target = nodes[i + 1].id;
      const id = generateEdgeId(source, target);
      edges.push({
        id,
        source,
        target,
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
          {nodes && <ModuleDrop
            initialNodes={nodes}
            initialEdges={edges}
          />}
        </div>
        <div style={{
          height: '100%',
          width: '444px',
        }}>
          <ModuleDrag contract={contract} />
        </div>
      </div>
    </PageContainer>
  )
};

export default Design;