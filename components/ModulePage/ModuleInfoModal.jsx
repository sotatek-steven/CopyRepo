import { Modal, styled, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { Input, TextArea } from '../Input';
import Creatable from 'react-select/creatable';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import { useDispatch } from 'react-redux';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { useForm } from '@/hooks/useForm';

const Box = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  padding: '35px 35px',
  outline: 'none',
}));

const HeaderModal = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 25,
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 30,
}));

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: '8px',
}));

const CloseButton = styled('div')(({ theme }) => ({
  transition: 'all 0.2s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
  },
}));

const validateInfo = (values) => {
  let errors = {};
  const { name, description, domain } = values;

  if (!name.trim()) {
    errors.name = 'This field is required';
  }

  if (!domain.trim()) {
    errors.domain = 'This field is required';
  }
  return errors;
};

const getInitialValues = (data) => {
  const { name: _name, description: _description, domain: _domain } = data;
  return {
    name: _name || '',
    description: _description || '',
    domain: _domain || '',
  };
};

const ModuleInfoModal = ({ open, onClose, data, readOnly = false }) => {
  const [tags, setTags] = useState(data.tags || []);
  const [tagOptions, setTagOptions] = useState([]);
  const { userModule } = useDispatch();
  const theme = useTheme();

  const [values, setValues, handleChange, handleSubmit, errors] = useForm({
    initialValues: getInitialValues(data),
    validate: validateInfo,
  });

  useEffect(() => {
    const tagList = tags.map((tag) => ({
      value: tag.toLowerCase(),
      label: tag,
    }));

    setTagOptions(tagList);
  }, [tags]);

  const handleTagsChange = (newValue) => {
    const value = newValue.map((item) => item.label);
    setTags(value);
  };

  const updateModule = (e) => {
    const newModule = { ...data, ...values, tags };
    userModule.update(newModule);
    if (!onClose) return;
    onClose();
  };

  const handleClose = () => {
    if (!onClose) return;
    setValues(getInitialValues(data));
    setTags(data.tags);
    onClose();
  };

  useEffect(() => {
    if (!data) return;
    setValues(getInitialValues(data));
    setTags(data.tags);
  }, [data]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <HeaderModal>
          <Title>Module Info</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <div style={{ padding: '0px 20px' }}>
          <InputWrapper>
            <Input
              label="Name"
              id="name"
              name="name"
              isRequired={true}
              value={values.name}
              onChange={handleChange}
              readOnly={readOnly}
            />
            {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <TextArea
              label="Description"
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              readOnly={readOnly}
            />
            {errors?.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Domain"
              name="domain"
              id="domain"
              isRequired={true}
              value={values.domain}
              onChange={handleChange}
              readOnly={readOnly}
            />
            {errors?.domain && <ErrorMessage>{errors.domain}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="name">Tags</Label>
            <Creatable
              isMulti
              onChange={handleTagsChange}
              options={tagOptions}
              value={tagOptions}
              styles={colourStyles(theme)}
              isDisabled={readOnly}
            />
          </InputWrapper>

          {!readOnly && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '20px',
                marginTop: 30,
              }}>
              <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
              <PrimaryButton onClick={(e) => handleSubmit(e, updateModule)}>Continue</PrimaryButton>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ModuleInfoModal;
