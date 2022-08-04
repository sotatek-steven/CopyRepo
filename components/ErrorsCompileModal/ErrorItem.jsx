import { styled } from '@mui/material';
import React from 'react';
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

const ErrorItem = () => {
  return (
    <Container>
      <Content>
        <ErrorType>Rule-book detected error</ErrorType>
        <Description>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, dolores quae, blanditiis ipsa atque
          dolor, reprehenderit quidem incidunt vitae tenetur dolorem provident ex voluptates delectus quis. Rem
          veritatis temporibus veniam!
        </Description>
      </Content>
      <PrimaryButton padding="6px 20px">Fix</PrimaryButton>
    </Container>
  );
};

export default ErrorItem;
