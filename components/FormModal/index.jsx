import React from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BodyContent, CloseButton, Footer, Header, ModalBox, Title } from './FormModal.style';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';

const FormModal = ({
  children,
  open,
  onClose,
  title,
  onConfirm,
  closeText,
  confirmText,
  showFooter = true,
  height,
  width,
  showSave = true,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <ModalBox height={height} width={width}>
        <Header showFooter={showFooter}>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <BodyContent>{children}</BodyContent>
        {showFooter && (
          <Footer>
            <SecondaryButton onClick={onClose}>{closeText}</SecondaryButton>
            {showSave && <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>}
          </Footer>
        )}
      </ModalBox>
    </Modal>
  );
};

export default FormModal;
