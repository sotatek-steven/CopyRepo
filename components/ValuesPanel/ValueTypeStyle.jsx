import chroma from 'chroma-js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const colourStyles = (theme) => ({
  menu: (styles) => ({ ...styles, backgroundColor: theme.palette.background.light }),
  menuList: (styles) => ({
    ...styles,
    height: ITEM_HEIGHT * 3.7 + ITEM_PADDING_TOP,
    '::-webkit-scrollbar': {
      width: '5px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: theme.palette.background.light,
    border: 'none',
    boxShadow: 'none',
    height: '45px',
  }),
  input: (styles) => ({
    ...styles,
    color: `${theme.palette.text.primary}important`,
    fontWeight: 600,
    fontSize: 14,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(theme.palette.primary.main);
    return {
      ...styles,
      backgroundColor: theme.palette.background.light,
      fontWeight: 600,
      fontSize: 14,
      color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? '#fff' : color.alpha(0.3).css()) : undefined,
      },
      ':hover': {
        backgroundColor: '#fdb4a1',
      },
    };
  },
  singleValue: (styles, { data }) => ({
    ...styles,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 14,
  }),
});

export default colourStyles;
