import { styled } from '@mui/material';
import React, { useState } from 'react';
import Tabs from '../Tabs';
import ModuleOptions from './ModuleOptions';

const tabs = [
  {
    id: 'function',
    label: 'Function',
    tabPanel: 'function list',
  },
  {
    id: 'api',
    label: 'API Service',
    tabPanel: 'api service list',
  },
];

const Container = styled('div')(({ theme }) => ({
  width: 444,
  background: theme.palette.background.dark,
}));

const TabWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  position: 'relative',
}));

const OptionWrapper = styled('div')(() => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
}));

const ModulesSidebar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <Container>
      <TabWrapper>
        <Tabs initialTabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} tabStyle={{ padding: '0px 25px' }} />
        <OptionWrapper>
          <ModuleOptions />
        </OptionWrapper>
      </TabWrapper>
      {activeTab.tabPanel}
    </Container>
  );
};

export default ModulesSidebar;
