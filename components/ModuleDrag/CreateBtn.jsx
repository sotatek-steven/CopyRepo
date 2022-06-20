import React from 'react';
import { PrimaryButton } from '../ButtonStyle';

const CreateButton = ({handleOpen}) => {

    return (
        <PrimaryButton width="70px" onClick={handleOpen}>Create</PrimaryButton>
    )
};

export default CreateButton;