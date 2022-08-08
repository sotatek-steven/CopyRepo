import { styled } from '@mui/material/styles';

const Header = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Josefin Sans',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 28,
  margin: '20px 0',
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 3,
}));

const BodyContent = styled('div')(({ theme }) => ({
  paddingRight: 20,
}));

const Footer = styled('div')(({ theme }) => ({}));

const ItemContainer = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  marginBottom: 20,
  borderBottom: `1px solid ${theme.shape.borderColor}`,
}));

const ValueContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 18,
  marginTop: 20,
}));

const ItemTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& > .name-struct': {
    width: '80%',
  },
  '& > .action-remove-struct': {
    marginTop: 30,
  },
}));

const ItemContent = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  gap: 40,
  marginBottom: 20,
  ':last-child': {
    '& > .action-value': {
      width: '10%',
      margin: '20px 0',
    },
  },

  '& > .type': {
    width: '45%',
  },
  '& > .name-value': {
    width: '45%',
  },
  '& > .action-value': {
    width: '10%',

    '& .action-icon': {
      display: 'flex',
      alignItems: 'center',
    },

    '& .action-icon > svg': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      cursor: 'pointer',
    },
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

export { Header, Label, BodyContent, Footer, ItemContainer, ValueContainer, ItemTitle, ItemContent, Error };
