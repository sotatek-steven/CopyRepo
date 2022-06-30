import React, { useEffect } from 'react';
import DesignLayout from '@/components/layout/DesignLayout';
import ModuleControl from '@/components/ModulePage/ModuleControl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import ModulesSidebar from '@/components/ModulePage/ModulesSidebar';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';
import Library from '@/components/Library';
import { ModuleMode } from '@/store/models/moduleDesignMode';

const Container = styled('div')(() => ({
  display: 'flex',
  height: '100%',
  position: 'relative',
}));

const ContentWapper = styled('div')(() => ({
  flexGrow: 1,
}));

const ModulePage = () => {
  const { userModule } = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const moduleDesignMode = useSelector((state) => state.moduleDesignMode);

  useEffect(() => {
    const fetchDetailModule = async (id) => {
      if (!id) return;
      const data = await userModule.getDetailModule(id);
      userModule.set(data);
    };

    fetchDetailModule(id);
  }, [id]);

  if (moduleDesignMode !== ModuleMode.DESIGN) return <Library />;
  return (
    <Container>
      <ContentWapper>
        <ModuleControl />
      </ContentWapper>
      <ModulesSidebar />
    </Container>
  );
};

export default ModulePage;

ModulePage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
