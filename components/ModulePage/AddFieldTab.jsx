import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EventErrorTabPanel from '../EventErrorTabPanel';
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
  {
    id: 'events-errors',
    label: 'Events & Errors',
    tabPanel: 'Events & Errors',
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
  '.item-tab-label': {
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    '.number-error': {
      display: 'flex',
      width: 24,
      height: 24,
      background: theme.palette.common.white,
      color: theme.palette.primary.red1,
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
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
  const { numberError: numberErrorObject } = useSelector((state) => state.object);
  const { numberError: numberErrorValue } = useSelector((state) => state.value);
  const { numberError: numberErrorEvent } = useSelector((state) => state.eventError);

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
          {TAB_LIST.map((tab) => {
            const label = (
              <div className="item-tab-label">
                <div className="label">{tab.label}</div>
                {tab.id === 'objects' && !!numberErrorObject && <div className="number-error">{numberErrorObject}</div>}
                {tab.id === 'values' && !!numberErrorValue && <div className="number-error">{numberErrorValue}</div>}
                {/* {tab.id === 'mappings' && !!numberError && <div className="number-error">{numberError}</div>} */}
                {tab.id === 'events-errors' && !!numberErrorEvent && (
                  <div className="number-error">{numberErrorEvent}</div>
                )}
              </div>
            );

            return <TabItem key={tab.id} label={label} value={tab.id} />;
          })}
        </TabListContent>
        <TabPanelContent value="values">
          <ValuesTabPanel />
        </TabPanelContent>
        <TabPanelContent value="objects">{<ObjectTabPanel />}</TabPanelContent>
        <TabPanelContent value="mappings">
          <MappingTabPanel />
        </TabPanelContent>
        <TabPanelContent value="events-errors">
          <EventErrorTabPanel />
        </TabPanelContent>
      </Container>
    </TabContext>
  );
};

export default AddFieldTab;
