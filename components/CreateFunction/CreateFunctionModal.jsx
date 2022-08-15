import { Grid, Modal, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Label from '../atom/Label';
import { ModalHeader } from '../atom/Modal';
import { ModalBox } from '../atom/ModalBox';
import Select from '../Select';
import Scrollbars from 'react-custom-scrollbars';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import ParametersField from './ParametersField';
import { useDispatch, useSelector } from 'react-redux';
import FunctionNameField from './FunctionNameField';
import ReturnField from './ReturnField';
import {
  BOOLEAN_OPTIONS,
  FUNCTION_TYPE_OPTIONS,
  STATE_MUTABILITY_OPTIONS,
  VISIBILITY_OPTIONS,
} from '@/config/constant/common';
import { useRouter } from 'next/router';

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
  const { scopes, type } = useSelector((state) => state.userFunction);

  const functionState = useSelector((state) => state.userFunction);
  const { userFunction } = useDispatch();
  const [showPayableField, setShowPayableField] = useState(false);
  const router = useRouter();
  const [hasError, setHasError] = useState(true);

  const handleVisibilityChange = (e) => {
    const value = e.target.value;
    userFunction.updateScope(value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    userFunction.updateType(value);
    if (value === 'readonly') userFunction.updateStateMutability('view');
    else userFunction.updateStateMutability('');
  };

  const handleStateMutabilityChange = (e) => {
    const value = e.target.value;
    userFunction.updateStateMutability(value);
  };

  const handleVirtualChange = (e) => {
    const value = e.target.value;
    userFunction.updateVirtual(value);
  };

  const handlePayableChange = (e) => {
    const value = e.target.value;
    userFunction.updatePayable(value);
  };

  useEffect(() => {
    setShowPayableField(type === 'not-readonly' && (scopes?.scope === 'public' || scopes?.scope === 'external'));
  }, [scopes?.scope, type]);

  const redirectToFunctiondDesignCavas = async () => {
    if (hasError) return;
    onClose();
    const { data } = await userFunction.createFunction({ functionInfo: functionState });
    const { _id } = data;
    router.push(`/functions/${_id}`);
  };

  // useEffect(() => {
  //   console.log('functionState: ', functionState);
  // }, [functionState]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox width="900px">
        <ModalHeader title="Function" onClose={onClose} />
        <Scrollbars autoHeight autoHeightMax={600}>
          <ModalBody>
            <FunctionNameField setFormError={setHasError} />
            <ParametersField setFormError={setHasError} />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Label type="basic">Visiblity</Label>
                <Select options={VISIBILITY_OPTIONS} value={scopes?.scope} onChange={handleVisibilityChange} />
              </Grid>
              <Grid item xs={4}>
                <Label type="basic">Type</Label>
                <Select menuProps={true} options={FUNCTION_TYPE_OPTIONS} value={type} onChange={handleTypeChange} />
              </Grid>
              {scopes?.type && (
                <Grid item xs={4}>
                  <Label type="basic">State Mutability</Label>
                  <Select
                    options={STATE_MUTABILITY_OPTIONS}
                    value={scopes?.type}
                    onChange={handleStateMutabilityChange}
                  />
                </Grid>
              )}
            </Grid>
            {scopes?.scope !== 'private' && (
              <Grid container>
                <Grid item xs={6}>
                  <Label type="basic">Virtual</Label>
                  <Select options={BOOLEAN_OPTIONS} value={scopes?.virtual} onChange={handleVirtualChange} />
                </Grid>
              </Grid>
            )}
            {showPayableField && (
              <Grid container>
                <Grid item xs={6}>
                  <Label type="basic">Payable</Label>
                  <Select options={BOOLEAN_OPTIONS} value={scopes?.payable} onChange={handlePayableChange} />
                </Grid>
              </Grid>
            )}
            <Grid container>
              <Grid item xs={6}>
                <Label type="basic">Function modifier</Label>
                <Select
                  disabled={true}
                  value="no-modifier"
                  options={[{ value: 'no-modifier', label: 'No Modifier' }]}
                />
              </Grid>
            </Grid>
            <div>
              <ReturnField setFormError={setHasError} />
            </div>
          </ModalBody>
        </Scrollbars>
        <ModalFooter>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={redirectToFunctiondDesignCavas}>Continue</PrimaryButton>
        </ModalFooter>
      </ModalBox>
    </Modal>
  );
};

export default CreateFunctionModal;
