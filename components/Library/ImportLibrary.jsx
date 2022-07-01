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
  ...theme.components.truncate.singleLineEllipsis,
}));
const ImportLibrary = ({ name, hidden }) => {
  const { userModule } = useDispatch();
  const userModuleState = useSelector((state) => state.userModule);

  const importLibrary = () => {
    const { libraries } = userModuleState.sources;
    libraries.unshift(name);
    userModule.updateLibraries(libraries);
  };
  return (
    <Text hidden={hidden} onClick={importLibrary}>
      {name}
    </Text>
  );
};

export default ImportLibrary;
