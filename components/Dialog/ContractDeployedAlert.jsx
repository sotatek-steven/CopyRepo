import React from 'react';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';

const TransactionHash = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#319eed' : '#319eed',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 10,
}));

const Content = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 16,
  fontWeight: 400,
}));

const Wrapper = styled('div')(({ theme }) => ({
  padding: '20px',
  background: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const ContractDeployedAlert = ({ address, txHash, open, onClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)' } }}
        BackdropProps={{ invisible: true }}>
        <Wrapper>
          <Title id="alert-dialog-title">{'This Smart Contract has been deployed with wallet:'}</Title>
          <Content>
            Address: {address}
            <br />
            Transaction Hash: <TransactionHash>{txHash}</TransactionHash>
          </Content>
        </Wrapper>
      </Dialog>
    </div>
  );
};

export default ContractDeployedAlert;
