import { styled } from '@mui/material';
import React from 'react';

const Text = styled('div')(({ theme, hidden }) => ({
  display: hidden ? 'hidden!imported' : 'block',
  padding: '12px 0px',
  fontFamily: 'Segoe UI',
  height: 42,
  boxSizing: 'border-box',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.primary,
  margin: 0,
  wordBreak: 'break-all',
  borderBottom: 'solid 1px',
  borderColor: theme.shape.borderColor,
  ...theme.components.truncate.singleLineEllipsis,
}));
const ImportLibrary = ({ name, hidden }) => {
  return <Text hidden={hidden}>{name}</Text>;
};

export default ImportLibrary;
