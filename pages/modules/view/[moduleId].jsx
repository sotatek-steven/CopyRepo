import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CodeViewTab from '@/components/ModulePage/CodeViewTab';
import { getRequest } from '@/utils/httpRequest';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled, Tab } from '@mui/material';

const TabListContainer = styled('div')(({ theme }) => ({
  borderBottom: 0,
  paddingTop: '70px',
  position: 'absolute',
  zIndex: '10',
  left: '80px',
}));
const TabListContent = styled(TabList)(({ theme }) => ({
  borderRadius: '16px',
  background: '#F07D60',
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

const ViewCode = () => {
  const [module, setModule] = useState({});
  const router = useRouter();
  const { moduleId } = router.query;
  useEffect(() => {
    const fetchModule = async () => {
      const { code, data } = await getRequest({
        url: `/api/v1/npm/modules/${moduleId}`,
      });
      if (code === 200 && Object.keys(data).length) {
        setModule(data);
      }else{
        setModule({code});
      }
    };
    if(router.isReady){
      fetchModule();
    }
  }, [router.isReady]);

  if(!Object.keys(module).length) return <div>Loading...</div>
  if(module.code === 1002) return <div>Module not found</div>
  return (
    <TabContext value="code_view">
      <TabPanelContent value="code_view">
        <TabContext value={'code_view'}>
          <TabListContainer>
            <TabListContent>
                <TabItem label="Code View" value="code_view" />
            </TabListContent>
          </TabListContainer>
          <TabPanelContent value="code_view">
            <CodeViewTab sources={module.lines} />
          </TabPanelContent>
        </TabContext>
      </TabPanelContent>
    </TabContext>
  );
};

ViewCode.PageLayout = function Layout({ children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default ViewCode;
