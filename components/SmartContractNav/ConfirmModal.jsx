import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';

const Box = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '50px 35px',
  outline: 'none',
  padding: '55px 90px',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 55,
  textAlign: 'center',
}));

const ConfirmModal = ({ open, onClose }) => {
  const { contract } = useDispatch();
  const { account, library } = useWeb3React();

  const handleDeploy = async () => {
    // const signer = await library.getSigner(account);
    // contract.deployContract(signer);

    if (!onClose) return;
    onClose();
  };

  useEffect(() => {
    console.log('library:', library);
  }, [library]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <Title>Confirm to deploy this Smart Contract</Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}>
          <PrimaryButton onClick={onClose}>No</PrimaryButton>
          <SecondaryButton onClick={handleDeploy}>Yes</SecondaryButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
