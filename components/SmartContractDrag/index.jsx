import React from 'react';
import { styled } from '@mui/material/styles';
import SubMenu from './SubMenu';
import Menu from './Menu';
import ModuleItem from './ModuleItem';

const DragArea = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const SmartContractDrag = () => (
    <DragArea>
        <Menu />
        <SubMenu />
        <div>
            <ModuleItem nodeType="rectangle" />
        </div>
    </DragArea>
);

export default SmartContractDrag;
