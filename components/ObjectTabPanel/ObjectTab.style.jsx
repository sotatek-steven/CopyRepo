import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  padding: '0 20px',
}));

const BodyContent = styled('div')(({ theme }) => ({}));

const Footer = styled('div')(({ theme }) => ({
  marginTop: 40,
}));

const ItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 30,
  color: theme.palette.text.primary,
  marginTop: 30,
}));

const Item = styled('div')(({ theme }) => ({
  width: '13%',

  '& > div': {
    fontSize: '15px !important',
  },
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: 25,
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

export { Container, BodyContent, Footer, ItemContainer, Item, ButtonWrapper, Error };
