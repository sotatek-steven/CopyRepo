import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  padding: '50px 35px',
  outline: 'none',
  padding: '55px 90px',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: 30,
  textAlign: 'center',
}));

const ContentText = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 15,
  fontWeight: theme.typography.fontWeightBold,
  textAlign: 'center',
  marginBottom: 30,
}));

const BoxActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '25px',
}));

export { Container, Title, ContentText, BoxActions };
