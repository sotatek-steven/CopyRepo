import { styled } from '@mui/material/styles';

export const PrimaryButton = styled('button')(
  ({ theme, width = 105, padding = '10px 0px', fontSize = '14px', fontWeight }) => ({
    fontFamily: theme.typography.fontFamily,
    width: width,
    border: 'solid 1px',
    borderColor: theme.palette.primary.main,
    borderRadius: 4,
    fontSize: fontSize,
    fontWeight: theme.typography.fontWeightBold,
    padding: padding,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: 'opacity 0.15s ease-in-out',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.9,
    },
  })
);

export const SecondaryButton = styled('button')(({ theme, width = 105, padding = '10px 0px', fontSize = '14px' }) => ({
  fontFamily: theme.typography.fontFamily,
  width: width,
  border: 'solid 1px',
  borderColor: theme.palette.text.primary,
  background: 'none',
  borderRadius: 4,
  fontSize: fontSize,
  fontWeight: theme.typography.fontWeightBold,
  padding: padding,
  color: theme.palette.text.primary,
  transition: 'opacity 0.15s ease-in-out',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
}));
