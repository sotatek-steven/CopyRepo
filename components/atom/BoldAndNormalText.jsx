import { Box, Typography } from '@mui/material';

const BoldAndNormalText = ({ title, value }) => <Box display={'inline-flex'} alignItems={'center'}>
  <Typography variant="subtitle1">{title}</Typography>
  <Typography ml={1} variant="subtitle2">
    {value}
  </Typography>
</Box>;

export default BoldAndNormalText;
