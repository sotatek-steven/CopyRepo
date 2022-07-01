import { styled } from '@mui/material';
import React from 'react';
import TabItem from './TabItem';

const Wrapper = styled('div')(() => ({
  position: 'relative',
}));

const TabContainer = styled('div')(({ tabstyle }) => ({
  display: 'flex',
  ...tabstyle,
  height: 46,
  gap: 27,
  flexGrow: 1,
}));

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  borderBottom: 'solid 1px',
  borderColor: theme.shape.borderColor,
}));

const Tabs = ({ initialTabs, activeTab, setActiveTab, tabStyle }) => {
  return (
    <Wrapper>
      <TabContainer tabstyle={tabStyle}>
        {initialTabs.map((tab) => {
          const { id } = tab;
          return <TabItem key={id} tab={tab} isActive={id === activeTab.id} setActiveTab={setActiveTab} />;
        })}
      </TabContainer>
      <Divider />
    </Wrapper>
  );
};

export default Tabs;
