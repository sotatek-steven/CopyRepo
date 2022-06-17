import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import EditButton from './EditButton';
import styled from '@emotion/styled';
import InfoContractForm from '../InfoContractForm';

const Box = styled('div')(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '35px 35px',
  outline: 'none'
}));

const Title = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 30,
}));

const EditInfoContract = () => {
    const contract = useSelector((state) => state.contract);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

    const handleClose = (_, reason) => {
        if (reason === "backdropClick") return;
        setIsOpenCreateModal(false);
    }; { useState }

    return (
        <>
            <EditButton handleOpen={() => setIsOpenCreateModal(true)} />
            <Modal
                open={isOpenCreateModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Title>
                        Edit Info Smart Contract
                    </Title>
                    <div style={{ padding: '0px 20px' }}>
                        <InfoContractForm onClose={handleClose} data={contract} />
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditInfoContract;