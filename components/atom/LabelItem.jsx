const { Box } = require('@mui/material');

const LabelItem = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        background: '-webkit-linear-gradient(45deg, #FCC859 30%, #F59F16 90%)',
        color: 'black',
        px: 0.7,
        py: 0.4,
        ml: 1,
        borderRadius: 0.5,
        textAlign: 'center',
        fontSize: '8px',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
};

export default LabelItem;
