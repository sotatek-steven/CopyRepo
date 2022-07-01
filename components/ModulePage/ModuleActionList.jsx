import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import useStructPage from '../StructTabPanel/hooks/useStructPage';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const ModuleActionList = () => {
  const { userModule, struct } = useDispatch();
  const { handleErrorStructs } = useStructPage();

  const saveModule = async () => {
    const isErrorStruct = handleErrorStructs();
    if (isErrorStruct) {
      return;
    }

    const { code } = await userModule.updateModule();
    if (code === HTTP_CODE.SUCCESS) {
      struct.setIsChanged(false);
    }
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
