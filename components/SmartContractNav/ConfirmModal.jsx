import React from 'react';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import CloseIcon from '../../assets/icon/close-circle.svg';

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
  marginBottom: 25,
  textAlign: 'center',
}));

const Description = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 15,
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: 36,
}));

const ConfirmModal = ({ open, onClose, onAgree }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <CloseIcon />
        </div>
        <Title>Are you sure?</Title>
        <Description>Do you really want to delete these records? This process cannot be undone.</Description>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}>
          <SecondaryButton onClick={onClose}>No</SecondaryButton>
          <PrimaryButton onClick={onAgree}>Yes</PrimaryButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
