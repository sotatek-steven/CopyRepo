const { styled } = require('@mui/material');

export const ErrorMessage = styled('p')(({ theme, customStyle }) => ({
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 14,
  color: theme.palette.error.main,
  marginTop: 0,
  marginBottom: 0,
  ...customStyle,
}));
