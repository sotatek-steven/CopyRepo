import BackButton from '@/components/atom/BackButton';
import DesignLayout from '@/components/layout/DesignLayout';
import LibrariesTabPanel from '@/components/Library/LibrariesTabPanel';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';
import Tabs from '@/components/Tabs';
import { ModuleMode } from '@/store/models/moduleDesignMode';
import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StructTabPanel from '../StructTabPanel';

const ButtonWrapper = styled('div')(() => ({
  position: 'absolute',
  top: 35,
  left: '-55px',
}));

const Container = styled('div')(() => ({
  position: 'relative',
  width: '80%',
  margin: 'auto',
  height: '100%',
  padding: '20px 0px',
  display: 'flex',
  flexDirection: 'column',
}));

const tabs = [
  {
    label: 'Libraries',
    id: 'libraries',
    tabPanel: <LibrariesTabPanel />,
    mode: ModuleMode.LIBRARY,
  },
  {
    label: 'Structs',
    id: 'structs',
    tabPanel: <StructTabPanel />,
    mode: ModuleMode.STRUCT,
  },
];

const getActiveTab = (mode) => {
  if (!mode) return tabs[0];
  return tabs.find((tab) => tab.mode === mode);
};

const Library = () => {
  const { library } = useDispatch();
  const moduleDesignModeState = useSelector((state) => state.moduleDesignMode);
  const { moduleDesignMode } = useDispatch();
  const [activeTab, setActiveTab] = useState(getActiveTab(moduleDesignModeState));

  useEffect(() => {
    const fetchImportedLibraries = async () => {
      const { data } = await library.getAllUserLibraries();
      library.update(data);
    };

    fetchImportedLibraries();
  }, []);

  return (
    <Container>
      <ButtonWrapper>
        <BackButton onClick={() => moduleDesignMode.setModuleDesignMode(ModuleMode.DESIGN)} />
      </ButtonWrapper>
      <Tabs initialTabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab.tabPanel}
    </Container>
  );
};

export default Library;

Library.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
