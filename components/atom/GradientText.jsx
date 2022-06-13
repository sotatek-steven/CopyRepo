import { Typography } from '@mui/material';

const GradientText = (props) => {
  const { sx, variant, ...other } = props;
  return (
    <Typography
      sx={{
        background: '-webkit-linear-gradient(45deg, #FCC859 30%, #F59F16 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...sx,
      }}
      variant={variant}
      {...other}
    />
  );
};

export default GradientText;
