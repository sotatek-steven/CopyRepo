import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  DialogContent,
  Grid,
  Radio,
  Button,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxChoose from '../Shared/CheckboxChoose';
import _ from 'lodash';
import { useRouter } from 'next/router';
import CloseIcon from '../../assets/icon/close-circle.svg';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Scrollbars from 'react-custom-scrollbars';

const TemplateDialog = ({ open, setOpen, type }) => {
  const { template, userContract } = useDispatch();
  const router = useRouter();
  const { listTemplate } = useSelector((state) => state.template);
  // const [templateState, setTemplateState] = useState([]);
  const [idTemplate, setIdTemplate] = useState(null);
  const [dataDetails, setDataDetails] = useState(null);
  const [isShowCollapse, setIsShowCollapse] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = type;
      try {
        const data = await template.getTemplate(domain);
        if (data?.length > 0) {
          // setTemplateState(data);
          setIdTemplate(data[0]._id);
        }
      } catch (error) {
        console.log(error);
        console.log('Failed to fetch template');
      }
    };
    open && fetchTemplate();
  }, [open, setIdTemplate, type]);

  const handeSetIdTemplate = (id) => {
    setIdTemplate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!_.isArray(listTemplate)) return;

    const submitCreateSC = async () => {
      const dataTemplateBody = _.find(listTemplate, (item) => {
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
        setOpen(false);
      } catch (error) {
        console.log(error);
        console.log('Failed to submit');
        setOpen(false);
      }
    };
    submitCreateSC();
  };

  const handleClose = () => {
    setOpen(false);
    setIdTemplate(null);
    setDataDetails(null);
    template.clearAll();
  };

  useEffect(() => {
    if (!open) return;
    if (!idTemplate) {
      setDataDetails(null);
      return;
    }
    const fetchTemplateDetails = async () => {
      try {
        const data = await template.getTemplateDetails(idTemplate);
        if (data) {
          setDataDetails(data);
        }
      } catch (error) {
        console.log(error);
        console.log('Failed to fetch template details');
      }
    };
    fetchTemplateDetails();
  }, [idTemplate, template, open]);

  const getFunctionName = useMemo(() => {
    const options = [];
    dataDetails &&
      dataDetails.functions.forEach((item) => {
        options.push(item.name);
      });
    options = options.join(', ');
    return options;
  }, [dataDetails]);

  const getParametersName = useMemo(() => {
    const options = [];
    dataDetails &&
      dataDetails.parameters.forEach((item) => {
        options.push(item.label);
      });
    options = options.join(', ');
    return options;
  }, [dataDetails]);

  const getLibrariesName = useMemo(() => {
    if (!dataDetails) return '';
    const libraries = dataDetails.libraries.join('\n');
    return libraries;
  }, [dataDetails]);

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit}
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle sx={{ textAlign: 'left', mb: 2 }} id="responsive-dialog-title">
        <Box>
          <Typography sx={{ fontSize: '22px' }}>Suggested Smart Contracts for you</Typography>
          <Typography sx={{ fontSize: '14px', py: 1, fontFamily: 'Segoe UI' }}>
            Please go through the following questionnaire and identify the appropriate match for your requirement.
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
              overflow: 'hidden',
            }}
            item
            xs={6}>
            <CheckboxChoose
              name="template"
              options={listTemplate}
              handleChange={handeSetIdTemplate}
              idTemplate={idTemplate}
              dataDetails={dataDetails}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                width: '575px',
                height: '500px',
                overflowY: 'hidden',
                background: theme.palette.background.default,
              }}>
              {dataDetails ? (
                <Grid container>
                  <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="450px" autoHide>
                    <Grid item xs={12} sx={{ height: '500px' }}>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 3, px: 1.5 }}>
                        <Button
                          startIcon={
                            isShowCollapse ? (
                              <ExpandCircleDownIcon sx={{ color: '#64F5A6' }} />
                            ) : (
                              <ExpandCircleDownIcon sx={{ transform: 'rotate(180deg)', color: '#64F5A6' }} />
                            )
                          }
                          onClick={() => setIsShowCollapse(!isShowCollapse)}>
                          <Typography sx={{ pt: 0.5, color: theme.palette.primary.light, textTransform: 'capitalize' }}>
                            {dataDetails?.name}
                          </Typography>
                        </Button>
                        <Box sx={{ display: 'flex', fontSize: '14px', px: 3 }}>
                          <Typography sx={{ color: '#EF6BFE', px: 2, textDecoration: 'underline' }}>
                            {dataDetails?.parameters.length} Paramester
                          </Typography>
                          <Typography sx={{ color: '#FFD33F', textDecoration: 'underline' }}>
                            {' '}
                            {dataDetails?.libraries.length} Libraries
                          </Typography>
                        </Box>
                      </Box>
                      <Collapse in={isShowCollapse} timeout="auto" unmountOnExit sx={{ px: 4 }}>
                        <Grid container sx={{ fontSize: '14px' }} rowSpacing={3}>
                          <Grid item>
                            <Typography sx={{ color: '#FA6E6E' }}>Functions</Typography>
                            <Typography>{getFunctionName}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={{ color: '#DD90E5' }}>Parameters Inclued</Typography>
                            <Typography>{getParametersName}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={{ color: '#FFD33F' }}>Libraries</Typography>
                            <Typography>{getLibrariesName}</Typography>
                          </Grid>
                        </Grid>
                      </Collapse>
                    </Grid>
                  </Scrollbars>
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
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
