import { styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../atom/Dialog/ConfirmDialog';
import { PrimaryButton } from '../ButtonStyle';
import ContractDeployedAlert from '../Dialog/ContractDeployedAlert';
import EditInfoContractModal from '../EditInfoContractModal';
import SavingScreen from '../Saving';
import DeployContractModal from '../SmartContractNav/DeployContractModal';
import ExitButton from '../SmartContractNav/ExitButton';
import SaveContractButton from '../SmartContractNav/SaveContractButton';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const SmartContractActionList = () => {
  const contractState = useSelector((state) => state.contract);
  const { contract } = useDispatch();
  const [loading, setLoading] = useState(false);

  const [infoContractModalOpen, setInfoContractModalOpen] = useState(false);
  const [deployContractModalOpen, setDeployContractModalOpen] = useState(false);
  const [confirmDeployModalOpen, setConfirmDeployModalOpen] = useState(false);
  const [contractDeployedAlertOpen, setContractDeployedAlertOpen] = useState(false);
  const handleInfoContractModalClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setInfoContractModalOpen(false);
  };

  useEffect(() => {
    setInfoContractModalOpen(contractState.current.status === 'init');
  }, [contractState.current.status]);

  const handleDeployContractModalClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setDeployContractModalOpen(false);
  };

  const handleDeployContract = () => {
    setConfirmDeployModalOpen(true);
    setDeployContractModalOpen(false);
  };

  const deploying = () => {
    setLoading(true);
  };

  const deployed = () => {
    setLoading(false);
    setConfirmDeployModalOpen(false);
    setContractDeployedAlertOpen(true);
  };

  const handleConfirmDeployModalClose = () => {
    setConfirmDeployModalOpen(false);
    /**
     * loading screen
     * update contract to server and show ContractDeployedAlert
     */
    // setContractDeployedAlertOpen(true);
  };

  const handleContractDeployedAlertClose = () => {
    setContractDeployedAlertOpen(false);
  };

  const handleAgreeDeploy = async () => {
    if (!account || !library || !contractState.current.abi || !contractState.current.bytecode) {
      return;
    }
    const signer = await library.getSigner(account);
    await contract.deployContract({ signer, deploying, deployed });
  };
  return (
    <>
      <Container>
        <PrimaryButton onClick={() => setInfoContractModalOpen(true)}>Edit Info</PrimaryButton>
        {contractState.current.status !== 'deployed' && (
          <>
            <PrimaryButton onClick={() => setDeployContractModalOpen(true)}>Next</PrimaryButton>
            <SaveContractButton />
          </>
        )}
        <ExitButton />
      </Container>

      <EditInfoContractModal
        open={infoContractModalOpen}
        onClose={handleInfoContractModalClose}
        nameValue={contractState.current.name}
        data={contractState.current}
        readOnly={contractState.current.status === 'deployed'}
      />
      <DeployContractModal
        open={deployContractModalOpen}
        onClose={handleDeployContractModalClose}
        onDeploy={handleDeployContract}
      />
      <ConfirmDialog
        open={confirmDeployModalOpen}
        onClose={handleConfirmDeployModalClose}
        onAgree={handleAgreeDeploy}
        title="Confirm to deploy this Smart Contract"
      />

      <ContractDeployedAlert
        txHash={contractState.current.transaction}
        address={contractState.current.address}
        open={contractDeployedAlertOpen}
        onClose={handleContractDeployedAlertClose}
      />
      {loading && <SavingScreen title="Loading" />}
    </>
  );
};

export default SmartContractActionList;
