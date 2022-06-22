import { AppBar, Toolbar, Container, Box, Typography } from '@mui/material';

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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ marginLeft: '56px' }}>
        <Container disableGutters maxWidth="xl">
          <Toolbar sx={{ flexWrap: 'wrap', height: '76px' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft: '60px' } }}>
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
                    }}>
                    <Typography
                      sx={{
                        mx: 1,
                        mt: 0.5,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontSize: '22px',
                      }}
                      variant="body2"
                      fontWeight={600}>
                      Smart Contracts
                    </Typography>
                  </Box>
                </Box>
              </nav>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
              <ButtonConnectWallet />
            </Box>
            <MobileMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
