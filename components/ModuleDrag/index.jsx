import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import SubMenu from './SubMenu';
import Menu from './Menu';
import ModuleItem from './ModuleItem';
import useUserBackup from '@/hooks/useUserActive';

const DragArea = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const ModuleDrag = () => {
  useUserBackup();
  const contractState = useSelector(state => state.contract);
  const { moduleApi } = useDispatch();
  const [modules, setModules] = useState([]);
  const [paging, setPaging] = useState({
    count: 0,
    size: 20,
    totalPage: 0,
    page: 0,
  });


  const fetchModules = async () => {
    const { page } = paging;
    try {
      const { meta, data: modulesData } = await moduleApi.getModules(page);
      const { modules: activeModules } = contractState;
      const modules = modulesData.map((moduleData) => {
        const { _id } = moduleData;
        const disable = activeModules.includes(_id);
        return {
          ...moduleData,
          disable
        }
      });

      setModules(modules);
      setPaging(meta);
    } catch (error) {
      console.log('Failed to fetch modules');
    }
  };

  useEffect(() => {
    fetchModules();
  }, [])

  useEffect(() => {
    const { modules: activeModules } = contractState;
    const newState = modules.map((data) => {
      const { _id } = data;
      const disable = activeModules.includes(_id);
      return {
        ...data,
        disable
      }
    });

    setModules(newState);
  }, [contractState])


  return (
    <DragArea>
      <Menu />
      <SubMenu />
      <div>
        {
          modules.length <= 0
            ? <div> Module not found</div>
            : modules.map((item, index) => {
              return (
                <ModuleItem
                  key={index}
                  data={item}
                  nodeType="rectangle"
                />
              )
            })
        }
      </div>
    </DragArea>
  );
};

export default ModuleDrag;
