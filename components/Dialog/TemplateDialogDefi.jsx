import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid, Radio, Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TemplateDomainItem from './TemplateDomainItem';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import CheckboxChoose from '../Shared/CheckboxChoose';

const data = [
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

const TemplateDialogDefi = ({ openListDefi, setOpenListDefi }) => {
  // const [tempDataList, setTempDataList] = useState([]);
  const { template, userContract } = useDispatch();
  const templateList = useSelector((state) => state.template);
  const [idTemplate, setIdTemplate] = useState(templateList.length > 0 ? templateListMemo[0]._id : null);

  const templateListMemo = useMemo(() => {
    if (!templateList) {
      template.getTemplate('defi');
    } else {
      return templateList;
    }
  }, [templateList, template]);
  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = 'defi';
      try {
        const data = await template.getTemplate(domain);
        // data && setTempDataList(data);
      } catch (error) {
        console.log(error);
        console.log('Failed to fetch template');
      }
    };
    openListDefi && fetchTemplate();
  }, [openListDefi]);

  const handeSetIdTemplate = (e) => {
    setIdTemplate(e.target.value);
  };

  // const dataTemplateBody = useMemo(() => {
  //   if (templateListMemo.length > 0) {
  //     const templateById = templateListMemo?.filter(
  //       (item, index) => {
  //         return item._id === idTemplate;
  //       },
  //       [templateListMemo, idTemplate]
  //     );
  //     debugger;
  //     return templateById;
  //   }
  // }, [idTemplate, templateListMemo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (templateList.length > 0) {
      const dataTemplateBody = templateList?.filter((item, index) => {
        return item._id === idTemplate;
      });
      if (dataTemplateBody?.length > 0) {
        const { _id, modules, name, domain, tags, description } = dataTemplateBody[0];

        const submitCreateSC = async () => {
          try {
            const res = await userContract.createSmartContract({
              template: _id,
              modules,
              name,
              domain,
              tags,
              description,
            });
          } catch (error) {
            console.log(error);
            console.log('Failed to submit');
          }
        };
        submitCreateSC();
      }
    }
  };
  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit}
      fullWidth
      maxWidth="lg"
      open={openListDefi}
      onClose={() => setOpenListDefi(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ textAlign: 'left', mb: 2 }} id="responsive-dialog-title">
        <Box>
          <Typography sx={{ fontSize: '22px' }}>Suggested Smart Contracts for you</Typography>
          <Typography sx={{ fontSize: '12px', py: 1 }}>
            Please go through the following questionnaire and identify the appropriate match for your requirement.
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={() => setOpenListDefi(false)}
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
            <CheckboxChoose name="template" options={templateListMemo.listTemplate} handleChange={handeSetIdTemplate} />
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
                      {' '}
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
