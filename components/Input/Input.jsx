import { styled } from '@mui/material/styles';
import React from 'react';
import IconInfo from 'assets/icon/icon-info.svg';
import { IconButton, Tooltip } from '@mui/material';
import Label from '../atom/Label';
import { Input as InputBasic } from './input.style';

const LabelContainer = styled('div')(({ theme, type }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '.MuiIconButton-root': {
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
    '& > svg > path': {
      fill: type === 'basic' ? theme.palette.text.primary : theme.palette.primary.light,
    },
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const Input = ({ label, typeLabel, isRequired, tooltip, errorText, error, value = '', ...props }) => {
  return (
    <>
      {label && (
        <LabelContainer htmlFor={props.id} type={typeLabel}>
          <Label className="title" type={typeLabel}>
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
      )}
      <InputBasic value={value} error={error ? 1 : 0} {...props} />
      {!!errorText && <Error>{errorText}</Error>}
    </>
  );
};

export default Input;
