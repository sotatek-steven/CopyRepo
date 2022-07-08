import { styled, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, TextArea } from '../Input';
import Creatable from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { useForm } from '@/hooks/useForm';
import FormModal from '../FormModal';
import { ELEMENT_TYPE, HTTP_CODE, MODE, MODULE_OWNER } from '@/config/constant/common';
import { ROUTE } from '@/config/constant/routeConstant';
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

const validateInfo = (values, errors) => {
  let tempError = { ...errors };
  const { name, domainId } = values;

  if (typeof name !== 'undefined') {
    tempError = {
      ...tempError,
      name: name?.trim() ? null : 'This field is required',
    };
  }

  if (typeof domainId !== 'undefined') {
    tempError = {
      ...tempError,
      domainId: domainId?.trim() ? null : 'This field is required',
    };
  }
  return tempError;
};

const getInitialValues = (data) => {
  const { name: _name, description: _description, domainId: _domainId, tags: _tags } = data;

  return {
    name: _name || '',
    description: _description || '',
    domainId: _domainId || '',
    tags: _tags || [],
  };
};

const ModuleInfoModal = ({ mode, open, onClose, data }) => {
  const router = useRouter();
  const { userModule } = useDispatch();
  const { listDomain } = useSelector((state) => state.template);
  const theme = useTheme();
  const { values, setValues, handleChange, handleSubmit, errors, setErrors } = useForm({
    initialValues: getInitialValues(data),
    validate: validateInfo,
  });

  const optionDomain = useMemo(() => {
    return listDomain.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  }, [listDomain]);

  useEffect(() => {
    if (!data) return;
    const initialValues = getInitialValues(data);
    setValues(initialValues);
  }, [data]);

  const createModule = async () => {
    const res = await userModule.createModule({ moduleInfo: values });
    if (res?.code === HTTP_CODE.SUCCESS && res?.data?._id) {
      const { _id } = res.data;
      router.push(`${ROUTE.MODULES}/${_id}`);
    }
  };

  const updateModule = () => {
    const newModule = { ...data, ...values };
    userModule.update(newModule);
    handleClose();
  };

  const handleSave = () => {
    switch (mode) {
      case MODE.CREATE:
      case MODE.CLONE:
        createModule();
        break;
      case MODE.EDIT:
        updateModule();
        break;
      default:
        break;
    }
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
      confirmText={mode === MODE.CLONE ? 'Clone' : 'Save'}
      showSave={data?.owner?.toUpperCase() !== MODULE_OWNER.SYSTEM}
      onConfirm={(e) => {
        handleSubmit(e, handleSave);
      }}>
      <InputWrapper>
        <Input
          label="Name"
          id="name"
          name="name"
          isRequired={true}
          readOnly={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
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
          readOnly={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
          onChange={(e) => handleChange(e, 'description', ELEMENT_TYPE.INPUT)}
        />
      </InputWrapper>
      <InputWrapper>
        <Select
          label="Domain"
          isRequired={true}
          options={optionDomain}
          value={values?.domainId}
          disabled={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
          onChange={(e) => handleChange(e, 'domainId', ELEMENT_TYPE.SELECT)}
          errorText={errors?.domainId}
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
          isDisabled={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
        />
      </InputWrapper>
    </FormModal>
  );
};

export default ModuleInfoModal;
