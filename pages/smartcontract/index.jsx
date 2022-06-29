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
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TabsBar from 'components/layout/TabsBar';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '@/components/layout/PageLayout';
import CloseIcon from '../../assets/icon/close-circle.svg';
import BusinessDomain from '@/components/BusinessDomain/BusinessDomain';
import ListSmartContract from '@/components/ListSmartContract/ListSmartContract';
import { useDispatch, useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TemplateDialog from '@/components/Dialog/TemplateDialog';
import _ from 'lodash';

const TabPanelCustom = styled(TabPanel)(({ theme }) => ({
  ...theme.mixins.toolbar,
  paddingBottom: 0,
  paddingLeft: '8px',
  fontSize: '16px',
}));

const MemoizedSubComponent = React.memo(ListSmartContract);

const Dashboard = () => {
  const { template, userContract } = useDispatch();
  const userContractState = useSelector((state) => state.userContract);
  const userState = useSelector((state) => state.player);
  const [value, setValue] = useState('All');
  const [openCreate, setOpenCreate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [keywords, setKeywords] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const { listDomain } = useSelector((state) => state.template);
  const theme = useTheme();

  const handleSearch = () => {
    console.log(keywords);
  };

  useEffect(() => {
    if (!openCreate) return;
    template.getTemplateDomain({ size: -1 });
  }, [template, openCreate]);

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
                  <SearchIcon onClick={handleSearch} sx={{ color: theme.palette.primary.main, cursor: 'pointer' }} />
                ) : null,
              }}
            />
          </Box>
          {!expand ? (
            <SearchIcon
              onClick={() => setExpand(!expand)}
              sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
            />
          ) : (
            <ArrowForwardIosIcon
              size="small"
              onClick={() => setExpand(!expand)}
              sx={{ color: theme.palette.primary.main, cursor: 'pointer', fontSize: '17px', mx: 1 }}
            />
          )}

          <Box sx={{ pl: 3, pr: 1 }}>
            <Button
              sx={{ color: theme.palette.primary.contrastText, fontWeight: 600, fontSize: '14px' }}
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon sx={{ color: theme.palette.background.dark }} />}
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
            <Typography sx={{ fontSize: '14px', py: 1, fontFamily: 'Segoe UI' }}>
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
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ borderTop: '1px solid #8C8C8C' }}>
            <Grid item xs={6}>
              <Box sx={{ width: '589px', height: '548px', background: theme.palette.background.default }}></Box>
            </Grid>
            <Grid
              sx={{
                '&:hover': { opacity: 0.7 },
                paddingLeft: '70px',
              }}
              item
              xs={6}>
              <Typography sx={{ fontSize: '14px', py: 1, fontFamily: 'Segoe UI' }}>
                Choose the business domain that you are creating for this smart contract
              </Typography>
              {_.isArray(listDomain) &&
                listDomain.map((item) => {
                  return (
                    <BusinessDomain
                      setOpen={setOpen}
                      setType={setType}
                      setOpenCreate={setOpenCreate}
                      key={item._id}
                      data={item}></BusinessDomain>
                  );
                })}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <TemplateDialog open={open} setOpen={setOpen} type={type}></TemplateDialog>
    </Box>
  );
};

export default Dashboard;
Dashboard.PageLayout = Layout;
