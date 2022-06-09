import {
  Card,
  CardContent,
  Container,
  Toolbar,
} from '@mui/material';
import Head from 'next/head';
import { useEagerConnect, useInactiveListener } from '@/hooks/hooks';
import Navbar from './NavBar';
import useUserActive from '@/hooks/useUserActive';

function Layout(props) {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  useUserActive();
  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Navbar />
      <Container disableGutters maxWidth="xl">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              height: '100%',
              mt: 1,
              overflow: 'auto',
              bgcolor: '#1c1c1c',
            }}
          >
            <CardContent
              sx={{
                p: { xs: 0, md: 2 },
                mt: { xs: 2, md: 0 },
              }}
              style={{ height: 'calc(100vh - 110px)' }}
            >
              {props.children}
            </CardContent>
          </Card>
        </Toolbar>
      </Container>
    </>
  );
}

export default Layout;
