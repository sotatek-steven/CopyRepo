import { Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
}));

const BaseAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '.MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.primary,
    height: 45,
    borderRadius: 5,
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
    padding: '0 8px',
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: theme.typography.fontFamily,
    '& > fieldset': {
      border: 'none',
    },
  },
  '.MuiButtonBase-root': {
    padding: 5,
    display: 'none',

    ':first-of-type': {
      display: 'inline-flex',
    },
  },
  '.MuiAutocomplete-tag': {
    maxWidth: 'calc(100% - 70px)',
  },
  '.MuiChip-root': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  color: theme.palette.primary.light,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

export { Container, BaseAutocomplete, Label, Error };
