import React from 'react';
import DesignSmartContractNav from 'components/SmartContractNav';
import SmartContractDrag from 'components/SmartContractDrag';
import SmartContractDrop from 'components/SmartContractDrop';
import { styled } from '@mui/material/styles';

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

export const design = () => {

  return (
    <PageContainer>
      <div>
        <DesignSmartContractNav />
      </div>

      <div style={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <div style={{ flexGrow: 1 }}>
          <SmartContractDrop />
        </div>
        <div style={{
          height: '100%',
          width: '444px',
        }}>
          <SmartContractDrag />
        </div>
      </div>
    </PageContainer>
  )
};

export default design;
