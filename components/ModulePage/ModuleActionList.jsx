import { styled } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const ModuleActionList = () => {
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const saveModule = () => {
    userModule.updateModule({ moduleId: moduleState._id, moduleInfo: moduleState });
  };

  return (
    <div>
      <Container>
        <PrimaryButton onClick={saveModule}>Save Module</PrimaryButton>
      </Container>
    </div>
  );
};

export default ModuleActionList;
