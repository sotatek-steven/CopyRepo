import { styled } from '@mui/material';
import React from 'react';
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
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImportedLibraries = () => {
  const userModuleState = useSelector((state) => state.userModule);
  const libraries = userModuleState.sources.structs.libraries;
  return (
    <>
      <Title>Imported libraries</Title>

      <DashedDivider />
      {libraries ? (
        libraries.map((library) => {
          const { _id, name } = library;
          return (
            <div key={_id}>
              <ImportedLibrary name={name} />
              <DashedDivider />
            </div>
          );
        })
      ) : (
        <TextContainer>
          <p>No libraries imported</p>
        </TextContainer>
      )}
    </>
  );
};

export default ImportedLibraries;
