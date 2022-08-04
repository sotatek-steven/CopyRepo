import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
  fontSize: 20,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.red1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.error.light,
  padding: '20px 30px',
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  gap: 10,
  alignItems: 'center',
});

const Title = styled('h3')(({ theme }) => ({
  fontSize: 20,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: 'Segoe UI',
  margin: 0,
}));

const CloseButton = styled(CloseIcon)({
  cursor: 'pointer',
});

const ModalHeaderWarning = ({ title, onClose }) => {
  return (
    <Container>
      <TitleWrapper>
        <WarningIcon />
        <Title>{title}</Title>
      </TitleWrapper>
      <CloseButton onClick={onClose} />
    </Container>
  );
};

export default ModalHeaderWarning;
