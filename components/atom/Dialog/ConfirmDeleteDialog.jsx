import React from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '../../../assets/icon/close-circle.svg';
import { BoxActions, Container, ContentText, Title } from './Dialog.style';
import { PrimaryButton, SecondaryButton } from '@/components/ButtonStyle';

const ConfirmDeleteDialog = ({ open, onClose, onAgree, desciption }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <CloseIcon />
        </div>
        <Title>Are you sure?</Title>
        <ContentText>{desciption}</ContentText>
        <BoxActions>
          <SecondaryButton onClick={onClose}>No</SecondaryButton>
          <PrimaryButton onClick={onAgree}>Yes</PrimaryButton>
        </BoxActions>
      </Container>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
