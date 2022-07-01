import { styled } from '@mui/material';

export const DashedDivider = styled('div')(({ theme }) => ({
  borderBottom: '0.5px dashed',
  borderColor: theme.shape.borderColor,
}));
