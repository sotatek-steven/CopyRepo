import { styled } from '@mui/material/styles';

export const PrimaryButton = styled('button')(
  ({ theme, width, padding = '10px 0px', fontSize = '14px', fontWeight }) => ({
    fontFamily: 'Josefin Sans',
    width: width || 105,
    border: 'solid 1px #F07D60',
    borderRadius: '4px',
    fontSize: fontSize,
    fontWeight: 600,
    padding: padding,
    color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
    backgroundColor: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
    transition: 'opacity 0.15s ease-in-out',
    ':hover': {
      cursor: 'pointer',
      opacity: 0.9,
    },
  })
);

export const SecondaryButton = styled('button')(({ theme, width }) => ({
  fontFamily: 'Josefin Sans',
  width: width || 105,
  border: theme.palette.mode === 'dark' ? 'solid 1px #E1E1E1' : 'solid 1px #E1E1E1',
  background: 'none',
  borderRadius: '4px',
  fontSize: 14,
  fontWeight: 600,
  padding: '10px 0px',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  transition: 'opacity 0.15s ease-in-out',
  ':hover': {
    cursor: 'pointer',
    opacity: 0.9,
  },
}));
