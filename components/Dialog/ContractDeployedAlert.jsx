import React from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

const TransactionHash = styled('div')(({ theme }) => ({
  color: theme.palette.info.dark,
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: 10,
}));

const Content = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
  fontWeight: theme.typography.fontWeightRegular,
}));

const Wrapper = styled('div')(({ theme }) => ({
  padding: '20px',
  background: theme.palette.background.dark,
}));

const ContractDeployedAlert = ({ address, txHash }) => {
  return (
    <div style={{ position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
      <Wrapper>
        <Title id="alert-dialog-title">{'This Smart Contract has been deployed with wallet:'}</Title>
        <Content>
          Address: {address}
          <br />
          Transaction Hash: <TransactionHash>{txHash}</TransactionHash>
        </Content>
      </Wrapper>
    </div>
  );
};

export default ContractDeployedAlert;
