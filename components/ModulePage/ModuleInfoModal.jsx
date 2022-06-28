import { MenuItem, Select, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Input, TextArea } from '../Input';
import Creatable from 'react-select/creatable';
import { useDispatch } from 'react-redux';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { useForm } from '@/hooks/useForm';
import FormModal from '../FormModal';
import { ELEMENT_TYPE } from '@/config/constant/common';

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({ theme }) => ({
  marginBottom: 3,
}));

const validateInfo = (values, errors) => {
  let tempError = { ...errors };
  const { name, description, domain } = values;

  if (typeof name !== 'undefined') {
    tempError = {
      ...tempError,
      name: name?.trim() ? null : 'This field is required',
    };
  }

  if (typeof domain !== 'undefined') {
    tempError = {
      ...tempError,
      domain: domain?.trim() ? null : 'This field is required',
    };
  }
  return tempError;
};

const getInitialValues = (data) => {
  const { name: _name, description: _description, domain: _domain, tags: _tags } = data;

  return {
    name: _name || '',
    description: _description || '',
    domain: _domain || '',
    tags: _tags || [],
  };
};

const ModuleInfoModal = ({ open, onClose, data, readOnly = false }) => {
  const { userModule } = useDispatch();
  const theme = useTheme();

  const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useForm({
    initialValues: getInitialValues(data),
    validate: validateInfo,
  });

  useEffect(() => {
    setValues(getInitialValues(data));
  }, [data]);

  const updateModule = (e) => {
    const newModule = { ...data, ...values };
    userModule.update(newModule);
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
      title={'Module Info'}
      closeText={'Cancel'}
      confirmText={'Save'}
      onConfirm={(e) => handleSubmit(e, updateModule)}>
      <InputWrapper>
        <Input
          label="Name"
          id="name"
          name="name"
          isRequired={true}
          value={values?.name}
          onChange={(e) => handleChange(e, 'name', ELEMENT_TYPE.INPUT)}
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
          errorText={errors?.domain}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="name">Tags</Label>
        <Creatable
          isMulti
          onChange={(e) => handleChange(e, 'tags', ELEMENT_TYPE.TAG)}
          options={values?.tags?.map((tag) => ({
            value: tag.toLowerCase(),
            label: tag,
          }))}
          value={values.tags?.map((tag) => ({
            value: tag.toLowerCase(),
            label: tag,
          }))}
          styles={colourStyles(theme)}
        />
      </InputWrapper>
    </FormModal>
  );
};

export default ModuleInfoModal;
