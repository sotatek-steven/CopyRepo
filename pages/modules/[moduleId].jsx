import React, { useEffect, useState } from 'react';
import DesignLayout from '@/components/layout/DesignLayout';
import ModuleControl from '@/components/ModulePage/ModuleControl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, styled, Tab, useTheme } from '@mui/material';
import ModulesSidebar from '@/components/ModulePage/ModulesSidebar';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';
import Library from '@/components/Library';
import { ModuleMode } from '@/store/models/moduleMode';
import { MODULE_OWNER } from '@/config/constant/common';
import CodeViewTab from '@/components/ModulePage/CodeViewTab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import IconCanvas from '@/assets/icon/IconCanvas.svg';
import IconAddField from '@/assets/icon/IconAddField.svg';
import { createNodes } from '@/components/FunctionCanvas/CreateElement';
import FunctionCanvas from '@/components/FunctionCanvas';
import AddFieldTab from '@/components/ModulePage/AddFieldTab';
import useModulePage from '@/components/ModulePage/hooks/useModulePage';
import SavingScreen from '@/components/Saving';
import useModule from '@/hooks/useModule';

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
    left: -70,
    top: '25vh',
    width: 88,
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
    '.MuiTab-root': {
      fontSize: 12,
    },
  },
}));

const TabAddFieldContainer = styled('div')(({ theme }) => ({
  borderBottom: 0,
  paddingTop: '70px',
  position: 'absolute',
  zIndex: '10',
  left: '80px',
  width: 'calc(100% - 80px)',
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
  '.number-error': {
    display: 'flex',
    width: 24,
    height: 24,
    background: theme.palette.common.white,
    color: theme.palette.primary.red1,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
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
  const { userModule } = useDispatch();
  const router = useRouter();
  const { moduleId } = router.query;
  const moduleModeState = useSelector((state) => state.moduleMode);
  const moduleState = useSelector((state) => state.userModule);
  const { objects, numberError: numberErrorObject } = useSelector((state) => state.object);
  const { values, numberError: numberErrorValue } = useSelector((state) => state.value);
  const { numberError: numberErrorMapping } = useSelector((state) => state.mapping);
  const { dataEvent, numberError: numberErrorEvent } = useSelector((state) => state.event);
  const { dataError, numberError: numberErrorError } = useSelector((state) => state.error);
  const { moduleMode, template, value, object, mapping, modules } = useDispatch();
  const { fetchDetailModule, loading } = useModulePage();
  const [tabVertical, setTabVertical] = useState('canvas');
  const [tabHorizontal, setTabHorizontal] = useState('logic');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const theme = useTheme();
  const [sources, setSource] = useState(null);
  const [addFieldTab, setAddFieldTab] = useState('values');
  const [totalError, setTotalError] = useState(0);
  const { checkValidateMapping } = useModule();
  const { duplicateNames } = useSelector((state) => state.modules);

  // Variable name of All Tab
  useEffect(() => {
    const listVariableName = [];
    objects.forEach((item) => {
      if (item?.name) {
        listVariableName.push(item?.name);
      }
    });
    values.forEach((item) => {
      if (item?.label) {
        listVariableName.push(item?.label);
      }
    });
    dataEvent.forEach((item) => {
      if (item?.name) {
        listVariableName.push(item?.name);
      }
    });
    dataError.forEach((item) => {
      if (item?.name) {
        listVariableName.push(item?.name);
      }
    });
    moduleState?.variables?.mappings?.forEach((item) => {
      if (item?.label) {
        listVariableName.push(item?.label);
      }
    });

    const duplicateNames = listVariableName.map((item) => item).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i);

    modules.setDuplicateNames(duplicateNames);
  }, [objects, values, dataEvent, dataError, moduleState?.variables?.mappings]);

  useEffect(() => {
    setTotalError(numberErrorObject + numberErrorValue + numberErrorMapping + numberErrorEvent + numberErrorError);
  }, [numberErrorObject, numberErrorValue, numberErrorMapping, numberErrorEvent, numberErrorError]);

  useEffect(() => {
    if (moduleState?.variables?.mappings) {
      const { data, numErr, funcIds } = checkValidateMapping(moduleState?.variables?.mappings);
      mapping.setNumberError(numErr);
      mapping.setErrorFunctions(funcIds);

      userModule.updateMappings(data);
    }
  }, [duplicateNames]);

  useEffect(() => {
    fetchDetailModule();
    return () => {
      value.resetError();
      object.resetError();
      mapping.resetError();
      userModule.set({});
    };
  }, [moduleId]);

  useEffect(() => {
    moduleMode.update(ModuleMode.DESIGN);
    userModule.getModules();
    template.getTemplateDomain({ size: -1 });
  }, []);

  useEffect(() => {
    if (!moduleState || !moduleState.sources) return;
    const { functions, coordinates } = moduleState.sources;
    const { nodes: _nodes, edges: _edges } = createNodes(functions, coordinates);
    setNodes(_nodes);
    setEdges(_edges);
  }, [moduleState.sources]);

  useEffect(() => {
    setSource(moduleState.lines);
  }, [moduleState.lines]);

  const handleChangeTabVertical = (e, newValue) => {
    // const valueError = valueHasError();
    // const objectError = objectHasError();
    // if (valueError || objectError) return;

    setTabVertical(newValue);
  };

  const handleChangeTabHorizontal = (e, newValue) => {
    setTabHorizontal(newValue);
  };

  if (moduleModeState !== ModuleMode.DESIGN) return <Library />;
  return (
    <TabContext value={tabVertical}>
      {loading && <SavingScreen title="Loading" />}

      <TabListContainer>
        <TabListContent
          orientation="vertical"
          className="vertical-tab"
          onChange={handleChangeTabVertical}
          aria-label="lab API tabs example">
          {TAB_LIST_VERTICAL.map((tab) => {
            const label = (
              <>
                <div className="label">{tab.name}</div>
                {tab.value === 'fields' && !!totalError && <div className="number-error">{totalError}</div>}
              </>
            );
            return <TabItem key={tab.value} icon={tab.icon} label={label} value={tab.value} />;
          })}
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
                <FunctionCanvas
                  initialNodes={nodes}
                  initialEdges={edges}
                  redirectToAddField={(tab) => {
                    setTabVertical('fields');
                    setAddFieldTab(tab);
                  }}
                />
              </div>
              {moduleState?.owner?.toUpperCase() !== MODULE_OWNER.SYSTEM ? (
                <div className="div-func-list">
                  <ModulesSidebar />
                </div>
              ) : (
                <Box
                  sx={{
                    background: theme.palette.success.main,
                    width: '444px',
                    height: '82px',
                    color: theme.palette.common.black,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    position: 'absolute',
                    top: '4.5em',
                    right: '0',
                  }}>
                  GAS FEE OF THIS MODULE: {moduleState.gasFee} Gwei
                </Box>
              )}
            </ContentWapper>
          </TabPanelContent>
          <TabPanelContent value="code_view">
            <CodeViewTab sources={sources} />
          </TabPanelContent>
        </TabContext>
      </TabPanelContent>
      <TabPanelContent value="fields">
        <TabContext value={tabHorizontal}>
          <TabAddFieldContainer>
            <ModuleControl />
            <AddFieldTab tab={addFieldTab} />
          </TabAddFieldContainer>
        </TabContext>
      </TabPanelContent>
    </TabContext>
  );
};

export default ModulePage;

ModulePage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
