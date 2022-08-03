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

const AssignedValueList = styled('div')(({ theme }) => ({
  display: '-webkit-box',
  gap: 30,
  alignItems: 'center',
  paddingBottom: 20,
  '.action-icon': {
    marginTop: 60,
  },
  '& .action-icon > svg': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    cursor: 'pointer',
  },
}));

const ScrollbarsCustom = styled(Scrollbars)(({ theme }) => ({
  height: 'fit-content',
  '& > div': {
    position: 'unset !important',
  },
}));

const AssignedValuesContainer = styled('div')(({ theme }) => ({
  marginTop: 25,
  width: '20%',
  '.assigned-value-item': {
    display: 'flex',
    alignItems: 'center',
  },
  '.assigned-value': {
    width: '100%',
    '.content': {
      display: 'flex',
      gap: 20,
      marginTop: 15,
      alignItems: 'center',
      ':first-of-type': {
        marginTop: 0,
      },
      '.name': {
        width: '35%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '.input-value': {
        width: '65%',
      },
    },
  },
  '.title': {
    display: 'flex',
    justifyContent: 'space-between',
    '.name': {
      width: '20%',
    },
    '& .remove-icon > svg': {
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
  ButtonWrapper,
  AssignedValueList,
  ScrollbarsCustom,
  AssignedValuesContainer,
  Error,
  RemoveButton,
};
