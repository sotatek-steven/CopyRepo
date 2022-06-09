import React from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Box,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { injected } from '@/hooks/connectors';
import networks from '@/config/constant/networks';

const SwitchNetwork = ({ type }) => {
  const { activate } = useWeb3React();

  const changeNetwork = async () => {
    try {
      let paramName = '';
      switch (String(type).toLowerCase()) {
        case 'binance':
          paramName = process.env.NEXT_PUBLIC_NETWORK_BINANCE;
          break;
        case 'polygon':
          paramName = process.env.NEXT_PUBLIC_NETWORK_POLYGON;
          break;
        default:
          break;
      }
      const params = networks[paramName];
      if (!params) {
        throw new Error('No network found');
      }
      if (!window.ethereum) {
        throw new Error('No crypto wallet found');
      }

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...params,
          },
        ],
      });
      await activate(injected);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Box>
      <Button
        onClick={() => changeNetwork()}
        variant="contained"
        // startIcon={<AccountBalanceWalletIcon />}
        sx={{ my: 1 }}
      >
        {`Switch ${type}`}
      </Button>
    </Box>
  );
};

export default SwitchNetwork;
