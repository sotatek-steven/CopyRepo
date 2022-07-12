import React, { useEffect, useState } from 'react';
import DesignLayout from '@/components/layout/DesignLayout';
import ModuleControl from '@/components/ModulePage/ModuleControl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { styled, Tab } from '@mui/material';
import ModulesSidebar from '@/components/ModulePage/ModulesSidebar';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';
import Library from '@/components/Library';
import { ModuleMode } from '@/store/models/moduleMode';
import useStructPage from '@/components/StructTabPanel/hooks/useStructPage';
import { MODULE_OWNER } from '@/config/constant/common';
import CodeViewTab from '@/components/ModulePage/CodeViewTab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import IconCanvas from '../../assets/icon/IconCanvas.svg';
import IconAddField from '../../assets/icon/IconAddField.svg';
import { createNodes } from '@/components/FunctionCanvas/CreateElement';
import FunctionCanvas from '@/components/FunctionCanvas';

const ContentWapper = styled('div')(() => ({
  display: 'flex',
  height: 'calc(100vh - 74px)',
  '.div-canvas': {
    flexGrow: 1,
  },
}));

const TabListContainer = styled('div')(({ theme }) => ({
  borderBottom: 0,
  paddingTop: '70px',
  position: 'absolute',
  zIndex: '10',
  left: '80px',
  '.vertical-tab': {
    position: 'absolute',
    left: -60,
    top: 300,
    borderRadius: 'unset',
    '.Mui-selected': {
      color: `${theme.palette.primary.main} !important`,
      background: 'unset',
      '& > svg > path': {
        fill: theme.palette.primary.main,
      },
    },
    '.MuiTouchRipple-root': {
      display: 'none',
    },
    '.MuiTabs-indicator': {
      display: 'block',
      width: 3,
    },
    '.MuiTabs-flexContainer': {
      padding: '20px 0px',
    },
  },
}));

const TabListContent = styled(TabList)(({ theme }) => ({
  borderRadius: '16px',
  background: theme.palette.background.light,
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 2px rgba(0, 0, 0, 0.25)',
  position: 'absolute',
  left: 36,
  width: 'max-content',

  '.MuiTabs-indicator': {
    display: 'none',
  },
  textTransform: 'none',
  '.MuiButtonBase-root': {
    textTransform: 'none',
  },
  display: 'flex',
  alignItems: 'center',
  '	.Mui-selected': {
    background: theme.palette.primary.main,
    borderRadius: '14px',
    color: `${theme.palette.text.primary} !important`,
  },
  '.MuiTab-root': {
    padding: '0px 7px',
  },
  '.MuiTabs-flexContainer': {
    padding: '4px 0px',
  },
}));

const TabItem = styled(Tab)(() => ({
  fontSize: 18,
  transform: 'scale(0.85, 0.78)',
}));

const TabPanelContent = styled(TabPanel)(() => ({
  padding: '0 !important',
  width: '100%',
}));

const TAB_LIST_VERTICAL = [
  {
    name: 'Canvas',
    value: 'canvas',
    icon: <IconCanvas />,
  },
  {
    name: 'Add Fields',
    value: 'fields',
    icon: <IconAddField />,
  },
];

const TAB_LIST = [
  {
    name: 'Logic View',
    value: 'logic',
  },
  {
    name: 'Code View',
    value: 'code_view',
  },
];

const ModulePage = () => {
  const { userModule, functions } = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const moduleModeState = useSelector((state) => state.moduleMode);
  const moduleState = useSelector((state) => state.userModule);
  const { moduleMode, template } = useDispatch();
  const { getStructs } = useStructPage();
  const [tabVertical, setTabVertical] = useState('canvas');
  const [tabHorizontal, setTabHorizontal] = useState('logic');
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchDetailModule = async (id) => {
      if (!id) return;
      const data = await userModule.getDetailModule(id);

      getStructs(data?.sources?.structs);
      userModule.set(data);
    };

    fetchDetailModule(id);
  }, [id]);

  useEffect(() => {
    moduleMode.update(ModuleMode.DESIGN);
    userModule.getModules();
    functions.getAllUserFunctions();
    template.getTemplateDomain({ size: -1 });
  }, []);

  useEffect(() => {
    if (!moduleState || !moduleState.sources) return;
    const { functions, coordinates } = moduleState.sources;
    const _nodes = createNodes(functions, coordinates);

    setNodes(_nodes);
  }, [moduleState.sources]);

  const handleChangeTabVertical = (e, newValue) => {
    setTabVertical(newValue);
  };

  const handleChangeTabHorizontal = (e, newValue) => {
    setTabHorizontal(newValue);
  };

  if (moduleModeState !== ModuleMode.DESIGN) return <Library />;
  return (
    <TabContext value={tabVertical}>
      <TabListContainer>
        <TabListContent
          orientation="vertical"
          className="vertical-tab"
          onChange={handleChangeTabVertical}
          aria-label="lab API tabs example">
          {TAB_LIST_VERTICAL.map((tab) => (
            <TabItem key={tab.value} icon={tab.icon} label={tab.name} value={tab.value} />
          ))}
        </TabListContent>
      </TabListContainer>
      <TabPanelContent value="canvas">
        <TabContext value={tabHorizontal}>
          <TabListContainer>
            <ModuleControl />
            <TabListContent onChange={handleChangeTabHorizontal} aria-label="lab API tabs example">
              {TAB_LIST.map((tab) => (
                <TabItem key={tab.value} label={tab.name} value={tab.value} />
              ))}
            </TabListContent>
          </TabListContainer>
          <TabPanelContent value="logic">
            <ContentWapper>
              <div className="div-canvas">
                <FunctionCanvas initialNodes={nodes} />
              </div>
              {moduleState?.owner?.toUpperCase() !== MODULE_OWNER.SYSTEM && <ModulesSidebar />}
            </ContentWapper>
          </TabPanelContent>
          <TabPanelContent value="code">
            <CodeViewTab sources={[]} />
          </TabPanelContent>
        </TabContext>
      </TabPanelContent>
      <TabPanelContent value="fields">
        <TabContext value={tabHorizontal}>
          <TabListContainer>
            <ModuleControl />
          </TabListContainer>
        </TabContext>
      </TabPanelContent>
    </TabContext>
  );
};

export default ModulePage;

ModulePage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
