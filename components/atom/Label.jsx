const { styled } = require('@mui/material');

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  color: theme.palette.primary.light,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
}));

export default Label;
