import { styled } from '@mui/material/styles';

export const PrimaryButton = styled('button')(({ theme, width }) => ({
    width: width,
    border: 'solid 1px #F07D60',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '10px 0px',
    color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
    fontWeight: 600,
    backgroundColor: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
    transition: 'all 0.3s',
    ":hover": {
      cursor: 'pointer',
      backgroundColor: theme.palette.mode === 'dark' ? '#ef6f4e' : '#ef6f4e',
      boxShadow: '0px 0px 10px #111112',
    }
  }));