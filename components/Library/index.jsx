import BackButton from '@/components/atom/BackButton';
import DesignLayout from '@/components/layout/DesignLayout';
import LibrariesTabPanel from '@/components/Library/LibrariesTabPanel';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';
import Tabs from '@/components/Tabs';
import { ModuleMode } from '@/store/models/moduleMode';
import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
  const moduleModeState = useSelector((state) => state.moduleMode);
  const { moduleMode } = useDispatch();
  const { library } = useDispatch();
  const { originStructs, structs } = useSelector((state) => state.struct);
  const [activeTab, setActiveTab] = useState(getActiveTab(moduleModeState));

  useEffect(() => {
    const fetchImportedLibraries = async () => {
      const { data } = await library.getAllUserLibraries();
      library.update(data);
    };

    fetchImportedLibraries();
  }, []);

  const handleBackToDesign = () => {
    if (JSON.stringify(originStructs) !== JSON.stringify(structs)) {
      toast.error('You must save the module before leaving', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: true,
      });
      return;
    }
    moduleMode.update(ModuleMode.DESIGN);
  };

  return (
    <>
      <Container>
        <ButtonWrapper>
          <BackButton onClick={handleBackToDesign} />
        </ButtonWrapper>
        <Tabs initialTabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab.tabPanel}
      </Container>
    </>
  );
};

export default Library;

Library.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
