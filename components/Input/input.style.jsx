import { styled } from '@mui/material';

export const Input = styled('input')(({ theme, error, background = 'light' }) => {
  const backgroundColor = background === 'light' ? theme.palette.background.light : theme.palette.background.default;
  return {
    backgroundColor: backgroundColor,
    color: theme.palette.text.primary,
    height: 45,
    borderRadius: 5,
    border: error ? 'solid 1px red' : `solid 1px ${backgroundColor}`,
    outline: 'none',
    width: '100%',
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    padding: '0px 15px',
    fontFamily: theme.typography.fontFamily,
    '&::placeholder': {
      fontSize: '10px',
    },
  };
});
