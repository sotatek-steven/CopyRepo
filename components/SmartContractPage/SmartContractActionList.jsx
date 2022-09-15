import { Button, SvgIcon, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RightArrowIcon from 'assets/icon/right-arrow.svg';
import XButton from 'assets/icon/xbutton.svg';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../atom/Dialog/ConfirmDialog';
import { PrimaryButton } from '../ButtonStyle';
import ContractDeployedAlert from '../Dialog/ContractDeployedAlert';
import EditInfoContractModal from '../EditInfoContractModal';
import SavingScreen from '../Saving';
import DeployContractModal from '../SmartContractNav/DeployContractModal';
import ExitButton from '../SmartContractNav/ExitButton';
import SaveContractButton from '../SmartContractNav/SaveContractButton';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, styled } from '@mui/system';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const Container = styled('div')(() => ({
  display: 'flex',
  gap: '23px',
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': { opacity: 0.7 },
}));

const SmartContractActionList = () => {
  const contractState = useSelector((state) => state.contract);
  const { contract } = useDispatch();
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  // const [infoContractModalOpen, setInfoContractModalOpen] = useState(false);
  const [deployContractModalOpen, setDeployContractModalOpen] = useState(false);
  const [confirmDeployModalOpen, setConfirmDeployModalOpen] = useState(false);
  const [contractDeployedAlertOpen, setContractDeployedAlertOpen] = useState(false);
  const handleInfoContractModalClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    contract.setInfoContractModalOpen(false);
  };

  useEffect(() => {
    contract.setInfoContractModalOpen(contractState.current.status === 'init');
    setContractDeployedAlertOpen(contractState.current.status === 'deployed');
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

  const saveContract = async () => {
    contractState.current.status !== 'deployed' && (await contract.updateContract());
    route.push('/');
  };
  return (
    <>
      <Container>
        {contractState.current.status !== 'deployed' && (
          <>
            <ButtonBox onClick={() => setDeployContractModalOpen(true)}>
              <RightArrowIcon />
            </ButtonBox>
            <SaveContractButton />
          </>
        )}
        <ButtonBox onClick={saveContract}>
          <XButton />
        </ButtonBox>
        {/* <ExitButton /> */}
      </Container>

      <EditInfoContractModal
        open={contractState.infoContractModalOpen}
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

      {contractDeployedAlertOpen && (
        <ContractDeployedAlert txHash={contractState.current.hash} address={contractState.current.address} />
      )}
      {loading && <SavingScreen title="Loading" />}
    </>
  );
};

export default SmartContractActionList;
