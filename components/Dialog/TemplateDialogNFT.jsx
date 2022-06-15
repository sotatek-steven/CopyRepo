import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useDispatch, useSelector } from 'react-redux';
import TemplateDomainItem from './TemplateDomainItem';
const TemplateDialogDefi = ({ openListNFT, setOpenListNFT }) => {
  const [tempDataList, setTempDataList] = useState([]);
  const { template } = useDispatch();
  const templateList = useSelector((state) => state.template);
  useEffect(() => {
    const fetchTemplate = async () => {
      const domain = 'nft';
      try {
        const data = await template.getTemplate(domain);
        data && setTempDataList(data);
      } catch (error) {
        console.log('Failed to fetch template');
      }
    };
    openListNFT && fetchTemplate();
  }, [openListNFT]);
  return (
    <Dialog
      fullWidth
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
            {templateList.listTemplate?.map((item) => {
              return <TemplateDomainItem key={item._id} item={item} />;
            })}
          </Grid>
          <Grid xs={6}>
            <Box sx={{ width: '589px', height: '548px', background: '#3D3D3E' }}></Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialogDefi;
