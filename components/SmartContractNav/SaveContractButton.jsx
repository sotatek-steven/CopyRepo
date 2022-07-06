import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import Stack from '@mui/material/Stack';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import { PrimaryButton } from '../ButtonStyle';
import SavingScreen from '../Saving';
import WarningIcon from 'assets/icon/warning.svg';
import Scrollbars from 'react-custom-scrollbars';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    customToast: {
      padding: 0,
    },
  };
});

const SaveContractButton = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const contractStore = useSelector((state) => state.contract);
  const { contract } = useDispatch();

  const saveContract = async () => {
    setLoading(true);
    const { code, message } = await contract.updateContract();
    setLoading(false);
    if (code == 200) {
      if (contractStore.current.errors.length > 0) {
        toast(
          <>
            <Box sx={{ fontSize: '14px' }}>
              <Box
                sx={{
                  height: '39px',
                  backgroundColor: theme.palette.primary.light,
                  padding: '0',
                }}>
                <Box sx={{ paddingLeft: '30px', display: 'flex', py: 1.5 }}>
                  <WarningIcon />
                  <Typography sx={{ fontWeight: '600', color: theme.palette.primary.red1, padding: '0 20px' }}>
                    Errors
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ backgroundColor: theme.palette.background.dark }}>
                <List>
                  <Scrollbars
                    style={{
                      height: '151px',
                      overflowX: 'hidden',
                    }}>
                    {contractStore.current.errors.map((item, index) => (
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemText
                            primary={item.message}
                            sx={{ borderBottom: `1px solid ${theme.palette.primary.grey1} ` }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Scrollbars>
                </List>
              </Box>
            </Box>
          </>,
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            bodyClassName: classes.customToast,
            style: {
              width: '457px',
              right: '50%',
              padding: 0,
              background: theme.palette.background.dark,
            },
          }
        );
      } else
        toast.success('Save contract success', {
          style: { top: '3.5em' },
        });
      // contractStore.current.gasFee &&
      //   toast(`GAS FEE OF THIS SMART CONTRACT: ${contractStore.current.gasFee}`, {
      //     position: 'bottom-right',
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     closeButton: false,
      //     style: {
      // background: theme.palette.primary.light,
      // borderLeft: `4px solid ${theme.palette.primary.light2} `,
      // width: '444px',
      // right: '110px',
      //     },
      //   });
      return;
    }
    toast.error('saving contract failed!', message);
    // setOpen(true);
  };

  // const [open, setOpen] = React.useState(false);

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <>
      <PrimaryButton width="130px" onClick={saveContract}>
        Save Contract
      </PrimaryButton>
      {loading && <SavingScreen />}

      {/* <Stack sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose}>
                        Failed to save smart contract!
                    </Alert>
                </Snackbar>
            </Stack> */}
    </>
  );
};

export default SaveContractButton;
