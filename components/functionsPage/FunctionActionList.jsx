import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../ButtonStyle';
import { makeStyles } from '@mui/styles';
import ErrorsCompileModal from '../ErrorsCompileModal';

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

const FunctionActionList = () => {
  const { userFunction } = useDispatch();
  const functionState = useSelector((state) => state.userFunction);
  const [errorsModalOpen, setErrorsModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const saveFunction = async () => {
    const { code, data } = await userFunction.updateFunction(functionState);

    const errors = data?.errors;
    if (code === HTTP_CODE.SUCCESS) {
      if (errors.length > 0) {
        setErrors(errors);
        setErrorsModalOpen(true);
      } else {
        toast.success('Save successfully', {
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
        <PrimaryButton onClick={saveFunction}>Save Function</PrimaryButton>
        <ErrorsCompileModal open={errorsModalOpen} onClose={handleErrorsModalClose} errors={errors} />
      </Container>
    </div>
  );
};

export default FunctionActionList;
