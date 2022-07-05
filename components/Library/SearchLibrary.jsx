import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.light,
  borderRadius: 5,
  display: 'flex',
  alignContent: 'center',
  padding: 6,
  maxWidth: 415,
  marginBottom: 10,
}));

const Input = styled('input')(({ theme }) => ({
  background: theme.palette.background.light,
  outline: 'none',
  border: 'none',
  fontSize: 14,
  color: theme.palette.text.primary,
  width: '100%',
}));

const IconWrapper = styled('div')(({ hidden }) => ({
  display: hidden ? 'hidden!imported' : 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const SearchLibrary = () => {
  const [value, setValue] = useState('');
  const [closeIconHidden, setCloseIconHidden] = useState(true);
  const { library } = useDispatch();
  const libraryState = useSelector((state) => state.library);

  useEffect(() => {
    setCloseIconHidden(!value);
    const filterLibraries = (userInput) => {
      var filteredValues = libraryState.map((library) => {
        const libraryName = library.name.toLowerCase();
        const textInput = userInput.toLowerCase();

        return {
          ...library,
          hidden: !libraryName.includes(textInput),
        };
      });
      return filteredValues;
    };

    const filteredLibraries = filterLibraries(value);
    library.update(filteredLibraries);
  }, [value]);

  const handleChange = (e) => {
    const currentValue = e.target.value;
    setValue(currentValue.trim());
  };

  return (
    <Container>
      <SearchIcon style={{ fontSize: 22 }} />
      <Input placeholder="Find library" value={value} onChange={handleChange} />
      <IconWrapper hidden={closeIconHidden} onClick={() => setValue('')}>
        <CloseIcon />
      </IconWrapper>
    </Container>
  );
};

export default SearchLibrary;
