import { styled } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { DashedDivider } from '../atom/Divider';
import ImportedLibrary from './ImportedLibrary';

const Title = styled('h1')(({ theme }) => ({
  fontFamily: 'Segoe UI',
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.light,
  margin: 0,
  padding: '18px 40px',
}));

const TextContainer = styled('div')(() => ({
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImportedLibraries = () => {
  const userModuleState = useSelector((state) => state.userModule);
  const libraries = userModuleState.sources?.libraries;
  return (
    <>
      <Title>Imported libraries</Title>
      <Scrollbars style={{ flexGrow: 1 }}>
        <DashedDivider />
        {libraries?.length ? (
          libraries.map((library) => (
            <div key={library}>
              <ImportedLibrary name={library} />
              <DashedDivider />
            </div>
          ))
        ) : (
          <TextContainer>
            <p>No libraries imported</p>
          </TextContainer>
        )}
      </Scrollbars>
    </>
  );
};

export default ImportedLibraries;
