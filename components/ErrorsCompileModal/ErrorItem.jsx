import { styled } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../ButtonStyle';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: 'solid 1px',
  borderColor: theme.palette.bor,
  gap: 20,
}));
const Content = styled('div')({});
const ErrorType = styled('span')(({ theme }) => ({
  fontSize: 14,
  fontFamily: 'Segoe UI',
  borderRadius: 10,
  background: theme.palette.background.light,
  boderColor: theme.shape.borderColor,
  padding: '5px 10px',
}));

const Description = styled('p')(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  padding: '5px 10px',
  margin: 0,
  ...theme.components.truncate.twoLineEllipsis,
  marginTop: 7,
}));

const ErrorItem = ({ data, onClose }) => {
  const { label, message } = data;
  const { userModule } = useDispatch();
  const { _id } = useSelector((state) => state.userModule);

  const handleFixRuleBookError = async () => {
    try {
      const { code, data: updatedData } = await userModule.fixRuleBookError({ moduleId: _id, key: data.key });

      if (code !== 200) {
        toast.error('Fix rule book error failed');
        return;
      }

      userModule.update(updatedData);
      onClose();
    } catch (error) {
      console.log('Failed to fix rule book error.', error);
    }
  };

  return (
    <Container>
      <Content>
        <ErrorType>{label}</ErrorType>
        <Description>{message}</Description>
      </Content>
      {label !== 'Compiler Error' && (
        <PrimaryButton padding="6px 20px" onClick={handleFixRuleBookError}>
          Fix
        </PrimaryButton>
      )}
    </Container>
  );
};

export default ErrorItem;
