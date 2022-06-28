import React, { useEffect } from 'react';
import DesignLayout from '@/components/layout/DesignLayout';
import ModuleControl from '@/components/ModulePage/ModuleControl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ModuleActionList from '@/components/ModulePage/ModuleActionList';

const ModulePage = () => {
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    userModule.getDetailModule(id);
  }, [id]);

  return (
    <div style={{ position: 'relative' }}>
      <ModuleControl />
    </div>
  );
};

export default ModulePage;

ModulePage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <ModuleActionList /> });
