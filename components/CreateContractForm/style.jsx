import styled from '@emotion/styled';

const Box = styled('div')(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '30px 40px',
}));

const Title = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 20,
  fontWeight: 600,
}));

const InputWrapper = styled('div')(() => ({
  marginBottom: 23,
}));

const Label = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 18,
  fontWeight: 600,
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
  padding: '0px 15px',
}));

const Error = styled('div')(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#F91D1D' : '#F91D1D',
    fontSize: 14,
    marginTop: 8,
}));

export {
    Box,
    Title,
    InputWrapper,
    Label,
    Input,
    TextArea,
    Error
}