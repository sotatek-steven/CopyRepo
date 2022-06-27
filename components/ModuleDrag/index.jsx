import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import SubMenu from './SubMenu';
import Menu from './Menu';
import ModuleItem from './ModuleItem';

const DragArea = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.dark,
}));

const ModuleDrag = () => {
  const contractState = useSelector((state) => state.contract);
  const { moduleApi } = useDispatch();
  const [modules, setModules] = useState([]);
  const [paging, setPaging] = useState({
    count: 0,
    size: 20,
    totalPage: 0,
    page: 0,
  });

  const fetchModules = async () => {
    console.log('fetchModules');
    try {
      const { data: modulesData } = await moduleApi.getModules(-1);

      const modules = modulesData.map((moduleData) => {
        return {
          ...moduleData,
          disable: false,
        };
      });
      setModules(modules);
    } catch (error) {
      console.log('Failed to fetch modules');
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    updateModules();
  }, [modules.length]);

  const updateModules = () => {
    const activeModules = contractState.current?.modules || [];
    const newState = modules.map((data) => {
      const { _id } = data;
      const disable = activeModules.includes(_id);
      return {
        ...data,
        disable,
      };
    });

    setModules(newState);
  }

  useEffect(() => {
    updateModules();
  }, [contractState.current?.module_keys]);

  return (
    <DragArea>
      <Menu />
      <SubMenu />
      <div>
        {modules.length <= 0 ? (
          <div> Module not found</div>
        ) : (
          modules.map((item, index) => {
            return <ModuleItem key={index} data={item} nodeType="rectangle" />;
          })
        )}
      </div>
    </DragArea>
  );
};

export default ModuleDrag;
