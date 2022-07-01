import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '../../assets/icon/close-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxChoose from '../Shared/CheckboxChoose';
import { useRouter } from 'next/router';

const TemplateDialogDefi = ({ openListNFT, setOpenListNFT }) => {
  const { template, userContract } = useDispatch();
  const router = useRouter();
  const templateList = useSelector((state) => state.template);
  const [templateState, setTemplateState] = useState([]);
  const [idTemplate, setIdTemplate] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = 'nft';
      try {
        const data = await template.getTemplate(domain);
        if (data?.length > 0) {
          setTemplateState(data);

          setIdTemplate(data[0]._id);
        }
      } catch (error) {
        console.log(error);
        console.log('Failed to fetch template');
      }
    };
    openListNFT && fetchTemplate();
  }, [openListNFT, setIdTemplate, template]);

  const handeSetIdTemplate = (e) => {
    setIdTemplate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!_.isArray(templateState)) return;

    const submitCreateSC = async () => {
      const dataTemplateBody = _.find(templateState, (item) => {
        return item._id === idTemplate;
      });
      const { _id, modules, name, domain, tags, description } = dataTemplateBody;

      try {
        const res = await userContract.createSmartContract({
          template: _id,
          modules,
          name,
          domain,
          tags,
          description,
        });
        if (res.data) {
          const { _id } = res.data;
          _id && router.push(`/smartcontract/${_id}`);
        }
        setOpenListNFT(false);
      } catch (error) {
        console.log(error);
        console.log('Failed to submit');
        setOpenListNFT(false);
      }
    };
    submitCreateSC();
  };
  return (
    <Dialog
      fullWidth
      component="form"
      onSubmit={handleSubmit}
      maxWidth="lg"
      open={openListNFT}
      onClose={() => setOpenListNFT(false)}
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
          onClick={() => setOpenListNFT(false)}
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
          <Grid
            sx={{
              '&:hover': { opacity: 0.7 },
              paddingTop: '24px',
            }}
            item
            xs={6}>
            <CheckboxChoose name="template" options={templateState} handleChange={handeSetIdTemplate} />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: '589px',
                height: '548px',
                background: theme.palette.background.default,
              }}>
              <Grid container>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} sx={{ height: '500px' }}></Grid>
                <Grid item xs={12} sx={{ mr: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      sx={{ color: '#fff', border: '1px solid #fff', minWidth: '114px', mx: 1 }}>
                      Skip
                    </Button>
                    <Button variant="contained" type="submit">
                      Let do this
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialogDefi;
