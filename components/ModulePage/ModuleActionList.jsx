import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../ButtonStyle';
import useStructPage from '../StructTabPanel/hooks/useStructPage';
import useModulePage from './hooks/useModulePage';
import { makeStyles } from '@mui/styles';
import ErrorsCompileModal from '../ErrorsCompileModal';
import SavingScreen from '../Saving';

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
  const [loading, setLoading] = useState(false);

  const { handleErrorStructs } = useStructPage();
  const { fetchDetailModule } = useModulePage();

  const saveModule = async () => {
    setLoading(true);
    const isErrorStruct = handleErrorStructs();
    if (isErrorStruct) {
      return;
    }

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
    setLoading(false);
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
      {loading && <SavingScreen />}
    </div>
  );
};

export default ModuleActionList;
