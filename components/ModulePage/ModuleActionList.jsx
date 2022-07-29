import { HTTP_CODE } from '@/config/constant/common';
import { styled, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CompiledErrorToast from '../atom/CompiledErrorToast';
import { PrimaryButton } from '../ButtonStyle';
import useObjectTab from '../ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '../StructTabPanel/hooks/useStructPage';
import useValuesTab from '../ValuesPanel/hooks/useValuesTab';
import useModulePage from './hooks/useModulePage';
import { makeStyles } from '@mui/styles';

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
  const classes = useStyles();
  const theme = useTheme();

  const { handleErrorStructs } = useStructPage();
  const { objectHasError } = useObjectTab();
  const { fetchDetailModule } = useModulePage();

  const saveModule = async () => {
    const isErrorStruct = handleErrorStructs();
    if (isErrorStruct) {
      return;
    }
    if (objectHasError()) return;

    const { code, data } = await userModule.updateModule();

    const errors = data.errors;
    if (code === HTTP_CODE.SUCCESS) {
      struct.setOriginStructs(JSON.parse(JSON.stringify(structs)));
      fetchDetailModule();
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
      } else {
        toast.success('Save module success', {
          style: { top: '3.5em' },
        });
      }
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
