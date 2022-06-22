import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';
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
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
  boxShadow: 24,
  padding: '35px 35px',
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E1E1E1' : '#E1E1E1',
  fontSize: 22,
  fontWeight: 600,
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Parameters</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon sx={{ fontSize: 25, color: '#fff' }} />
            </CloseButton>
          </div>
          <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="500px" autoHide>
            <div style={{ padding: '0px 20px' }}>
              {parameters.map((parameter) => {
                const { label, type, _id } = parameter;
                const _label = `${label}(${type})`;
                // const _name = label.toLowerCase();
                // const _type = type.includes('uint') ? 'number' : 'text';
                return (
                  <InputWrapper key={_id}>
                    <Input
                      // type={_type}
                      label={_label}
                      id={_id}
                      name={label}
                      isRequired={true}
                      onChange={handleParametersChange}
                    />
                  </InputWrapper>
                );
              })}
              {/* <InputWrapper>
                <Input
                  label="owner(address)"
                  id="owner"
                  name="owner"
                  isRequired={true}
                  // value={owner}
                  onchange={handleParametersChange}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="owner1(address)"
                  id="owner1"
                  name="owner1"
                  isRequired={true}
                  // value={owner}
                  onchange={handleParametersChange}
                />
              </InputWrapper> */}
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
