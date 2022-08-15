import { Grid, Modal, styled } from '@mui/material';
import React from 'react';
import Label from '../atom/Label';
import { ModalHeader } from '../atom/Modal';
import { ModalBox } from '../atom/ModalBox';
import Select from '../Select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Scrollbars from 'react-custom-scrollbars';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import ParametersField from './ParametersField';
import { useSelector } from 'react-redux';
import FunctionNameField from './FunctionNameField';
import ReturnField from './ReturnField';

const ModalBody = styled('div')({
  padding: '20px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const ModalFooter = styled('div')({
  padding: '0px 30px 20px',
  display: 'flex',
  justifyContent: 'end',
  gap: 20,
});

const CreateFunctionModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox width="900px">
        <ModalHeader title="Function" onClose={onClose} />
        <Scrollbars autoHeight autoHeightMax={600}>
          <ModalBody>
            <FunctionNameField />
            <ParametersField />

            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Function scope</Label>
                <Select />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Type</Label>
                <Select />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Virtual</Label>
                <Select />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Payable</Label>
                <Select />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Modifier</Label>
                <Select />
              </Grid>
            </Grid>
            <div>
              <ReturnField />
            </div>
          </ModalBody>
        </Scrollbars>
        <ModalFooter>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton>Continue</PrimaryButton>
        </ModalFooter>
      </ModalBox>
    </Modal>
  );
};

export default CreateFunctionModal;
