import React from 'react';
import { Modal } from '@mui/material';
import { BoxActions, Container, ContentText, Title } from './Dialog.style';
import { PrimaryButton, SecondaryButton } from '@/components/ButtonStyle';

const ConfirmDeleteDialog = ({ open, onClose, onAgree, title, desciption, cancelText, agreeText }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Container>
        {title && <Title>{title}</Title>}
        <ContentText>{desciption}</ContentText>
        <BoxActions>
          <SecondaryButton onClick={onClose}>{cancelText}</SecondaryButton>
          <PrimaryButton onClick={onAgree}>{agreeText}</PrimaryButton>
        </BoxActions>
      </Container>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
