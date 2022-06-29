import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModuleItem from './ModuleItem';
import SubMenu from './SubMenu';

const ModulesTab = () => {
  const contractState = useSelector((state) => state.contract);
  const { userModule } = useDispatch();
  const [modules, setModules] = useState([]);

  const fetchModules = async () => {
    try {
      const { data: modulesData } = await userModule.getModules();

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

  const updateModules = () => {
    const activeModules = contractState.current?.modules || [];
    if (!modules.length) {
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
    setModules(newState);
  };

  useEffect(() => {
    updateModules();
  }, [contractState.current?.module_keys, modules.length]);
  return (
    <div>
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
    </div>
  );
};

export default ModulesTab;
