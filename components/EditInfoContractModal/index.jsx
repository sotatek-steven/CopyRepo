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
import Select from '../Select';

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
  const { name: _name, description: _description, domainId: _id, tags: _tags } = data;

  return {
    name: _name || '',
    description: _description || '',
    domainId: _id || '',
    tags: _tags || [],
  };
};

const validateInfo = (values, errors) => {
  let tempError = { ...errors };
  const { name, domain } = values;

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

const EditInfoContractModal = ({ open, onClose, data, readOnly = false }) => {
  const { contract, template } = useDispatch();
  const [optionDomain, setOptionDomain] = useState([]);
  const theme = useTheme();
  const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useForm({
    initialValues: getInitialValues(data),
    validate: validateInfo,
  });

  useEffect(() => {
    setValues(getInitialValues(data));
  }, [data]);

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

  const getListDomain = async () => {
    try {
      const data = await template.getTemplateDomain({ size: -1 });
      if (data.length) {
        const domains = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setOptionDomain(domains);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListDomain();
  }, []);

  return (
    <FormModal
      open={open}
      onClose={handleClose}
      title={'Smart Contract Info'}
      closeText={'Cancel'}
      confirmText={'Continue'}
      showFooter={!readOnly}
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
        <Select
          label="Domain"
          isRequired={true}
          onChange={(e) => handleChange(e, 'domainId', ELEMENT_TYPE.SELECT)}
          options={optionDomain}
          value={values?.domainId}
          styles={colourStyles(theme)}
          disabled={readOnly}
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
          isDisabled={readOnly}
        />
      </InputWrapper>
    </FormModal>
  );
};

export default EditInfoContractModal;
