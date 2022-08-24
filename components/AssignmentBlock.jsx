import { Grid, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { BaseAutocomplete, StyledPopper } from './AutoComplete/AutoComplete.style';
import { PrimaryButton } from './ButtonStyle';
import { Input } from './Input';

const EqualWrapper = styled('div')({
  fontSize: 25,
  height: '100%',
  textAlign: 'center',
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  padding: '40px 0px 20px',
});

const AssignmentBlock = () => {
  const [variable, setVariable] = useState(null);
  const [value, setValue] = useState();

  const handleVariableChange = (e, value) => {
    console.log(value);
    setVariable(value);
  };

  const handleValueChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <BaseAutocomplete
            disablePortal
            options={[]}
            sx={{
              width: '100%',
            }}
            renderInput={(params) => <TextField {...params} />}
            onChange={handleVariableChange}
            value={variable}
            PopperComponent={StyledPopper}
          />
        </Grid>
        <Grid item xs={2}>
          <EqualWrapper>
            <span>=</span>
          </EqualWrapper>
        </Grid>
        <Grid item xs={6}>
          <Input value={value} onChange={handleValueChange} />
        </Grid>
      </Grid>
      <Footer>
        <PrimaryButton>OK</PrimaryButton>
      </Footer>
    </div>
  );
};
export default AssignmentBlock;
