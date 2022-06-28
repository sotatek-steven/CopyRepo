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
  const { userModule } = useDispatch();
  const [modules, setModules] = useState([]);

  const fetchModules = async () => {
    console.log('fetchModules');
    try {
      const { data: modulesData } = await userModule.getModules();

      const modules = modulesData.map((moduleData) => {
        return {
          ...moduleData,
          disable: false,
        };
      });
      setModules(modules);
      console.log('load module complete: ', modules.length);
    } catch (error) {
      console.log('Failed to fetch modules');
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const updateModules = () => {
    const activeModules = contractState.current?.modules || [];
    console.log('Update modules: ', modules.length, activeModules.length);
    if(!modules.length){
      return;
    }
    const newState = modules.map((data) => {
      const { _id } = data;
      const disable = activeModules.includes(_id);
      return {
        ...data,
        disable,
      };
    });
    console.log('Update modules: ', modules.length, activeModules.length);
    setModules(newState);
  };
  
  useEffect(() => {
    updateModules();
  }, [contractState.current?.module_keys, modules.length]);

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
