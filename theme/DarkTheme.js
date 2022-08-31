import { createTheme } from '@mui/material';
import { darkScrollbar } from '@mui/material';
import { grey } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      default: '#3D3D3E',
      light: '#595655',
      dark: '#2E2E30',
      parentNode: '#aeaaae33',
    },
    primary: {
      main: '#F07D60',
      light: '#E5C2B9',
      // dark: '#f57f17',
      contrastText: '#2E2E30',
      light2: '#FA6E6E',
      red1: '#CC2222',
      grey1: '#8C8C8C',
      purple: '#EF6BFE',
      purple2: '#DD90E5',
      yellow: '#FFD33F',
      green1: '#64F5A6',
    },
    success: {
      main: '#95D5B2',
      light: '#56C268',
      dark: '#094D27',
      contrastText: '#2E2E30',
    },
    info: {
      main: '#64A8F9',
      // light: '#64B6F7',
      dark: '#3498DB',
      contrastText: '#2E2E30',
    },
    warning: {
      main: '#FFD33F',
      light: '#E3C86D',
      dark: '#392D04',
      contrastText: '#2E2E30',
    },
    error: {
      main: '#D14343',
      light: '#FDE8E8',
      // dark: '#922E2E',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#E1E1E1',
      secondary: '#F6F6F6',
      // disabled: 'rgba(55, 65, 81, 0.48)'
    },
  },
  shape: {
    borderRadius: 4,
    borderColor: '#8C8C8C',
    backgroundNode: '#BEA75A',
  },
  hover: {
    background: {
      dark: '#4b4b4c',
    },
  },
  typography: {
    fontFamily:
      '"Josefin Sans", sans-serif, "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    // button: {
    //   fontWeight: 600,
    // },
    // body1: {
    //   fontSize: '1rem',
    //   fontWeight: 400,
    //   lineHeight: 1.5,
    // },
    // body2: {
    //   fontSize: '0.875rem',
    //   fontWeight: 400,
    //   lineHeight: 1.57,
    // },
    // subtitle1: {
    //   fontSize: '1rem',
    //   fontWeight: 500,
    //   lineHeight: 1.75,
    // },
    // subtitle2: {
    //   fontSize: '0.875rem',
    //   fontWeight: 500,
    //   lineHeight: 1.57,
    // },
    // overline: {
    //   fontSize: '0.75rem',
    //   fontWeight: 600,
    //   letterSpacing: '0.5px',
    //   lineHeight: 2.5,
    //   textTransform: 'uppercase',
    // },
    caption: {
      fontFamily: 'Segoe UI',
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.375,
    },
    h1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 600,
      fontSize: '1.25rem', //20px
      lineHeight: 1.375,
    },
    h2: {
      fontFamily: 'Josefin Sans',
      fontWeight: 600,
      fontSize: '1.125rem', //18px
      lineHeight: 1.375,
    },
    h3: {
      fontFamily: 'Josefin Sans',
      fontWeight: 600,
      fontSize: '1rem', //16px
      lineHeight: 1.375,
    },
  },
  components: {
    truncate: {
      singleLineEllipsis: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      twoLineEllipsis: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2!important',
        WebkitBoxOrient: 'vertical',
      },
      threeLineEllipsis: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '3!important',
        WebkitBoxOrient: 'vertical',
        whiteSpace: 'normal',
      },
    },
  },
});
