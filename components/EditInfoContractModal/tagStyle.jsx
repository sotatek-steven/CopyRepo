import chroma from 'chroma-js';

const colourStyles = (theme) => ({
  menu: (styles) => ({ ...styles, backgroundColor: theme.palette.background.light }),
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
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 14,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: 14,
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: theme.palette.text.primary,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    ':hover': {
      backgroundColor: '#fdb4a1',
      color: theme.palette.text.primary,
    },
  }),
});

export default colourStyles;
