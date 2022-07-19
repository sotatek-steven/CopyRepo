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

const AssignedValueList = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 30,
  alignItems: 'center',
  '.action-icon': {
    marginTop: 60,
  },
  '& .action-icon > svg': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    cursor: 'pointer',
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
    '.content': {
      display: 'flex',
      gap: 20,
      marginTop: 15,
      alignItems: 'center',
      ':first-of-type': {
        marginTop: 0,
      },
      '.name': {
        width: '15%',
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

export {
  Container,
  BodyContent,
  Footer,
  ItemContainer,
  Item,
  ButtonWrapper,
  AssignedValueList,
  AssignedValuesContainer,
  Error,
};
