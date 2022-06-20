import React, { useState, useEffect } from 'react';
import {
  Label,
  InputWrapper,
  Input,
  TextArea,
  CancelBtn,
  ConfirmBtn
} from './style';
import Creatable from 'react-select/creatable';
import colourStyles from './tagStyle';
import { useDispatch, useSelector } from 'react-redux';

const InfoContractForm = ({ onClose, data }) => {
  const { name: _name, description: _description, domain: _domain, tags: _tags} = data;
  const [name, setName] = useState(_name || '');
  const [description, setDescription] = useState(_description || '');
  const [domain, setDomain] = useState(_domain || '');
  const [tags, setTags] = useState(_tags || []);
  const [tagOptions, setTagOptions] = useState([]);
  const { contract } = useDispatch();
  const contractState = useSelector(state => state.contract);

  useEffect(() => {
    const tagList = tags.map(tag => ({
      value: tag.toLowerCase(),
      label: tag,
    }))

    setTagOptions(tagList);
  }, [tags])
  

  const handleChange = (newValue) => {
    const value = newValue.map(item => item.label)
    setTags(value);
  };

  const updateContract = () => {
    const newContract = { ...contractState, name, description, tags, domain };
    contract.update(newContract);
    onClose();
  }

  return (
    <>
      <InputWrapper>
        <Label htmlFor="name">Name*</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {/* <Error>Maximum 225 characters allowed</Error> */}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="description">Description</Label>
        <TextArea
          type="text"
          name="description"
          id="description"
          rows="5"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="domain">Domain*</Label>
        <Input
          type="text"
          name="domain"
          id="domain"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
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
        />
      </InputWrapper>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        marginTop: 30,
      }}>
        <CancelBtn onClick={onClose}>Cancel</CancelBtn>
        <ConfirmBtn onClick={updateContract}>Continue</ConfirmBtn>
      </div>
    </>
  )
}

export default InfoContractForm;