import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import InfoContractForm from '../InfoContractForm';

const Box = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  padding: '35px 35px',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 30,
}));

const CreateContract = () => {
  const contract = useSelector((state) => state.contract);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(contract.status === 'init');

  const handleClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setIsOpenCreateModal(false);
  };
  {
    useState;
  }

  return (
    <Modal
      open={isOpenCreateModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box>
        <Title>Create Smart Contract</Title>
        <div style={{ padding: '0px 20px' }}>
          <InfoContractForm onClose={handleClose} data={contract} />
        </div>
      </Box>
    </Modal>
  );
};

export default CreateContract;
