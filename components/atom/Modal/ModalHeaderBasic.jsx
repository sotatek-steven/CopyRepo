import { styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')(({ theme }) => ({
  fontSize: 20,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 30px',
  borderBottom: 'solid 1px',
  borderColor: theme.shape.borderColor,
}));

const Title = styled('h3')(({ theme }) => ({
  fontSize: 20,
  fontWeight: theme.typography.fontWeightBold,
  margin: 0,
}));

const CloseButton = styled(CloseIcon)({
  cursor: 'pointer',
});

const ModalHeaderBasic = ({ title, onClose }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CloseButton onClick={onClose} />
    </Container>
  );
};

export default ModalHeaderBasic;
