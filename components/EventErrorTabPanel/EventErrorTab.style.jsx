import { styled } from '@mui/material/styles';
import Scrollbars from 'react-custom-scrollbars';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')(({ theme }) => ({
  paddingLeft: 30,
}));

const BodyContent = styled('div')(({ theme }) => ({}));

const Footer = styled('div')(({ theme }) => ({
  marginTop: 40,
}));

const ItemContainer = styled('div')(({ theme }) => ({
  marginTop: 30,
  borderTop: `1px solid ${theme.shape.borderColor}`,

  '&:first-of-type': {
    borderTop: 'unset',
  },
}));

const Item = styled('div')(({ theme }) => ({
  width: '15%',

  '& > div': {
    fontSize: '15px !important',
  },
}));

const TypeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 30,
  color: theme.palette.text.primary,
  marginTop: 30,
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: 25,
}));

const EventParameters = styled('div')(({ theme }) => ({
  color: theme.palette.primary.light,
  marginTop: 15,

  '.action-icon': {
    marginTop: 40,
  },
  '& .action-icon > svg': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    cursor: 'pointer',
  },

  '.content': {
    marginLeft: 40,
  },
}));

const ItemParam = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 30,
  color: theme.palette.text.primary,
  marginTop: 10,
}));

const MapFunctions = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: 15,
  width: 'calc(30% + 30px)',
}));

const ScrollbarsCustom = styled(Scrollbars)(({ theme }) => ({
  height: 'fit-content',
  '& > div': {
    position: 'unset !important',
  },
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  marginTop: 8,
}));

const RemoveButton = styled(CloseIcon)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '50%',
  border: '1.5px solid',
  fontSize: 18,
  marginBottom: 4,
}));

export {
  Container,
  BodyContent,
  Footer,
  ItemContainer,
  Item,
  TypeContainer,
  ButtonWrapper,
  EventParameters,
  ItemParam,
  MapFunctions,
  ScrollbarsCustom,
  Error,
  RemoveButton,
};
