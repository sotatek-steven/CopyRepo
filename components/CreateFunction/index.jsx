import { INITIAL_FUNCTION_DATA } from '@/store/models/functionDefinition';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../ButtonStyle';
import InfoFunctionModal from './InfoFunctionModal';

const CreateFunction = () => {
  const functionDefinitionState = useSelector((state) => state.functionDefinition);
  const moduleState = useSelector((state) => state.userModule);
  const { functionDefinition, userFunction } = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    functionDefinition.update(INITIAL_FUNCTION_DATA);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanleSubmit = async () => {
    const dataTransferApi = await functionDefinition.convertToDataTransferApi({ ...functionDefinitionState });
    const { data } = await userFunction.createFunction(dataTransferApi);
    const { _id } = data;
    router.push(`/modules/${moduleState._id}/${_id}`);
  };

  return (
    <>
      <PrimaryButton width="68px" padding="5px 0px" fontSize="12px" onClick={handleOpen}>
        Create
      </PrimaryButton>
      <InfoFunctionModal open={open} onClose={handleClose} onCancel={handleClose} onSubmit={hanleSubmit} />
    </>
  );
};

export default CreateFunction;
