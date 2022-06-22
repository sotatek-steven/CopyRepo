import React, { useEffect, useState } from 'react';
import DesignSmartContractNav from 'components/SmartContractNav';
import ModuleDrag from '@/components/ModuleDrag';
import ModuleDrop from '@/components/ModuleDrop';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import useUserBackup from '@/hooks/useUserActive';
import { useRouter } from 'next/router';
import { createEdges, createNodes } from '@/components/ModuleDrop/CreateElement';

const PageContainer = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
}));

const Design = () => {
  const { contract } = useDispatch();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useUserBackup();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchDetailContract = async () => {
      try {
        if (!id) return;
        const contractDetail = await contract.getDetailContract(id);
        if (!contractDetail) return;
        const { coordinates: modulesData } = contractDetail;
        const _nodes = createNodes(modulesData);
        const _edges = createEdges(_nodes);
        setNodes(_nodes);
        setEdges(_edges);
      } catch (error) {
        console.log('Failed to fetch detail contract', error);
      }
    };
    fetchDetailContract();
  }, [id]);

  return (
    <PageContainer>
      <div style={{ height: 74 }}>
        <DesignSmartContractNav />
      </div>

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
        }}>
        <div style={{ flexGrow: 1 }}>{nodes && <ModuleDrop initialNodes={nodes} initialEdges={edges} />}</div>
        <div
          style={{
            height: '100%',
            width: '444px',
          }}>
          <ModuleDrag contract={contract} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Design;
