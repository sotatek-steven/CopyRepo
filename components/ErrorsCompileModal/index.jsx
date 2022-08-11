import { Modal, styled } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { ModalHeader } from '../atom/Modal';
import { ModalBox } from '../atom/ModalBox';
import ErrorItem from './ErrorItem';

const ModalBody = styled('div')({
  padding: '20px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const ErrorsCompileModal = ({ open, onClose, errors }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox width={850}>
        <ModalHeader type="warning" title={`Errors (${errors.length})`} onClose={onClose} />
        <Scrollbars autoHeightMax={460} autoHeight>
          <ModalBody>
            {errors.map((item) => {
              return <ErrorItem key={item.id} data={item} onClose={onClose} />;
            })}
          </ModalBody>
        </Scrollbars>
      </ModalBox>
    </Modal>
  );
};

export default ErrorsCompileModal;
