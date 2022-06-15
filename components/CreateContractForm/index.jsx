import React, { useState } from 'react';
import {
  Box,
  Title,
  Label,
  InputWrapper,
  Input,
  TextArea,
  Error
} from './style'
import CreatableSelect from 'react-select/creatable';
import colourStyles from './tagStyle';
import colourOptions from './data';

const CreateContractForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <div>
      <Box>
        <Title>
          Create Smart Contract
        </Title>
        <div style={{ padding: '40px 30px' }}>
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
            <CreatableSelect
              isMulti
              onChange={handleChange}
              options={colourOptions}
              styles={colourStyles}
            />
          </InputWrapper>
        </div>
      </Box>
    </div>
  )
}

export default CreateContractForm;