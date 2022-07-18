import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  // padding: '0 20px',
  position: 'relative',
}));

const BodyContent = styled('div')(({ theme }) => ({}));

const ItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  // gap: 25,
  color: theme.palette.primary.light,
  marginTop: 30,
  alignItems: 'center',
  width: '100%',
  paddingBottom: '30px',
}));

const Item = styled('div')(({ theme }) => ({
  width: '180px !important',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  marginRight: '24px',
  fontSize: '15px',
  '@media screen and (max-width:1500px )': {
    fontSize: '11px',
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

export { Container, BodyContent, ItemContainer, Item, Error };
