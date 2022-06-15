import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxChoose from '../Shared/CheckboxChoose';

const data1 = [
  {
    _id: '62a3237d0e4b41019e4d6dbb',
    owner: 'system',
    color: 'red',
    name: 'Tempate Defi',
    domain: 'defi',
    description: 'This is tempate defi smart contract',
    tags: ['defi', 'smart-contract'],
    modules: ['62a322bd0e4b41019e4d5742'],
    coordinates: [
      {
        module: '62a322bd0e4b41019e4d5742',
        position: {
          top: 10,
          left: 100,
        },
      },
    ],
  },
  {
    _id: '62a3237d0e4b41019e4d6dbb2',
    owner: 'system',
    color: 'red',
    name: 'Tempate Defi 3',
    domain: 'defi',
    description:
      'Allows to create new tokens in the crowdsale, instead of having a fixed total supply from the beginning. Next, we want to make our token "pausable". This will allow us to freeze token transfers during the ',
    tags: ['defi', 'smart-contract'],
    modules: ['62a322bd0e4b41019e4d5742'],
    coordinates: [
      {
        module: '62a322bd0e4b41019e4d5742',
        position: {
          top: 10,
          left: 100,
        },
      },
    ],
  },
  {
    _id: '62a3237d0e4b41019e4d6dbb3',
    owner: 'system',
    color: 'red',
    name: 'Tempate Defi 3',
    domain: 'defi',
    description:
      'Allows to create new tokens in the crowdsale, instead of having a fixed total supply from the beginning. Next, we want to make our token "pausable". This will allow us to freeze token transfers during the ',
    tags: ['defi', 'smart-contract'],
    modules: ['62a322bd0e4b41019e4d5742'],
    coordinates: [
      {
        module: '62a322bd0e4b41019e4d5742',
        position: {
          top: 10,
          left: 100,
        },
      },
    ],
  },
];
const TemplateDialogDefi = ({ openListNFT, setOpenListNFT }) => {
  const { template, userContract } = useDispatch();
  const templateList = useSelector((state) => state.template);
  const [templateState, setTemplateState] = useState([]);
  const [idTemplate, setIdTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = 'nft';
      try {
        const data = await template.getTemplate(domain);
        if (data.length > 0) {
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
          <Typography sx={{ fontSize: '12px', py: 1 }}>
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
            color: (theme) => theme.palette.primary.contrastText,
          }}>
          <CancelOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ borderTop: '1px solid #8C8C8C' }}>
          <Grid
            sx={{
              '&:hover': { opacity: 0.7 },
              paddingTop: '24px',
            }}
            item
            xs={6}>
            <CheckboxChoose name="template" options={templateState} handleChange={handeSetIdTemplate} />
          </Grid>
          <Grid xs={6}>
            <Box
              sx={{
                width: '589px',
                height: '548px',
                background: '#3D3D3E',
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
