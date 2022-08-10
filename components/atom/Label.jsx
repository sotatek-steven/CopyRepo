const { styled } = require('@mui/material');

const PinkLabel = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  color: theme.palette.primary.light,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
}));

const BasicLabel = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
}));

import React from 'react';

const Label = ({ children, type = 'pink' }) => {
  if (type === 'pink') return <PinkLabel>{children}</PinkLabel>;
  if (type === 'basic') return <BasicLabel>{children}</BasicLabel>;
  return <div></div>;
};

export default Label;
