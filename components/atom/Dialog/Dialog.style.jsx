import styled from '@emotion/styled';

const Container = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '50px 35px',
  outline: 'none',
  padding: '55px 90px',
  background: '#3D3D3E',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 30,
  textAlign: 'center',
}));

const ContentText = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 15,
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: 30,
}));

const BoxActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '25px',
}));

export { Container, Title, ContentText, BoxActions };
