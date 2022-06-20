import chroma from 'chroma-js';
const colourStyles = {
    menu: (styles) => ({ ...styles, backgroundColor: '#595655' }),
    control: (styles) => ({
        ...styles,
        backgroundColor: '#595655',
        border: 'none',          
        boxShadow: 'none',
        height: '45px',
    }),
    input: (styles) => ({...styles, color: '#E1E1E1!important',}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma('#F07D60');
        return {
            ...styles,
            backgroundColor: '#595655',
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? '#fff'
                        : color.alpha(0.3).css()
                    : undefined,
            },
            ':hover': {
                backgroundColor: '#fdb4a1'
            },
        };
    },
    multiValue: (styles, { data }) => ({
        ...styles,
        backgroundColor: '#F07D60',
        color: '#E1E1E1',
    }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: '#E1E1E1',
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: '#E1E1E1',
        ':hover': {
            backgroundColor: '#fdb4a1',
            color: '#E1E1E1',
            cursor: 'pointer',
        },
    }),
};

export default colourStyles;