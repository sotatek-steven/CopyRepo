import { Modal, styled } from '@mui/material';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { ModalHeader } from '../atom/Modal';
import { ModalBox } from '../atom/ModalBox';
import ErrorItem from './ErrorItem';

const ModalBody = styled('div')({
  padding: '20px 30px',
});

const ErrorsCompileModal = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox width={850}>
        <ModalHeader type="warning" title={`Errors (5)`} onClose={handleClose} />
        <Scrollbars autoHeightMax={460} autoHeight>
          <ModalBody>
            <ErrorItem />
          </ModalBody>
        </Scrollbars>
      </ModalBox>
    </Modal>
  );
};

export default ErrorsCompileModal;
