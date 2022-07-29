import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../ButtonStyle';
import SavingScreen from '../Saving';
import { makeStyles } from '@mui/styles';
import CompiledErrorToast from '../atom/CompiledErrorToast';
import { HTTP_CODE } from '@/config/constant/common';

export const useStyles = makeStyles(() => {
  return {
    customToast: {
      padding: 0,
    },
  };
});

const SaveContractButton = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { contract } = useDispatch();

  const saveContract = async () => {
    setLoading(true);
    const { code, message, data } = await contract.updateContract();
    setLoading(false);
    const errors = data.errors;
    if (code == HTTP_CODE.SUCCESS) {
      if (errors.length > 0) {
        toast(
          <>
            <CompiledErrorToast errors={errors} />
          </>,
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            bodyClassName: classes.customToast,
            style: {
              width: '457px',
              right: '50%',
              padding: 0,
              background: theme.palette.background.dark,
            },
          }
        );
      } else
        toast.success('Save contract success', {
          style: { top: '3.5em' },
        });
      return;
    }
    toast.error('saving contract failed!', message);
  };

  return (
    <>
      <PrimaryButton width="130px" onClick={saveContract}>
        Save Contract
      </PrimaryButton>
      {loading && <SavingScreen />}
    </>
  );
};

export default SaveContractButton;
