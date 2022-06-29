import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '../Tabs';
import ModulesTabPanel from './ModulesTabPanel';

const DragArea = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.dark,
}));

const TabWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  position: 'relative',
}));

const tabs = [
  {
    id: 'modules',
    label: 'Modules',
    tabPanel: <ModulesTabPanel />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    tabPanel: 'Analytics',
  },
  {
    id: 'api',
    label: 'API Services',
    tabPanel: 'API Services list',
  },
];

const ModuleDrag = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <DragArea>
      <TabWrapper>
        <Tabs initialTabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} tabStyle={{ padding: '0px 25px' }} />
      </TabWrapper>
      {activeTab.tabPanel}
    </DragArea>
  );
};

export default ModuleDrag;
