import { styled } from '@mui/material';
import React, { useState } from 'react';
import TabItem from '../atom/TabItem';
import ModuleOptions from './ModuleOptions';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.light,
  alignItems: 'end',
}));
const Container = styled('div')(() => ({
  display: 'flex',
  padding: '0px 25px',
  height: 46,
  gap: 27,
  flexGrow: 1,
}));

const ModuleTabs = ({ initialTabs, activeTab, setActiveTab }) => {
  return (
    <Wrapper>
      <Container>
        {initialTabs.map((item) => {
          const { text, label } = item;
          return (
            <TabItem text={text} label={label} isActive={activeTab === label} setActiveTab={setActiveTab} key={label} />
          );
        })}
      </Container>
      <ModuleOptions />
    </Wrapper>
  );
};

export default ModuleTabs;
