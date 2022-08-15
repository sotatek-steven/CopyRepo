import React from 'react';
import NameField from './NameField';
import { useDispatch, useSelector } from 'react-redux';
import { styled, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TOOLTIP_NAME = 'Beginning character: Must be letter\nFollowing characters only contain: Letters, digits, (_)';
import Label from '../atom/Label';
const TitleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FunctionNameField = ({ setFormError }) => {
  const { name } = useSelector((state) => state.userFunction);
  const { userFunction } = useDispatch();

  const handleChange = (value) => {
    userFunction.updateName(value);
  };

  return (
    <div>
      <TitleWrapper>
        <Label type="basic">Function name *</Label>
        <Tooltip title={TOOLTIP_NAME} placement="top" arrow>
          <ErrorOutlineIcon style={{ fontSize: 16 }} />
        </Tooltip>
      </TitleWrapper>
      <NameField value={name} setValue={handleChange} setFormError={setFormError} />
    </div>
  );
};

export default FunctionNameField;
