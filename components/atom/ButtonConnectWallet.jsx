import React from 'react';
import { useWeb3React } from '@web3-react/core';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { injected, walletconnect } from '@/hooks/connectors';
import { truncateAddress } from '@/utils/string';
import networks from '@/config/constant/networks';

const ConnectWallet = () => {
  const {
    account,
    activate,
    deactivate,
  } = useWeb3React();
  const { player } = useDispatch();
  const playerState = useSelector((state) => state.player);
  const [open, setOpen] = React.useState(false);
  const [openSwitchNetwork, setOpenSwitchNetwork] = React.useState(false);

  const changeNetwork = async ({ params }) => {
    try {
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
      setOpenSwitchNetwork(false);
    } catch (err) {
      debugger
      toast.error(err.message);
    }
  };

  const connectWallet = async (type) => {
    setOpen(false);
    if (type === 'metamask') {
      changeNetwork({ params: networks[process.env.NEXT_PUBLIC_NETWORK_BINANCE] });
      setOpenSwitchNetwork(false);
    }
    if (type === 'wallet-connect') {
      activate(walletconnect);
    }
  };

  const disconnectWallet = async () => {
    deactivate();
    // await player.logout();
  };
  return (
    <Box>
      {!account? (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          sx={{ my: 1 }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Tooltip title="Disconnect">
          <Button
            onClick={() => disconnectWallet()}
            startIcon={<AccountBalanceWalletIcon />}
            variant="text"
          >
            <Typography sx={{ cursor: 'pointer' }} variant="body2">
              {truncateAddress(account || 'No Account')}
            </Typography>
          </Button>
        </Tooltip>
      )}
      <Dialog
        open={openSwitchNetwork}
        onClose={() => setOpenSwitchNetwork(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{ textAlign: 'center', mb: 2 }}
          id="responsive-dialog-title"
        >
          {'Force network'}
        </DialogTitle>
        <DialogContent>
          <Grid p={2} alignItems={'flex-end'} container spacing={4}>
            <Grid
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ '&:hover': { opacity: 0.7 }, cursor: 'pointer' }}
              onClick={
                () => changeNetwork({ params: networks[process.env.NEXT_PUBLIC_NETWORK_POLYGON] })
              }
              item
              xs={12}
              md={6}
            >
              <img height={40} src="/static/assets/img/wallet/polygon.svg" />
              <Typography mt={2} variant="body2" fontWeight={600}>
                Polygon
              </Typography>
            </Grid>
            <Grid
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ '&:hover': { opacity: 0.7 }, cursor: 'pointer' }}
              onClick={
                () => changeNetwork({ params: networks[process.env.NEXT_PUBLIC_NETWORK_BINANCE] })
              }
              item
              xs={12}
              md={6}
            >
              <img
                height={30}
                style={{ marginBottom: 10 }}
                src="/static/assets/img/wallet/binance.svg"
              />
              <Typography
                variant="body2"
                textAlign={'center'}
                noWrap
                mt={2}
                fontWeight={600}
              >
                Binance
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{ textAlign: 'center', mb: 2 }}
          id="responsive-dialog-title"
        >
          {'Connect Wallet'}
        </DialogTitle>
        <DialogContent>
          <Grid p={2} alignItems={'flex-end'} container spacing={4}>
            <Grid
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ '&:hover': { opacity: 0.7 }, cursor: 'pointer' }}
              onClick={() => connectWallet('metamask')}
              item
              xs={12}
              md={6}
            >
              <img width={48} src="/static/assets/img/wallet/metamask.svg" />
              <Typography mt={2} variant="body2" fontWeight={600}>
                Metamask
              </Typography>
            </Grid>
            <Grid
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              sx={{ '&:hover': { opacity: 0.7 }, cursor: 'pointer' }}
              onClick={() => connectWallet('wallet-connect')}
              item
              xs={12}
              md={6}
            >
              <img
                width={50}
                style={{ marginBottom: 10 }}
                src="/static/assets/img/wallet/wallet-connect.svg"
              />
              <Typography
                variant="body2"
                textAlign={'center'}
                noWrap
                mt={2}
                fontWeight={600}
              >
                Wallet Connect
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ConnectWallet;
