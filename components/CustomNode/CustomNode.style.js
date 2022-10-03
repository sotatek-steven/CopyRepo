import { styled } from '@mui/material';

const Card = styled('article')(({ color, width, height, theme }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: width || 200,
  height: height || 100,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const CardBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  '.data-view': {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}));

const Body = styled('div')(({ theme, isError }) => ({
  marginBottom: 20,
  '.operation': {
    width: '30%',
    marginTop: isError ? 0 : 20,

    '.MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const EditingContainer = styled('div')(({ theme, width, height }) => ({
  padding: 30,
  width: width || 468,
  height: 'fit-content',
  border: `1.5px dashed ${theme.palette.success.main}`,
  background: theme.palette.background.light,
  '.nowheel': {},
  '.pr-10': {
    paddingRight: 10,
  },
}));

const Title = styled('div')(({ theme }) => ({
  width: 'fit-content',
  background: theme.shape.backgroundNode,
  position: 'absolute',
  padding: 8,
  top: '-20px',
  left: '-40px',
  color: theme.palette.text.colorNode,
}));

const ItemContainer = styled('div')(({ theme, error }) => ({
  marginBottom: error ? 34 : 72,
  '& > input': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: 45,
    borderRadius: 5,
    border: `solid 1px ${theme.palette.background.light}`,
    outline: 'none',
    width: '100%',
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    padding: '0px 15px',
    fontFamily: theme.typography.fontFamily,
    '&::placeholder': {
      fontSize: '10px',
    },
  },
}));

const ErrorContainer = styled('div')({
  display: 'flex',
  gap: 8,
  marginTop: 10,
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  marginTop: 15,
});

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  right: 12,
  '.action-icon': {
    minWidth: 28,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
}));

export { Card, CardBody, Body, EditingContainer, Title, ItemContainer, ErrorContainer, Footer, AbsoluteContainer };
