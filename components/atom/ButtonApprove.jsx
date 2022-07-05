import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { LoadingButton } from '@mui/lab';
import AppConfig from '@/config/constant/appConfig';
import { useApprove } from '@/hooks/useInteractContract';
import ConnectWallet from './ButtonConnectWallet';

const ApproveButton = ({ setAllowance }) => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const contractState = useSelector((state) => state.contract);
  const { onApprove } = useApprove(contractState.mainContract, contractState.useContract, AppConfig.maxLimit);

  const handleApprove = useCallback(async () => {
    setLoading(true);
    try {
      await onApprove();
      toast.success('Approved Successfully !', {
        style: { top: '3.5em' },
      });
      setAllowance(true);
      setLoading(false);
    } catch (e) {
      console.error('error at approve: ', e, contractState.mainContract);
      toast.error((e.data || e).message);
      setLoading(false);
    }
  }, [onApprove]);
  if (!account) {
    return <ConnectWallet />;
  }
  return (
    <LoadingButton
      loading={loading}
      onClick={handleApprove}
      size="small"
      style={{ height: 50, width: 200 }}
      color="success"
      variant="contained"
      sx={{ mt: { xs: 2, md: 0 }, width: { xs: '100%', md: 'auto' } }}>
      Approve
    </LoadingButton>
  );
};

export default ApproveButton;
