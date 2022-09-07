import { Autocomplete, autocompleteClasses, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  width: '100%',
});

const BaseAutocomplete = styled(Autocomplete)(({ theme, background = theme.palette.background.light, error }) => ({
  '.MuiOutlinedInput-root': {
    backgroundColor: background,
    color: theme.palette.text.primary,
    minHeight: 45,
    height: 'fit-content',
    borderRadius: 5,
    border: `solid 1px`,
    borderColor: error ? theme.palette.error.main : background,
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

    ':first-of-type': {
      display: 'inline-flex',
    },
  },

  '.MuiChip-root': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Label = styled('div')(({ theme, colorLabel }) => ({
  fontFamily: 'Segoe UI',
  color: colorLabel || theme.palette.primary.light,
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 3,
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  [`& .${autocompleteClasses.listbox}`]: {
    maxHeight: 200,
    background: theme.palette.background.dark,
    // zIndex: 1000,
  },
}));

export { Container, BaseAutocomplete, Label, Error, StyledPopper };
