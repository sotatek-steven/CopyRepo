import { Modal, styled, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, TextArea } from '../Input';
import Creatable from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { ELEMENT_TYPE, HTTP_CODE, MODE, MODULE_OWNER } from '@/config/constant/common';
import { ROUTE } from '@/config/constant/routeConstant';
import _ from 'lodash';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import { ModalBox } from '../atom/ModalBox';
import ModalHeaderBasic from '../atom/Modal/ModalHeaderBasic';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const BodyContent = styled('div')({
  padding: '20px 30px',
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
  padding: '0 20px 30px',
});

const ModuleInfoModal = ({ mode, open, onClose, data }) => {
  const router = useRouter();
  const { userModule } = useDispatch();
  const { listDomain } = useSelector((state) => state.template);
  const { modules } = useSelector((state) => state.modules);
  const [moduleInfo, setModuleInfo] = useState({});
  const [errors, setErrors] = useState({});

  const theme = useTheme();

  const optionDomain = useMemo(() => {
    return listDomain?.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  }, [listDomain]);

  useEffect(() => {
    setErrors({});
    if (!open) return;
    if (!data) return;
    setModuleInfo(data);
  }, [data, open]);

  const handleChange = (e, field, type) => {
    let valueField = {};
    if (type === ELEMENT_TYPE.INPUT) {
      valueField = {
        [field]: e.target.value,
      };
    }
    if (type === ELEMENT_TYPE.SELECT) {
      valueField = {
        [field]: e.value,
      };
    }
    if (type === ELEMENT_TYPE.TAG) {
      valueField = {
        [field]: e?.map((tag) => tag.value),
      };
    }

    setModuleInfo((prev) => ({ ...prev, ...valueField }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    setModuleInfo((prev) => ({ ...prev, name: value }));
    const nameError = value
      ? duplicateName(value)
        ? 'Module name is already exists'
        : null
      : 'This field is required';
    setErrors({ ...errors, name: nameError });
  };

  const handleDomainChange = (e, value) => {
    const domainId = value.value.trim();
    setModuleInfo((prev) => ({ ...prev, domainId }));
    const domainError = domainId ? null : 'This field is required';
    setErrors({ ...errors, domainId: domainError });
  };

  const validateInfo = () => {
    let tempError = { ...errors };
    const { name, domainId } = moduleInfo;
    if (!name?.trim()) {
      tempError.name = 'This field is required';
    } else {
      tempError.name = duplicateName(name) ? 'Module name is already exists' : null;
    }

    tempError.domainId = domainId?.trim() ? null : 'This field is required';

    setErrors(tempError);
    return tempError;
  };

  const hasError = (errors) => {
    const result = Object.entries(errors).filter(([key, value]) => {
      return value !== null;
    });

    return result.length !== 0;
  };

  const duplicateName = () => {
    const index = modules?.findIndex((module) => module?.name === moduleInfo?.name && module?._id !== moduleInfo?._id);
    return index !== -1;
  };

  const handleSubmit = (e) => {
    const currentErrors = validateInfo();

    if (hasError(currentErrors)) return;
    e.currentTarget.disabled = true;
    handleSave();
  };

  const createModule = async () => {
    const res = await userModule.createModule({ moduleInfo: moduleInfo });
    if (res?.code === HTTP_CODE.SUCCESS && res?.data?._id) {
      const { _id } = res.data;
      router.push(`${ROUTE.MODULES}/${_id}`);
    }
  };

  const cloneModule = async () => {
    const res = await userModule.cloneModule(moduleInfo);
    if (res?.code === HTTP_CODE.SUCCESS && res?.data?._id) {
      const { _id } = res.data;
      router.push(`${ROUTE.MODULES}/${_id}`);
    }
  };

  const updateModule = () => {
    const newModule = { ...data, ...moduleInfo };
    userModule.update(newModule);
    handleClose();
  };

  const handleSave = () => {
    switch (mode) {
      case MODE.CREATE:
        createModule();
        break;
      case MODE.CLONE:
        cloneModule();
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
    if (mode === MODE.CREATE) setModuleInfo({});
    onClose();
  };

  return (
    // <FormModal
    //   open={open}
    //   onClose={handleClose}
    //   title={'Module Info'}
    //   closeText={'Cancel'}
    //   confirmText={mode === MODE.CLONE ? 'Clone' : 'Save'}
    //   showSave={data?.owner?.toUpperCase() !== MODULE_OWNER.SYSTEM}
    //   onConfirm={(e) => {
    //     handleSubmit(e, handleSave);
    //   }}>
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <ModalBox>
        <ModalHeaderBasic title={'Module Info'} onClose={handleClose} />

        <BodyContent>
          <InputWrapper>
            <Input
              label="Name"
              id="name"
              name="name"
              isRequired={true}
              readOnly={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
              value={moduleInfo?.name}
              // onChange={(e) => handleChange(e, 'name', ELEMENT_TYPE.INPUT)}
              onChange={handleNameChange}
              errorText={errors?.name}
            />
          </InputWrapper>
          <InputWrapper>
            <TextArea
              label="Description"
              name="description"
              id="description"
              value={moduleInfo?.description}
              readOnly={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
              onChange={(e) => handleChange(e, 'description', ELEMENT_TYPE.INPUT)}
            />
          </InputWrapper>
          <InputWrapper>
            <SingleAutoComplete
              label="Domain"
              isRequired={true}
              options={optionDomain}
              value={optionDomain.find((domain) => domain.value === moduleInfo?.domainId)}
              disabled={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
              // onChange={(e, newValue) => handleChange(newValue, 'domainId', ELEMENT_TYPE.SELECT)}
              onChange={handleDomainChange}
              errorText={errors?.domainId}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="name">Tags</Label>
            <Creatable
              isMulti
              onChange={(e) => handleChange(e, 'tags', ELEMENT_TYPE.TAG)}
              options={moduleInfo?.tags?.map((tag) => ({
                value: tag.toLowerCase(),
                label: tag,
              }))}
              value={moduleInfo?.tags?.map((tag) => ({
                value: tag.toLowerCase(),
                label: tag,
              }))}
              styles={colourStyles(theme)}
              isDisabled={data?.owner?.toUpperCase() === MODULE_OWNER.SYSTEM}
            />
          </InputWrapper>
        </BodyContent>
        <Footer>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit}>{mode === MODE.CLONE ? 'Clone' : 'Save'}</PrimaryButton>
        </Footer>
      </ModalBox>
    </Modal>
    // </FormModal>
  );
};

export default ModuleInfoModal;
