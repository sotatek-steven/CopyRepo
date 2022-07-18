import { styled } from '@mui/material/styles';
import React from 'react';
import IconInfo from 'assets/icon/icon-info.svg';
import { IconButton, Tooltip } from '@mui/material';
import Label from '../atom/Label';

const LabelContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  '.MuiIconButton-root': {
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
});

const InputBasic = styled('input')(({ theme, error }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  height: 45,
  borderRadius: 5,
  border: error ? 'solid 1px red' : `solid 1px ${theme.palette.background.light}`,
  outline: 'none',
  width: '100%',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: '0px 15px',
  fontFamily: theme.typography.fontFamily,
  '&::placeholder': {
    fontSize: '10px',
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const Input = ({ label, isRequired, tooltip, errorText, error, ...props }) => {
  return (
    <>
      <LabelContainer htmlFor={props.id}>
        <Label className="title">
          {label}
          {isRequired && '*'}
        </Label>
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <IconButton>
              <IconInfo />
            </IconButton>
          </Tooltip>
        )}
      </LabelContainer>
      <InputBasic error={error ? 1 : 0} {...props} />
      {!!errorText && <Error>{errorText}</Error>}
    </>
  );
};

export default Input;
