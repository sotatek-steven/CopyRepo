import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  DialogContent,
  Grid,
  Button,
  useTheme,
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
  const [idTemplate, setIdTemplate] = useState(null);
  const [openCollapse, setOpenCollapse] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = type;
      try {
        const data = await template.getTemplate(domain);
        if (data?.length > 0) {
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

  useEffect(() => {
    setOpenCollapse([]);
  }, [idTemplate]);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (!_.isArray(listTemplate)) return;

    const dataTemplateBody = _.find(listTemplate, (item) => {
      return item._id === idTemplate;
    });
    const { _id, modules, name, domain, domainId, tags, description } = dataTemplateBody;

    const submitCreateSC = async () => {
      try {
        const bodyData =
          type === 'skip'
            ? { domainId: domainId, domain }
            : { template: _id, modules, name, domain, tags, description };

        const res = await userContract.createSmartContract(bodyData);
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
    template.clearAll();
  };

  const modulesByTemplate = useMemo(() => {
    if (!listTemplate) return;

    const filterModules = listTemplate.find((item) => item._id === idTemplate);
    return filterModules?.modules;
  }, [idTemplate, listTemplate]);

  const handleClick = (clickedIndex) => {
    if (openCollapse.includes(clickedIndex)) {
      const openCopy = openCollapse.filter((element) => {
        return element !== clickedIndex;
      });
      setOpenCollapse(openCopy);
    } else {
      const openCopy = [...openCollapse];
      openCopy.push(clickedIndex);
      setOpenCollapse(openCopy);
    }
  };

  const DetailsTemplate = useMemo(() => {
    return modulesByTemplate ? (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, pt: 3, px: 1 }}>
          <Scrollbars autoHeight autoHide autoHeightMax={600}>
            {modulesByTemplate?.length > 0 &&
              modulesByTemplate.map((item, index) => {
                const listFunctions = [];
                const listParameters = [];
                const listLibrary = item.sources.libraries.join('\n');

                item.sources.functions.forEach((i) => {
                  listFunctions.push(i.name);
                });

                item.sources.contructorParams?.forEach((i) => {
                  listParameters.push(i.label);
                });
                return (
                  <>
                    {' '}
                    <Box
                      key={item._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Button
                        startIcon={
                          openCollapse.includes(item._id) ? (
                            <ExpandCircleDownIcon
                              sx={{ transform: 'rotate(180deg)', color: theme.palette.success.main }}
                            />
                          ) : (
                            <ExpandCircleDownIcon sx={{ color: theme.palette.success.main }} />
                          )
                        }
                        // onClick={() => setIsShowCollapse({ [item._id]: !isShowCollapse[item._id] })}>
                        onClick={() => handleClick(item._id)}>
                        <Typography sx={{ pt: 0.5, color: theme.palette.primary.light, textTransform: 'capitalize' }}>
                          {item?.name}
                        </Typography>
                      </Button>
                      <Box sx={{ display: 'flex', fontSize: '14px', px: 3 }}>
                        <Typography sx={{ color: theme.palette.primary.purple, px: 2, textDecoration: 'underline' }}>
                          {item?.sources?.contructorParams?.length} Parameters
                        </Typography>
                        <Typography sx={{ color: theme.palette.primary.yellow, textDecoration: 'underline' }}>
                          {' '}
                          {item?.sources?.libraries.length} Libraries
                        </Typography>
                      </Box>
                    </Box>
                    <Collapse in={openCollapse.includes(item._id)} timeout="auto" unmountOnExit sx={{ px: 4 }}>
                      <Grid container sx={{ fontSize: '14px', pt: 2 }} rowSpacing={3}>
                        <Grid item xs={12}>
                          <Typography sx={{ color: theme.palette.primary.light2 }}>Functions</Typography>
                          <Typography>{listFunctions.join(', ')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={{ color: theme.palette.primary.purple2 }}>Parameters Included</Typography>
                          <Typography>{listParameters.join(', ')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={{ color: theme.palette.warning.main }}>Libraries</Typography>
                          <Typography>{listLibrary}</Typography>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </>
                );
              })}
          </Scrollbars>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px' }}>
          <Button
            variant="outlined"
            sx={{ color: '#fff', border: '1px solid #fff', minWidth: '114px', mx: 1 }}
            onClick={(e) => handleSubmit(e, 'skip')}>
            Skip
          </Button>
          <Button variant="contained" onClick={(e) => handleSubmit(e, 'create')}>
            {' '}
            Let&apos;s do this
          </Button>
        </Box>
      </Box>
    ) : null;
  }, [modulesByTemplate, openCollapse]);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'left' }}>
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
        <Grid
          container
          sx={{ borderTop: '1px solid', borderColor: theme.shape.borderColor, paddingTop: '24px' }}
          spacing={2}>
          <Grid
            sx={{
              '&:hover': { opacity: 0.7 },
              overflow: 'hidden',
            }}
            item
            xs={5}>
            <Scrollbars autoHeight autoHide autoHeightMax={700}>
              <CheckboxChoose
                name="template"
                options={listTemplate}
                handleChange={handeSetIdTemplate}
                idTemplate={idTemplate}
              />
            </Scrollbars>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                height: '100%',
                background: theme.palette.background.default,
              }}>
              {DetailsTemplate}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
