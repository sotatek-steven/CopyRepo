import React from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SaveButton = styled('div')(({ theme }) => ({
  width: '130px',
  textAlign: 'center',
  border: 'solid 1px #F07D60',
  borderRadius: '4px',
  fontSize: '14px',
  padding: '6px 15px',
  color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  fontWeight: 600,
  backgroundColor: theme.palette.mode === 'dark' ? '#F07D60' : '#F07D60',
  ":hover": {
    cursor: 'pointer',
  }
}));

const SaveContractBtn = () => {
  const { contract } = useDispatch();
  const contractState = useSelector(state => state.contract);


  const saveContract = () => {
    console.log("save SC");
    console.log(contractState);
    const { code } = contract.updateContract(contractState);
    if (code == 200) return;
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <SaveButton onClick={saveContract}>
        Save Contract
      </SaveButton>
      {/* <Stack sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose}>
                        Failed to save smart contract!
                    </Alert>
                </Snackbar>
            </Stack> */}
    </>
  )
};

export default SaveContractBtn;