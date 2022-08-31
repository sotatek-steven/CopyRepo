import ControlStructureCanvas from '@/components/ControlStructureCanvas';
import FunctionActionList from '@/components/FunctionsPage/FunctionActionList';
import FunctionInfo from '@/components/FunctionsPage/FunctionInfo';
import FunctionSidebar from '@/components/functionsPage/FunctionSidebar';
import useDeclaration from '@/components/functionsPage/hooks/useDeclaration';
import DesignLayout from '@/components/layout/DesignLayout';
import { VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { FAKE_DATA, simpleData } from '@/store/models/fakeData';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled, Tab } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Container = styled('div')(() => ({
  display: 'flex',
  height: 'calc(100vh - 74px)',
  '.div-canvas': {
    flexGrow: 1,
    '.react-flow__controls': {
      display: 'none',
    },
  },
}));

const ContentWrapper = styled('div')(() => ({
  display: 'flex',
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

const TAB_LIST = [
  {
    name: 'Workflow View',
    value: 'workflow_view',
  },
  {
    name: 'Form View',
    value: 'form_view',
  },
  {
    name: 'Code View',
    value: 'code_view',
  },
];

const FunctionPage = () => {
  const router = useRouter();
  const { moduleId, functionId } = router.query;
  const { userFunction, initialFunction, userModule, functions, functionDefinition } = useDispatch();
  const [tab, setTab] = useState('workflow_view');
  // const { convertDeclaration } = useDeclaration();

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!functionId || !moduleId) return;
      try {
        // fetch detail function
        const data = await userFunction.getDetailFunction(functionId);
        delete data.updatedAt;
        userFunction.update(data);

        // save initial function data to compare
        initialFunction.set(data);

        // initial function definition data
        const FEData = await functionDefinition.convertToFEDataDisplay(data);
        functionDefinition.update(FEData);

        // fetch detail module
        const moduleData = await userModule.getDetailModule(moduleId);
        userModule.update(moduleData);
        // get list type for declaration modal
        const typeStructs = moduleData?.sources?.structs?.map((item) => {
          return {
            value: item?._id,
            label: item?.name,
          };
        });
        functions.setListType(_.concat(VALUE_TYPE_OPTIONS, typeStructs));
        // // Convert Declaration
        // const listDeclaration = convertDeclaration(data.block);
        // declaration.updateDeclarations(listDeclaration);

        //fetch all of functions
        functions.getAllUserFunctions();
      } catch (error) {
        console.log('Failed to fetch data: ', error);
      }
    };

    fetchData();
  }, [functionId, moduleId]);

  const { logicBlocks } = useDispatch();

  useEffect(() => {
    const convertData = async () => {
      // Init data
      const { nodes, edges } = await logicBlocks.createInitNode();
      logicBlocks.setBlocks(nodes);
      logicBlocks.setEdgeBlocks(edges);
    };

    convertData();
  }, []);

  return (
    <div>
      <FunctionInfo />
      <Container>
        <TabContext value={tab}>
          <TabListContainer>
            {/* <FunctionControl /> */}
            <TabListContent onChange={handleChangeTab} aria-label="lab API tabs example">
              {TAB_LIST.map((tab) => (
                <TabItem key={tab.value} label={tab.name} value={tab.value} />
              ))}
            </TabListContent>
          </TabListContainer>
          <TabPanelContent value="workflow_view">
            <ContentWrapper>
              <div className="div-canvas">
                <ControlStructureCanvas />
              </div>
              <div className="div-func-list">
                <FunctionSidebar />
              </div>
            </ContentWrapper>
          </TabPanelContent>
          <TabPanelContent value="form_view">
            <div>Form View</div>
          </TabPanelContent>
          <TabPanelContent value="code_view">
            <div>Code View</div>
          </TabPanelContent>
        </TabContext>
      </Container>
    </div>
  );
};

FunctionPage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <FunctionActionList /> });

export default FunctionPage;
