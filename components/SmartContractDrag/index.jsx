import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import SubMenu from './SubMenu';
import Menu from './Menu';
import ModuleItem from './ModuleItem';

const DragArea = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const SmartContractDrag = () => {
  const { moduleApi } = useDispatch();
  const [modules, setModules] = useState([]);
  const [paging, setPaging] = useState({
    count: 0,
    size: 20,
    totalPage: 0,
    page: 0,
  });

  useEffect(() => {
    const fetchModules = async () => {
      const { page } = paging;
      try {
        // const { meta, data } = await moduleApi.getModules(page);
        // setModules(data);
        // setPaging(meta);
      } catch (error) {
        console.log('Failed to fetch modules');
      }
      const fakeData = [{
        name: 'Mintable token',
        id: 1,
        description: 'fksfkd kjfkjfd fdhkjfdg fhgkjg ',
        code: 'Sol_1',
      }];
      setModules(fakeData);
    };
    fetchModules();
  }, []);

  return (
    <DragArea>
      <Menu />
      <SubMenu />
      <div>
        {
          modules.length <= 0
            ? <div> Module not found</div>
            : modules.map((item, index) => (
                <ModuleItem key={index} data={item} nodeType="rectangle" />
            ))
        }
      </div>
    </DragArea>
  );
};

export default SmartContractDrag;
