import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
} from '@mui/material';

import StorefrontIcon from '@mui/icons-material/Storefront';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSelector } from 'react-redux';

import MobileMenu from './MobileMenu';
import ButtonConnectWallet from '../atom/ButtonConnectWallet';
import MoreMenu from './MoreMenu';

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const playerState = useSelector((state) => state.player);
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container sx={{ mt: 1 }} disableGutters maxWidth="xl">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <NextLink href={'/'}>
            <img
              style={{ width: 50, cursor: 'pointer' }}
              src="/static/assets/img/home/logo-main.png"
              alt="logo"
              loading="lazy"
            />
          </NextLink>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <nav>
              <Box display={'flex'}>
                <Box
                  onClick={() => router.push('/')}
                  display={'flex'}
                  alignItems={'center'}
                  ml={4}
                  sx={{
                    ':hover': { color: 'orange' },
                    color: pathname === '/' ? '#E1E1E1' : '',
                  }}
                >
                  <Typography
                    sx={{
                      mx: 1,
                      mt: 0.5,
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                    variant="body2"
                    fontWeight={600}
                  >
                   Smart Contracts
                  </Typography>
                </Box>
              </Box>
            </nav>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'none', md: 'flex' } }}
            alignItems={'center'}
          >
            <ButtonConnectWallet />
          </Box>
          <MobileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
