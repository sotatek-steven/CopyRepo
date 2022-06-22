import React from 'react';
import { PrimaryButton } from '../ButtonStyle';

const CreateButton = ({ handleOpen }) => {
  return (
    <PrimaryButton width="68px" padding="5px 0px" fontSize="12px" onClick={handleOpen}>
      Create
    </PrimaryButton>
  );
};

export default CreateButton;
