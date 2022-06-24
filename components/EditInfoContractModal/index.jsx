import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';
import Creatable from 'react-select/creatable';
import colourStyles from '../EditInfoContractModal/tagStyle';
import { useDispatch } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import { Input, TextArea } from '../Input';

const Box = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '35px 35px',
  outline: 'none',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 30,
}));

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#F91D1D' : '#F91D1D',
  fontSize: 14,
  marginTop: 8,
}));

const EditInfoContractModal = ({ open, onClose, data, readOnly }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const { contract } = useDispatch();

  useEffect(() => {
    const tagList = tags.map((tag) => ({
      value: tag.toLowerCase(),
      label: tag,
    }));

    setTagOptions(tagList);
  }, [tags]);

  const handleChange = (newValue) => {
    const value = newValue.map((item) => item.label);
    setTags(value);
  };

  const updateContract = () => {
    const newContract = { ...data, name, description, tags, domain };
    contract.update(newContract);
    if (!onClose) return;
    onClose();
  };

  useEffect(() => {
    const { name: _name, description: _description, domain: _domain, tags: _tags } = data;
    setName(_name);
    setDescription(_description);
    setDomain(_domain);
    setTags(_tags);
  }, [data]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <Title>Smart Contract Info</Title>
          <div style={{ padding: '0px 20px' }}>
            <InputWrapper>
              <Input
                label="Name"
                id="name"
                name="name"
                isRequired={true}
                value={name}
                onChange={(event) => setName(event.target.value)}
                readOnly={readOnly}
              />
            </InputWrapper>

            <InputWrapper>
              <TextArea
                label="Description"
                name="description"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                readOnly={readOnly}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                label="Domain"
                name="domain"
                id="domain"
                isRequired={true}
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                readOnly={readOnly}
              />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="name">Tags</Label>
              <Creatable
                isMulti
                onChange={handleChange}
                options={tagOptions}
                value={tagOptions}
                styles={colourStyles}
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
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton onClick={updateContract}>Continue</PrimaryButton>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditInfoContractModal;
