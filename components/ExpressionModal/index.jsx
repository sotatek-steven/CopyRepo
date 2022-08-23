import { Modal, styled } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { ModalHeader } from '../atom/Modal';
import { ModalBox } from '../atom/ModalBox';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';

const ModalBody = styled('div')(({ edited }) => ({
  position: 'relative',
  padding: '20px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  '&::after': {
    display: edited === 1 ? 'none' : 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    content: '""',
    width: '100%',
    height: '100%',
  },
}));

const ModalFooter = styled('div')({
  padding: '0px 30px 20px',
  display: 'flex',
  justifyContent: 'end',
  gap: 20,
});

const ResetWrapper = styled('div')({
  padding: '0px 30px 20px',
});

const ExpressionModal = ({ open, onClose, onCancel, handleConfirm, mode = 'edit' }) => {
  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
      }}>
      <ModalBox width="900px">
        <ModalHeader title="Expression" onClose={onClose} />
        <Scrollbars autoHeight autoHeightMax={600}>
          <ModalBody edited={mode === 'view' ? 0 : 1}></ModalBody>
        </Scrollbars>
        {mode !== 'view' && (
          <>
            <ResetWrapper>
              <PrimaryButton onClick={handleConfirm}>Reset</PrimaryButton>
            </ResetWrapper>
            <ModalFooter>
              <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleConfirm}>Continue</PrimaryButton>
            </ModalFooter>
          </>
        )}
      </ModalBox>
    </Modal>
  );
};

export default ExpressionModal;
