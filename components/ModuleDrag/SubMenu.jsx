import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CreateButton from './CreateButton';
import SearchModule from './SearchModule';
import { Modal } from '@mui/material';
import CreateContractForm from '../CreateContractForm';

const LeftSide = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E5C2B9' : '#E5C2B9',
  fontSize: '18px',
  fontWeight: 400,
}));

const SubMenu = ({ contract }) => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <div style={{
      display: 'flex',
      padding: '25px 20px',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <LeftSide>Drag & Drop Modules</LeftSide>
      <div style={{
        display: 'flex',
        gap: '18px',
        alignItems: 'center',
      }}>
        <CreateButton handleOpen={() => setIsOpenCreateModal(true)} />
        <SearchModule />
      </div>
      <Modal
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateContractForm />
      </Modal>
    </div>
  )
};

export default SubMenu;
