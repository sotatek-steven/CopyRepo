const { styled } = require('@mui/material');

export const Card = styled('article')(({ theme, width, height }) => ({
  padding: '10px 15px',
  width: width || 700,
  height: height || 500,
  backgroundColor: theme.palette.background.parentNode,
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  border: `1px dashed`,
  borderColor: theme.palette.text.primary,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

export const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
});

export const ForBlock = styled('div')(({ theme }) => ({
  padding: '10px 15px',
  width: 120,
  height: 70,
  backgroundColor: theme.shape.backgroundNode,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  top: -10,
  left: -15,
  borderRadius: '0 0 6px 0',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  '& p': {
    margin: 0,
    flexGrow: 1,
  },
}));

export const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 10,
  '.action-icon': {
    minWidth: 28,
    background: theme.palette.success.main,
    opacity: 0.8,
    '&:hover': {
      background: theme.palette.success.main,
      opacity: 1,
    },
  },
}));

export const ParentAbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  position: 'absolute',
  height: 25,
  right: 0,
  top: -25,
  gap: 2,
  '.action-icon': {
    minWidth: 28,
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.light,
    },
  },
}));

export const EditFormContainer = styled('div')(({ theme }) => ({
  width: 364,
  height: 380,
  background: theme.palette.background.light,
  border: `1.5px dashed ${theme.palette.success.main}`,
  position: 'absolute',
  top: -300,
  left: '-100%',
  zIndex: 1000,
  padding: '20px 0px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const FormTitle = styled('div')(({ theme }) => ({
  backgroundColor: theme.shape.backgroundNode,
  padding: '7px 30px',
  position: 'absolute',
  top: '-20px',
  left: '-30px',
  color: theme.palette.primary.contrastText,
}));

export const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0px 25px',
});

export const FormFooter = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  padding: '0px 25px',
});

export const ButtonWrapper = styled('div')({
  height: 45,
  width: 45,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  cursor: 'pointer',
  '&:hover': {
    background: '#504e4d',
  },
});

export const Label = styled('label')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 14,
  color: theme.palette.text.primary,
  marginBottom: 5,
}));
