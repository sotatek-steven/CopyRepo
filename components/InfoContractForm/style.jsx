import styled from '@emotion/styled';

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const Label = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 3,
}));

const Input = styled('input')(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#595655' : '#595655',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  height: 45,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 17,
  padding: '0px 15px',
}));

const TextArea = styled('textarea')(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#595655' : '#595655',
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: 15,
  padding: '15px 15px',
}));

const Error = styled('div')(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#F91D1D' : '#F91D1D',
    fontSize: 14,
    marginTop: 8,
}));

const CancelBtn = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  background: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  fontSize: 16,
  padding: '8px 28px',
  borderRadius: 4,
  border: 'solid 1px #E1E1E1',
  transition: 'opacity 0.15s ease-in-out',
  opacity: 1,
  ":hover": {
    cursor: 'pointer',
    opacity: 0.8,
  }
}));

const ConfirmBtn = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  background: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
  fontSize: 16,
  padding: '8px 28px',
  borderRadius: 4,
  transition: 'opacity 0.15s ease-in-out',
  opacity: 1,
  ":hover": {
    cursor: 'pointer',
    opacity: 0.9,
  }
}));

export {
    InputWrapper,
    Label,
    Input,
    TextArea,
    Error,
    CancelBtn,
    ConfirmBtn,
}