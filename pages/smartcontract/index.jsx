import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  useTheme,
  InputBase,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '@/components/layout/PageLayout';
import CloseIcon from '../../assets/icon/close-circle.svg';
import BusinessDomain from '@/components/BusinessDomain/BusinessDomain';
import ListSmartContract from '@/components/ListSmartContract/ListSmartContract';
import { useDispatch, useSelector } from 'react-redux';
import TemplateDialog from '@/components/Dialog/TemplateDialog';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import Tabs from '@/components/Tabs';
import Image from 'next/image';
import panaImage from '@/assets/images/steps-pana.png';
import DefiIcon from '../../assets/icon/defiIcon.svg';
import NFTIcon from '../../assets/icon/NFTIcon.svg';
import { useMemo } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  '& .Mui-focused': {
    '& .xIcon': {
      display: 'inherit',
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',

  '& .xIcon': {
    display: 'none',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // height: '36px',
    [theme.breakpoints.up('sm')]: {
      width: '0',

      '&:focus': {
        width: '208px',
        borderRadius: '20px',
        background: '#2E2E30',
      },
    },
  },
}));

const TabWrapper = styled('div')(() => ({
  position: 'relative',
  flexGrow: 1,
}));

const MemoizedSubComponent = React.memo(ListSmartContract);

const tabs = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'drafts',
    label: 'Drafts',
  },
  {
    id: 'deployed',
    label: 'Deployed',
  },
];

const Dashboard = () => {
  const { template, userContract } = useDispatch();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openCreate, setOpenCreate] = useState(false);
  const [keywords, setKeywords] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const { listDomain } = useSelector((state) => state.template);
  const theme = useTheme();

  const domains = useMemo(() => {
    if (!listDomain) return [];
    return listDomain.map((domain) => {
      let icon;
      const { name } = domain;
      switch (name) {
        case 'Defi':
          icon = <DefiIcon />;
          break;
        case 'NFT':
          icon = <NFTIcon />;
          break;
        default:
          icon = 'N';
      }

      return {
        ...domain,
        icon,
      };
    });
  }, [listDomain]);

  const onEnter = (e) => {
    if (e.keyCode == 13) {
      keywords && userContract.changeKeywordsSearch(keywords.trim());
    }
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TabWrapper>
          <Tabs
            initialTabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabStyle={{ padding: '0px 25px' }}
          />
        </TabWrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, mx: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#F07D60', zIndex: 2 }} />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={onEnter}
              type="search"
              placeholder="Search Smart Contract"
            />
          </Search>
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

      <MemoizedSubComponent status={activeTab.id} />
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
          <Grid container sx={{ borderTop: '1px solid', borderColor: theme.shape.borderColor }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '589px',
                  height: '548px',
                  background: theme.palette.background.default,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image src={panaImage} alt="me" width="311" height="311" />
              </Box>
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
              {_.isArray(domains) &&
                domains.map((item) => {
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
