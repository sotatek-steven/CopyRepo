import { HTTP_CODE } from '@/config/constant/common';
import { styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CompiledErrorToast from '../atom/CompiledErrorToast';
import { PrimaryButton } from '../ButtonStyle';
import useObjectTab from '../ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '../StructTabPanel/hooks/useStructPage';
import useValuesTab from '../ValuesPanel/hooks/useValuesTab';
import useModulePage from './hooks/useModulePage';
import { makeStyles } from '@mui/styles';
import ErrorsCompileModal from '../ErrorsCompileModal';
import useEventErrorTab from '../EventErrorTabPanel/hooks/useEventErrorTab';

export const useStyles = makeStyles(() => {
  return {
    customToast: {
      padding: 0,
    },
  };
});

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const ModuleActionList = () => {
  const { userModule, struct } = useDispatch();
  const { structs } = useSelector((state) => state.struct);
  const { owner } = useSelector((state) => state.userModule);
  const [errorsModalOpen, setErrorsModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();
  const theme = useTheme();

  const { handleErrorStructs } = useStructPage();
  const { objectHasError } = useObjectTab();
  const { checkErrorTab } = useEventErrorTab();
  const { fetchDetailModule } = useModulePage();

  const saveModule = async () => {
    const isErrorStruct = handleErrorStructs();
    if (isErrorStruct) {
      return;
    }
    if (objectHasError()) return;
    if (checkErrorTab()) return;

    const { code, data } = await userModule.updateModule();

    const errors = data?.errors;
    if (code === HTTP_CODE.SUCCESS) {
      struct.setOriginStructs(JSON.parse(JSON.stringify(structs)));
      fetchDetailModule();
      if (errors.length > 0) {
        setErrors(errors);
        setErrorsModalOpen(true);
      } else {
        toast.success('Save module success', {
          style: { top: '3.5em' },
        });
      }
    }
  };

  const handleErrorsModalClose = () => {
    setErrors([]);
    setErrorsModalOpen(false);
  };

  return (
    <div>
      <Container>
        {owner?.toLowerCase() !== 'system' && <PrimaryButton onClick={saveModule}>Save Module</PrimaryButton>}
        <ErrorsCompileModal open={errorsModalOpen} onClose={handleErrorsModalClose} errors={errors} />
      </Container>
    </div>
  );
};

export default ModuleActionList;
