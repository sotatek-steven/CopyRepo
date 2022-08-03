import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MappingTabPanel from '../MappingTabPanel';
import ObjectTabPanel from '../ObjectTabPanel';
import ValuesTabPanel from '../ValuesPanel';

const TAB_LIST = [
  {
    id: 'values',
    label: 'Values',
    tabPanel: 'Values',
  },
  {
    id: 'objects',
    label: 'Objects',
    tabPanel: 'objects',
  },
  {
    id: 'mappings',
    label: 'Mappings',
    tabPanel: 'Mappings',
  },
];

const Container = styled('div')({
  width: '100%',
  height: '100%',
  padding: '0 35px',
});

const TabListContent = styled(TabList)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  '.MuiTouchRipple-root': {
    display: 'none',
  },
  '.MuiTabs-flexContainer': {
    borderBottom: `1px solid ${theme.shape.borderColor}`,
  },
  '.MuiTabs-indicator': {
    height: 4,
  },
  '.MuiTab-root': {
    fontSize: 16,
  },
}));

const TabItem = styled(Tab)({
  fontSize: 18,
  transform: 'scale(0.85, 0.78)',
});

const TabPanelContent = styled(TabPanel)({
  padding: '0 !important',
  width: '100%',
});

const AddFieldTab = ({ tab }) => {
  const [activeTab, setActiveTab] = useState('values');

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleChangeTab = (e, tab) => {
    setActiveTab(tab);
  };
  return (
    <TabContext value={activeTab}>
      <Container>
        <TabListContent className="custom-tab" onChange={handleChangeTab}>
          {TAB_LIST.map((tab) => (
            <TabItem key={tab.id} label={tab.label} value={tab.id} />
          ))}
        </TabListContent>
        <TabPanelContent value="values">
          <ValuesTabPanel />
        </TabPanelContent>
        <TabPanelContent value="objects">{<ObjectTabPanel />}</TabPanelContent>
        <TabPanelContent value="mappings">
          <MappingTabPanel />
        </TabPanelContent>
      </Container>
    </TabContext>
  );
};

export default AddFieldTab;
