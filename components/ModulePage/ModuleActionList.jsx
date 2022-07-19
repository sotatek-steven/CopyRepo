import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../ButtonStyle';
import useObjectTab from '../ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '../StructTabPanel/hooks/useStructPage';
import useModulePage from './hooks/useModulePage';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const ModuleActionList = () => {
  const { userModule, struct } = useDispatch();
  const { structs } = useSelector((state) => state.struct);
  const { handleErrorStructs } = useStructPage();
  const { objectHasError } = useObjectTab();
  const { fetchDetailModule } = useModulePage();

  const saveModule = async () => {
    const isErrorStruct = handleErrorStructs();
    if (isErrorStruct) {
      return;
    }
    if (objectHasError()) return;

    const { code } = await userModule.updateModule();
    if (code === HTTP_CODE.SUCCESS) {
      struct.setOriginStructs(JSON.parse(JSON.stringify(structs)));
      fetchDetailModule();
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
