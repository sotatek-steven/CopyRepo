import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TabsBar from 'components/layout/TabsBar';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '@/components/layout/PageLayout';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BusinessDomain from '@/components/BusinessDomain/BusinessDomain';
import ListSmartContract from '@/components/ListSmartContract/ListSmartContract';
import { useDispatch, useSelector } from 'react-redux';
import TemplateDialogDefi from '@/components/Dialog/TemplateDialogDefi';
import TemplateDialogNFT from '@/components/Dialog/TemplateDialogNFT';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const TabPanelCustom = styled(TabPanel)(({ theme }) => ({
  ...theme.mixins.toolbar,
  paddingBottom: 0,
  paddingLeft: '8px',
  fontSize: '16px',
}));

const MemoizedSubComponent = React.memo(ListSmartContract);

const Dashboard = () => {
  const { userContract } = useDispatch();
  const userContractState = useSelector((state) => state.userContract);
  const userState = useSelector((state) => state.player);
  const [value, setValue] = useState('All');
  const [openCreate, setOpenCreate] = useState(false);
  const [openListDefi, setOpenListDefi] = useState(false);
  const [openListNFT, setOpenListNFT] = useState(false);
  const [expand, setExpand] = useState(false);
  const [keywords, setKeywords] = useState(null);

  const handleSearch = () => {
    console.log(keywords);
  };

  return (
    <Box
      sx={{
        padding: '20px 24px 0 24px',
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TabsBar setTab={setValue} tab={value} />

        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, mx: 2 }}>
          <Box>
            <TextField
              sx={{
                width: expand ? '200px' : '0',
                display: expand ? 'block' : 'none',
                transition: 'width .4s ease-in-out',
              }}
              type="search"
              size="small"
              fullWidth
              onChange={(e) => setKeywords(e.target.value)}
              InputProps={{
                endAdornment: expand ? (
                  <SearchIcon onClick={handleSearch} sx={{ color: '#F07D60', cursor: 'pointer' }} />
                ) : null,
              }}
            />
          </Box>
          {!expand ? (
            <SearchIcon onClick={() => setExpand(!expand)} sx={{ color: '#F07D60', cursor: 'pointer' }} />
          ) : (
            <ArrowForwardIosIcon
              size="small"
              onClick={() => setExpand(!expand)}
              sx={{ color: '#F07D60', cursor: 'pointer', fontSize: '17px', mx: 1 }}
            />
          )}

          <Box sx={{ pl: 3, pr: 1 }}>
            <Button
              sx={{ color: '#2E2E30' }}
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon sx={{ color: '#2E2E30' }} />}
              onClick={() => setOpenCreate(true)}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <TabContext value={value}>
        <TabPanelCustom value="All">
          <MemoizedSubComponent status="all" handleSearch={() => handleSearch(keywords)} />
        </TabPanelCustom>
        <TabPanelCustom value="Drafts">
          <MemoizedSubComponent status="drafts" />
        </TabPanelCustom>
        <TabPanelCustom value="Deployed" status="deployed">
          <MemoizedSubComponent />
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
            <Grid item xs={6}>
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
                return (
                  <BusinessDomain
                    setOpenListDefi={setOpenListDefi}
                    setOpenListNFT={setOpenListNFT}
                    setOpenCreate={setOpenCreate}
                    key={item.id}
                    data={item}></BusinessDomain>
                );
              })}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <TemplateDialogDefi openListDefi={openListDefi} setOpenListDefi={setOpenListDefi} />
      <TemplateDialogNFT openListNFT={openListNFT} setOpenListNFT={setOpenListNFT} />
    </Box>
  );
};

export default Dashboard;
Dashboard.PageLayout = Layout;
