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

const InfoFunctionModal = ({ open, onClose, onCancel, onSubmit, mode = 'edit' }) => {
  const { scopes, type, name, params, returns } = useSelector((state) => state.functionDefinition);
  const functionDefinitionState = useSelector((state) => state.functionDefinition);
  const { functions } = useSelector((state) => state.functions);
  const { functionDefinition } = useDispatch();
  const [showPayableField, setShowPayableField] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const handleVisibilityChange = (e) => {
    const value = e.target.value;
    functionDefinition.updateScope(value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    functionDefinition.updateType(value);
    functionDefinition.updateStateMutability(value === 'readonly' ? 'view' : '');
  };

  const handleStateMutabilityChange = (e) => {
    const value = e.target.value;
    functionDefinition.updateStateMutability(value);
  };

  const handleVirtualChange = (e) => {
    const value = e.target.value;
    functionDefinition.updateVirtual(value);
  };

  const handlePayableChange = (e) => {
    const value = e.target.value;
    functionDefinition.updatePayable(value);
  };

  useEffect(() => {
    setShowPayableField(type === 'not-readonly' && (scopes?.scope === 'public' || scopes?.scope === 'external'));
  }, [scopes?.scope, type]);

  const functionInfo = (data) => {
    return `${data.name.value}-${(data.params || []).map((p) => p.type).join('-')}`;
  };

  const checkExistingFunction = () => {
    const currentFunction = functionInfo(functionDefinitionState);
    if (!functions) return false;
    return functions.find((item) => item._id !== functionDefinitionState._id && item.key === currentFunction);
  };

  const checkFormError = () => {
    if (!name.value || name.errorMessage) return true;
    if (params.find((item) => !item.label.value || item.label.errorMessage)) return true;
    return !!returns.find((item) => !item.label.value || item.label.errorMessage);
  };

  const handleConfirm = async () => {
    if (checkFormError()) {
      //show error message 'This field is required' if any
      functionDefinition.updateName({
        ...name,
        errorMessage: !name.value ? 'This field is required' : '',
      });

      const updatedParams = params.map((item) => ({
        ...item,
        label: {
          value: item.label.value,
          errorMessage: !item.label.value ? 'This field is required' : '',
        },
      }));

      const updatedReturns = returns.map((item) => ({
        ...item,
        label: {
          value: item.label.value,
          errorMessage: !item.label.value ? 'This field is required' : '',
        },
      }));

      functionDefinition.updateParameters(updatedParams);
      functionDefinition.updateReturns(updatedReturns);
      return;
    }

    if (checkExistingFunction()) {
      setIsDuplicated(true);
      return;
    }

    if (!onSubmit) return;
    onSubmit();
  };

  useEffect(() => {
    setIsDuplicated(false);
  }, [functionDefinitionState.params]);

  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
      }}>
      <ModalBox width="900px">
        <ModalHeader title="Function" onClose={onCancel} />
        <Scrollbars autoHeight autoHeightMax={600}>
          <ModalBody edited={mode === 'view' ? 0 : 1}>
            <FunctionNameField />
            <ParametersField isDuplicated={isDuplicated} />

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
              <ReturnField />
            </div>
          </ModalBody>
        </Scrollbars>
        {mode !== 'view' && (
          <ModalFooter>
            <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleConfirm}>Continue</PrimaryButton>
          </ModalFooter>
        )}
      </ModalBox>
    </Modal>
  );
};

export default InfoFunctionModal;
