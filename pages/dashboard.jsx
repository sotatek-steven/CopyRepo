import { Box, Button, Grid, Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TabsBar from 'components/layout/TabsBar';
import { TabContext, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '@/components/layout/PageLayout';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BusinessDomain from '@/components/BusinessDomain/BusinessDomain';
import AllSmartContract from '@/components/AllSmartContract/AllSmartContract';
import TemplateItem from '@/components/TemplateItem/TemplateItem';
import ListSmartContract from '@/components/ListSmartContract/ListSmartContract';
import { useDispatch, useSelector } from 'react-redux';

const businessData = [
  {
    id: 1,
    domain: 'Defi',
    name: 'Disbursement Flow 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in... ',
    status: 'deployed',
    lastModified: Date.now(),
  },
  {
    id: 2,
    domain: 'NFT',
    name: 'Disbursement Flow 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in... ',
    status: 'draft',
    lastModified: Date.now(),
  },
  {
    id: 3,
    domain: 'NFT',
    name: 'Disbursement Flow 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in... ',
    status: 'draft',
    lastModified: Date.now(),
  },
  {
    id: 4,
    domain: 'NFT',
    name: 'Disbursement Flow 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in... ',
    status: 'draft',
    lastModified: Date.now(),
  },
];

const dataCreate = [
  {
    id: 1,
    name: 'Defi',
    description:
      'A smart contract is a computer program or transaction protocol which is intended to automatically execute.',
  },
  {
    id: 2,
    name: 'NFT',
    description:
      'A smart contract is a computer program or transaction protocol which is intended to automatically execute.',
  },
];

const Dashboard = () => {
  const { userContract } = useDispatch();
  const userContractState = useSelector((state) => state.userContract);
  const [value, setValue] = useState('All');
  const [openCreate, setOpenCreate] = useState(false);

  const TabPanelCustom = styled(TabPanel)(({ theme }) => ({
    ...theme.mixins.toolbar,
    paddingBottom: 0,
    paddingLeft: '8px',
  }));

  useEffect(() => {
    userContract.getAllUserContracts();
    userContract.getUserContractDraff();
    userContract.getUserContractDeployed();
  }, []);

  return (
    <Box
      sx={{
        padding: '20px 24px 0 24px',
        overflow: 'hidden',
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TabsBar setTab={setValue} tab={value} />
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
          <SearchIcon sx={{ color: '#F07D60' }} />
          <Box sx={{ pl: 3 }}>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => setOpenCreate(true)}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <TabContext value={value}>
        <TabPanelCustom value="All">
          <ListSmartContract data={userContractState?.listUserContract} />
        </TabPanelCustom>
        <TabPanelCustom value="Drafts">
          <ListSmartContract data={userContractState?.listUserContractDraff} />
        </TabPanelCustom>
        <TabPanelCustom value="Deployed">
          <ListSmartContract data={userContractState?.listUserContractDeployed} />
        </TabPanelCustom>
      </TabContext>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle sx={{ textAlign: 'left', mb: 2 }} id="responsive-dialog-title">
          <Box>
            <Typography sx={{ fontSize: '22px' }}>Create Smart Contract</Typography>
            <Typography sx={{ fontSize: '12px', py: 1 }}>
              Please go through the following questionnaire and identify the appropriate match for your requirement.
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => setOpenCreate(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary.contrastText,
            }}>
            <CancelOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ borderTop: '1px solid #8C8C8C' }}>
            <Grid xs={6}>
              <Box sx={{ width: '589px', height: '548px', background: '#3D3D3E' }}></Box>
            </Grid>
            <Grid
              sx={{
                '&:hover': { opacity: 0.7 },
                paddingLeft: '70px',
              }}
              item
              xs={6}>
              <Typography sx={{ fontSize: '12px', py: 1 }}>
                Choose the business domain that you are creating for this smart contract
              </Typography>
              {dataCreate.map((item) => {
                return <BusinessDomain key={item.id} data={item}></BusinessDomain>;
              })}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
Dashboard.PageLayout = Layout;
