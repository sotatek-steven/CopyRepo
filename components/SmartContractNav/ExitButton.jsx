import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const ExitButton = styled('div')(({ theme }) => ({
  width: '130px',
  textAlign: 'center',
  border: 'solid 1px #E1E1E1',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  borderRadius: '4px',
  fontSize: '14px',
  padding: '8px 40px',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontWeight: 600,
  transition: 'all 0.3s',
  ":hover": {
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#414144' : '#414144',
    boxShadow: '0px 0px 10px #111112',
  }
}));

const Exitbutton = () => {
  const route = useRouter();
  return (
    <ExitButton onClick={() => { route.push('/'); }}>Exit</ExitButton>
  )
};

export default Exitbutton;