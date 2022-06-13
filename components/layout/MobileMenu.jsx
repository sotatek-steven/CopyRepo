import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import ButtonConnectWallet from 'components/atom/ButtonConnectWallet.jsx';
import { truncateAddress } from '@/utils/string';

const MobileMenu = () => {
  const { account } = useWeb3React();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const playerState = useSelector((state) => state.player);
  const router = useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
      <Box mt={0.5}>
        <ButtonConnectWallet />
      </Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {account ? (
          <MenuItem>
            <Tooltip title="Disconnect">
              <Typography sx={{ cursor: 'pointer' }}>
                {truncateAddress(account)}
              </Typography>
            </Tooltip>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => router.push('/inventory')}>
            <Typography textAlign="center">{'My Wallet'}</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => router.push('/')}>
          <Typography textAlign="center">{'Dashboard'}</Typography>
        </MenuItem>
        {/* {playerState.playerAuth?.email && (
          <MenuItem onClick={() => router.push('/inventory/settings')}>
            <Typography textAlign="center">{'Settings'}</Typography>
          </MenuItem>
        )} */}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
