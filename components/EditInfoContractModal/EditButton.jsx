import React from 'react';
import { PrimaryButton } from '../ButtonStyle';

const EditButton = ({ handleOpen }) => {
  return (
    <PrimaryButton width="130px" onClick={handleOpen}>
      Edit Info
    </PrimaryButton>
  );
};

export default EditButton;
