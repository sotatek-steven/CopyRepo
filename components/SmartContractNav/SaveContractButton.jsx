import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import Stack from '@mui/material/Stack';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import { PrimaryButton } from '../ButtonStyle';
import SavingScreen from '../Saving';

const useStyles = makeStyles(() => ({
  gasFeeToast: {
    background: '#E5C2B9 !important',
    borderLeft: '4px solid #FA6E6E !important',
    width: '444px',
    right: '115px',
  },
}));

const SaveContractButton = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const contractStore = useSelector((state) => state.contract);
  const { contract } = useDispatch();

  const saveContract = async () => {
    setLoading(true);
    const { code, message } = await contract.updateContract();
    setLoading(false);
    if (code == 200) {
      toast.success('Save contract success');
      contractStore.current.gasFee &&
        toast(`GAS FEE OF THIS SMART CONTRACT: ${contractStore.current.gasFee}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: classes.gasFeeToast,
        });
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
