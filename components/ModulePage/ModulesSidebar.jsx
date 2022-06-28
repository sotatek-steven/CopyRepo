import { styled } from '@mui/material';
import React, { useState } from 'react';
import ModuleTabs from './ModuleTabs';

const tabs = [
  {
    label: 'function',
    text: 'Function',
    content: 'function list',
  },
  {
    label: 'api',
    text: 'API Service',
    content: 'api service list',
  },
];

const Container = styled('div')(({ theme }) => ({
  width: 444,
  background: theme.palette.background.dark,
}));

const ModulesSidebar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  return (
    <Container>
      <ModuleTabs initialTabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>{activeTab}</div>
    </Container>
  );
};

export default ModulesSidebar;
