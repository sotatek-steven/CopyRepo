const { styled } = require('@mui/material');

export const ModalBox = styled('div')(({ theme, maxheight, width = 600 }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  outline: 'none',
  maxHeight: maxheight,
  width: width,
}));
