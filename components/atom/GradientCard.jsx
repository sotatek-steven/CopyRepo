import { Card } from '@mui/material';

const GradientCard = (props) => {
  const { ...other } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: 'auto',
        p: 2,
        background: 'linear-gradient(180deg,#2a2a2a,#1b1b1b)',
        border: '1px solid #1c1c1c',
        ':hover': { border: '1px solid #3c3c3c' },
        transition: 'border 0.3s',
      }}
      {...other}
    />
  );
};

export default GradientCard;
