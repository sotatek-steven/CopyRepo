import { MODE } from '@/config/constant/common';
import { Box, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import ModuleInfoModal from '../ModulePage/ModuleInfoModal';
import ModuleItem from './ModuleItem';
import SubMenu from './SubMenu';

const ModuleContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const ModulesTab = () => {
  const contractState = useSelector((state) => state.contract);
  const { userModule } = useDispatch();
  const [modules, setModules] = useState([]);
  const [dataClone, setDataClone] = useState({});
  const [isOpenModuleInfo, setIsOpenModuleInfo] = useState(false);

  const theme = useTheme();

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

  const handleOpenModuleInfo = () => {
    setDataClone({});
    setIsOpenModuleInfo(!isOpenModuleInfo);
  };

  useEffect(() => {
    updateModules();
  }, [contractState.current?.module_keys, modules.length]);
  return (
    <ModuleContainer>
      <SubMenu />
      <div style={{ flexGrow: 1 }}>
        <Scrollbars autoHide>
          {modules.length <= 0 ? (
            <div> Module not found</div>
          ) : (
            modules.map((item, index) => {
              return (
                <ModuleItem
                  key={index}
                  data={item}
                  fetchModules={fetchModules}
                  nodeType="module"
                  setDataClone={setDataClone}
                  setIsOpenModuleInfo={setIsOpenModuleInfo}
                />
              );
            })
          )}
        </Scrollbars>
      </div>
      {contractState.current.gasFee > -1 ? (
        <Box
          sx={{
            background: theme.palette.success.main,
            // borderLeft: `7px solid ${theme.palette.primary.light2} `,
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
      <ModuleInfoModal mode={MODE.CLONE} open={isOpenModuleInfo} onClose={handleOpenModuleInfo} data={dataClone} />
    </ModuleContainer>
  );
};

export default ModulesTab;
