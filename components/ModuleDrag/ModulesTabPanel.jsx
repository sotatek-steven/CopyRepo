import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModuleItem from './ModuleItem';
import SubMenu from './SubMenu';

const ModulesTab = () => {
  const contractState = useSelector((state) => state.contract);
  const { userModule } = useDispatch();
  const [modules, setModules] = useState([]);
  const theme = useTheme();

  console.log(contractState);

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
        {contractState.current.gasFee > -1 ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: '30px',
              background: theme.palette.primary.light,
              borderLeft: `7px solid ${theme.palette.primary.light2} `,
              width: '444px',
              height: '82px',
              color: theme.palette.common.black,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
            }}>
            GAS FEE OF THIS SMART CONTRACT: {contractState.current.gasFee} Gwei
          </Box>
        ) : null}
      </div>
    </div>
  );
};

export default ModulesTab;
