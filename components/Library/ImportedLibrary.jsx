import { styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled('div')(() => ({
  padding: '18px 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 25,
  height: 78,
}));

const Text = styled('div')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  boxSizing: 'border-box',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.primary,
  margin: 0,
  wordBreak: 'break-all',
  ...theme.components.truncate.twoLineEllipsis,
}));

const ImportedLibrary = ({ name, allowRemove }) => {
  const { userModule } = useDispatch();
  const userModuleState = useSelector((state) => state.userModule);
  const libraryState = useSelector((state) => state.library);
  const { library } = useDispatch();

  const removeLibrary = () => {
    const { libraries } = userModuleState.sources;
    const updatedLibraries = libraries.filter((library) => library !== name);
    userModule.updateLibraries(updatedLibraries);

    const updatedLibrary = libraryState.map((item) => {
      const { name: nameItem, hidden } = item;
      return {
        ...item,
        hidden: nameItem === name ? false : hidden,
      };
    });
    library.update(updatedLibrary);
  };

  return (
    <Container>
      <Text>{name}</Text>
      {allowRemove && <CloseIcon sx={{ fontSize: 20, cursor: 'pointer' }} onClick={removeLibrary} />}
    </Container>
  );
};

export default ImportedLibrary;
