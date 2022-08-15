import React, { useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import CreateFunctionModal from './CreateFunctionModal';

const CreateFunction = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <PrimaryButton width="68px" padding="5px 0px" fontSize="12px" onClick={handleOpen}>
        Create
      </PrimaryButton>
      <CreateFunctionModal open={open} onClose={handleClose} />
    </>
  );
};

export default CreateFunction;
