import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PrimaryButton, SecondaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import Scrollbars from 'react-custom-scrollbars';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

const Box = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.default,
  boxShadow: 24,
  padding: '35px 35px',
}));

const HeaderModal = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 25,
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 22,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: 30,
}));

const InputWrapper = styled('div')(() => ({
  marginBottom: 20,
}));

const CloseButton = styled('div')(({ theme }) => ({
  transition: 'all 0.2s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
  },
}));

const DeployContractModal = ({ open, onClose, onDeploy }) => {
  const { contract } = useDispatch();
  const contractState = useSelector((state) => state.contract);
  const [parameters, setParameters] = useState(contractState.parameters || []);

  const handleParametersChange = (e) => {
    const { value, name: label } = e.target;
    const updatedParameters = parameters.map((parameter) =>
      parameter.label === label ? { ...parameter, value } : parameter
    );
    console.log(updatedParameters);
    setParameters(updatedParameters);
  };

  const handleDeployContract = async () => {
    const _contractState = { ...contractState, parameters };
    contract.update(_contractState);
    if (!onDeploy) return;
    onDeploy();
  };

  useEffect(() => {
    setParameters(contractState.parameters || []);
  }, [contractState.parameters]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <HeaderModal>
            <Title>Parameters</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </HeaderModal>
          <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="500px" autoHide>
            <div style={{ padding: '0px 20px' }}>
              {parameters.map((parameter) => {
                const { label, type, _id } = parameter;
                const _label = `${label}(${type})`;
                return (
                  <InputWrapper key={_id}>
                    <Input label={_label} id={_id} name={label} isRequired={true} onChange={handleParametersChange} />
                  </InputWrapper>
                );
              })}
            </div>
          </Scrollbars>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '20px',
              marginTop: 30,
            }}>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleDeployContract}>Deploy</PrimaryButton>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeployContractModal;
