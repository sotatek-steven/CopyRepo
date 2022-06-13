import { Box, Button, Tooltip } from '@mui/material';

const ImageButton = ({ title, disabled, onClick }) => (
  <Box
    position={'relative'}
    display={'flex'}
    justifyContent={'flex-end'}
    flexDirection={'column'}
    width={150}
    mt={5}
    mr={3}
  >
    <Tooltip title={'Coming Soon'}>
      <img
        style={{
          filter: disabled ? 'grayscale(100%)' : '',
          position: 'absolute',
          zIndex: 1,
          left: -10,
          bottom: 0,
        }}
        width={50}
        src={`/static/assets/img/marketplace/navigations/${String(
          title,
        ).toLowerCase()}.png`}
      />
    </Tooltip>

    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{ width: 150, position: 'absolute', textAlign: 'right' }}
      size="small"
      variant="contained"
    >
      {title}
    </Button>
  </Box>
);

export default ImageButton;
