import React, { useState, useEffect } from 'react';
import BurgerMenu from './BurgerMenu';
import PhaseNavigation from './PhaseNavigation';
import ExitButton from './ExitButton';
import SaveContractButton from './SaveContractButton';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import EditInfoContractModal from '../EditInfoContractModal';
import { PrimaryButton } from '../ButtonStyle';
import DeployContractModal from './DeployContractModal';
import ConfirmModal from './ConfirmModal';
import ContractDeployedAlert from '../Dialog/ContractDeployedAlert';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import SavingScreen from '../Saving';
const NavbarContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0px',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const RightSide = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
  alignItems: 'center',
  padding: '0 27px',
}));

const DesignSmartContractNav = () => {
  const contractState = useSelector((state) => state.contract);
  const { contract } = useDispatch();
  const [loading, setLoading] = useState(false);
  const [infoContractModalOpen, setInfoContractModalOpen] = useState(false);
  const [deployContractModalOpen, setDeployContractModalOpen] = useState(false);
  const [confirmDeployModalOpen, setConfirmDeployModalOpen] = useState(false);
  const [contractDeployedAlertOpen, setContractDeployedAlertOpen] = useState(false);
  const { account, library } = useWeb3React();
  const handleInfoContractModalClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setInfoContractModalOpen(false);
  };

  useEffect(() => {
    if (contractState.status === 'init') {
      setInfoContractModalOpen(true);
    }
  }, [contractState.status]);

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
  }

  const deployed = () => {
    setLoading(false);
    setConfirmDeployModalOpen(false);
    setContractDeployedAlertOpen(true);
  }

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
    if (!account || !library || !contractState.abi || !contractState.bytecode) {
      return;
    }
    const signer = await library.getSigner(account);
    await contract.deployContract({ signer, deploying, deployed });
  };

  return (
    <>
      <NavbarContainer>
        <BurgerMenu contractName={contractState.name || 'New Contract'} />
        <PhaseNavigation />
        <RightSide>
          <PrimaryButton onClick={() => setInfoContractModalOpen(true)}>Edit Info</PrimaryButton>
          <PrimaryButton onClick={() => setDeployContractModalOpen(true)}>Next</PrimaryButton>
          <SaveContractButton />
          <ExitButton />
        </RightSide>
      </NavbarContainer>

      <EditInfoContractModal
        open={infoContractModalOpen}
        onClose={handleInfoContractModalClose}
        nameValue={contractState.name}
        data={contractState}
      />
      <DeployContractModal
        open={deployContractModalOpen}
        onClose={handleDeployContractModalClose}
        onDeploy={handleDeployContract}
      />
      <ConfirmModal open={confirmDeployModalOpen} onClose={handleConfirmDeployModalClose} onAgree={handleAgreeDeploy} />

      <ContractDeployedAlert
        txHash={contractState.transaction}
        address={contractState.address}
        open={contractDeployedAlertOpen}
        onClose={handleContractDeployedAlertClose}
      />
      {loading && <SavingScreen title='Loading' />}
    </>
  );
};

export default DesignSmartContractNav;
