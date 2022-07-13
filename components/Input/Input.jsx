import { styled } from '@mui/material/styles';
import React from 'react';
import IconInfo from 'assets/icon/icon-info.svg';
import { IconButton, Tooltip } from '@mui/material';

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  color: theme.palette.primary.light,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
  display: 'flex',
  justifyContent: 'space-between',
  '.MuiIconButton-root': {
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
}));

const InputBasic = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  height: 45,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: '0px 15px',
  fontFamily: theme.typography.fontFamily,
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const Input = ({
  label,
  value,
  isRequired,
  tooltip,
  id,
  name,
  type = 'text',
  onChange,
  readOnly,
  errorText,
  placeholder,
}) => {
  return (
    <>
      <Label htmlFor={id}>
        <div className="title">
          {label}
          {isRequired && '*'}
        </div>
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <IconButton>
              <IconInfo />
            </IconButton>
          </Tooltip>
        )}
      </Label>
      <InputBasic
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {!!errorText && <Error>{errorText}</Error>}
    </>
  );
};

export default Input;
