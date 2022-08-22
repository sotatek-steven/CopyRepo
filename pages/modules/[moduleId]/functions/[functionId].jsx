import ControlStructureCanvas from '@/components/ControlStructureCanvas';
import FunctionActionList from '@/components/functionsPage/FunctionActionList';
import FunctionControl from '@/components/functionsPage/FunctionControl';
import FunctionSidebar from '@/components/functionsPage/FunctionSidebar';
import DesignLayout from '@/components/layout/DesignLayout';
import useModulePage from '@/components/ModulePage/hooks/useModulePage';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled, Tab } from '@mui/material';
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
  const { functionId } = router.query;
  const { userFunction } = useDispatch();
  const { fetchDetailModule } = useModulePage();
  const [tab, setTab] = useState('workflow_view');

  useEffect(() => {
    const fetchDetailFunction = async () => {
      try {
        if (!functionId) return;
        const data = await userFunction.getDetailFunction(functionId);
        userFunction.update(data);
      } catch (error) {
        console.log('Failed to fetch detail function: ', error);
      }
    };

    fetchDetailFunction();
    fetchDetailModule();
    return () => {
      userFunction.update({});
    };
  }, [functionId]);

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Container>
      <TabContext value={tab}>
        <TabListContainer>
          <FunctionControl />
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
  );
};

FunctionPage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <FunctionActionList /> });

export default FunctionPage;
