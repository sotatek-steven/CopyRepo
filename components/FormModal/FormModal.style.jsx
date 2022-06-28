import { styled } from '@mui/material/styles';

const ModalBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  padding: '35px 35px',
  outline: 'none',
}));

const Header = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 25,
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 30,
}));

const CloseButton = styled('div')(({ theme }) => ({
  transition: 'all 0.2s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
  },
}));

const BodyContent = styled('div')(({ theme }) => ({
  padding: '0px 20px',
}));

const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
  marginTop: 30,
  padding: '0 20px',
}));

export { ModalBox, Header, Title, CloseButton, BodyContent, Footer };
