import { styled } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Text = styled('div')(({ theme, hidden }) => ({
  display: hidden ? 'hidden!imported' : 'block',
  padding: '12px 0px',
  fontFamily: 'Segoe UI',
  height: 42,
  boxSizing: 'border-box',
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.primary,
  margin: 0,
  wordBreak: 'break-all',
  borderBottom: 'solid 1px',
  borderColor: theme.shape.borderColor,
  cursor: 'pointer',
  ...theme.components.truncate.singleLineEllipsis,
}));

const ImportLibrary = ({ name, hidden }) => {
  const { userModule, library } = useDispatch();
  const userModuleState = useSelector((state) => state.userModule);
  const libraryState = useSelector((state) => state.library);

  const importLibrary = () => {
    const { libraries } = userModuleState.sources;
    libraries.unshift(name);
    userModule.updateLibraries(libraries);

    const librariesArr = libraryState.map((library) => {
      const { name } = library;
      const hidden = libraries.filter((item) => item === name).length !== 0;
      return {
        ...library,
        hidden,
      };
    });

    library.update(librariesArr);
  };
  return (
    <Text hidden={hidden} onClick={importLibrary}>
      {name}
    </Text>
  );
};

export default ImportLibrary;
