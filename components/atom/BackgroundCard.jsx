import { Card } from '@mui/material';

const BackgroundCard = (props) => {
  const { ...other } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: 'auto',
        p: 2,
        border: '1px solid #1c1c1c',
        ':hover': { border: '1px solid #3c3c3c' },
        transition: 'border 0.3s',
        position: 'relative',
      }}
      {...other}
    />
  );
};

export default BackgroundCard;
