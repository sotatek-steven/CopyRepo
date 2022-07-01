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

const BodyContent = styled('div')(({ theme }) => ({}));

const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
}));

const ItemContainer = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  marginBottom: 20,
  borderBottom: `1px solid ${theme.shape.borderColor}`,
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
  marginLeft: 50,
  gap: 40,
  marginTop: 20,
  ':last-child': {
    '& > .action-variable': {
      width: '10%',
      margin: '20px 0',
    },
  },

  '& > .type': {
    width: '45%',
  },
  '& > .name-variable': {
    width: '45%',
  },
  '& > .action-variable': {
    width: '10%',
    marginTop: 42,

    '& > svg': {
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

export { Header, Label, BodyContent, Footer, ItemContainer, ItemTitle, ItemContent, Error };
