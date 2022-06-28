import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Creatable from 'react-select/creatable';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { useDispatch } from 'react-redux';
import { Input, TextArea } from '../Input';
import FormModal from '../FormModal';
import { useForm } from '@/hooks/useForm';
import { ELEMENT_TYPE } from '@/config/constant/common';

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const getInitialValues = (data) => {
  const { name: _name, description: _description, domain: _domain, tags } = data;
  const _tags = tags?.map((tag) => ({
    value: tag.toLowerCase(),
    label: tag,
  }));
  return {
    name: _name || '',
    description: _description || '',
    domain: _domain || '',
    tags: _tags || [],
  };
};

const validateInfo = (values, errors) => {
  let tempError = { ...errors };
  const { name, domain } = values;

  if (typeof name !== 'undefined') {
    tempError = {
      ...tempError,
      name: name?.trim() ? '' : 'This field is required',
    };
  }

  if (typeof domain !== 'undefined') {
    tempError = {
      ...tempError,
      domain: domain?.trim() ? '' : 'This field is required',
    };
  }
  return tempError;
};

const EditInfoContractModal = ({ open, onClose, data, readOnly = false }) => {
  const { contract } = useDispatch();
  const theme = useTheme();
  const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useForm({
    initialValues: getInitialValues(data),
    validate: validateInfo,
  });

  const updateContract = () => {
    const newContract = { ...values };
    contract.updateCurrent(newContract);
    if (!onClose) return;
    onClose();
  };

  const handleClose = () => {
    if (!onClose) return;
    setErrors({});
    setValues(getInitialValues(data));
    onClose();
  };

  return (
    <FormModal
      open={open}
      onClose={handleClose}
      title={'Smart Contract Info'}
      closeText={'Cancel'}
      confirmText={'Continue'}
      onConfirm={(e) => handleSubmit(e, updateContract)}>
      <InputWrapper>
        <Input
          label="Name"
          id="name"
          name="name"
          isRequired={true}
          value={values?.name}
          onChange={(e) => handleChange(e, 'name', ELEMENT_TYPE.INPUT)}
          readOnly={readOnly}
          errorText={errors?.name}
        />
      </InputWrapper>
      <InputWrapper>
        <TextArea
          label="Description"
          name="description"
          id="description"
          value={values?.description}
          onChange={(e) => handleChange(e, 'description', ELEMENT_TYPE.INPUT)}
          readOnly={readOnly}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          label="Domain"
          name="domain"
          id="domain"
          isRequired={true}
          value={values?.domain}
          onChange={(e) => handleChange(e, 'domain', ELEMENT_TYPE.INPUT)}
          readOnly={readOnly}
          errorText={errors?.domain}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="name">Tags</Label>
        <Creatable
          isMulti
          onChange={(e) => handleChange(e, 'tags', ELEMENT_TYPE.TAG)}
          options={values?.tags}
          value={values.tags}
          styles={colourStyles(theme)}
          isDisabled={readOnly}
        />
      </InputWrapper>
    </FormModal>
  );
};

export default EditInfoContractModal;
