import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { injected, walletconnect } from '@/hooks/connectors';
import { truncateAddress } from '@/utils/string';

const ConnectWallet = () => {
  const { account, active, activate, deactivate, library } = useWeb3React();
  const { player } = useDispatch();
  const playerState = useSelector((state) => state.player);
  const [open, setOpen] = React.useState(false);
  const [requestLogin, setRequestLogin] = useState(false);
  const [signed, setSigned] = useState(false);
  const theme = useTheme();

  const connectWallet = async (type) => {
    setOpen(false);
    if (type === 'metamask') {
      await activate(injected);
      setRequestLogin(true);
    }
    if (type === 'wallet-connect') {
      activate(walletconnect);
    }
  };
  useEffect(async () => {
    if (!active || !requestLogin || !account || !library) {
      return;
    }
    if (playerState.playerAuth?.owner?.toLowerCase() == account.toLowerCase()) {
      return;
    }
    const rs = await player.login({ account, library });
    if (!rs) {
      deactivate();
      localStorage?.removeItem('playerAuth');
    }
  }, [requestLogin, account, library, active]);

  useEffect(() => {
    setSigned(
      playerState.playerAuth?.owner && account && playerState.playerAuth?.owner.toLowerCase() == account.toLowerCase()
    );
  }, [playerState.playerAuth?.token, account]);

  const disconnectWallet = async () => {
    deactivate();
    localStorage?.removeItem('playerAuth');
    await player.logout();
  };

  return (
    <Box>
      {signed ? (
        <Tooltip title="Disconnect">
          <Button onClick={() => disconnectWallet()} startIcon={<AccountBalanceWalletIcon />} variant="text">
            <Typography sx={{ cursor: 'pointer' }} variant="body2">
              {truncateAddress(account || 'No Account')}
            </Typography>
          </Button>
        </Tooltip>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          sx={{ my: 1, background: `${theme.palette.background.light}!important`, borderRadius: '30px' }}>
          Connect Wallet
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle sx={{ textAlign: 'center', mb: 2 }} id="responsive-dialog-title">
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
              md={6}>
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
              md={6}>
              <img width={50} style={{ marginBottom: 10 }} src="/static/assets/img/wallet/wallet-connect.svg" />
              <Typography variant="body2" textAlign={'center'} noWrap mt={2} fontWeight={600}>
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
