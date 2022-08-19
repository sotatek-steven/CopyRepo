import { styled } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ControlStructureItem from '../ControlStructureDrag/ControlStructureItem';

const Container = styled('div')(({ theme }) => ({
  width: 444,
  height: 'calc(100vh - 74px)',
  background: theme.palette.background.dark,
  display: 'flex',
  flexDirection: 'column',
  '.title': {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.light,
    borderBottom: '1px solid',
    padding: '10px 19px',
  },
}));

const FunctionSidebar = () => {
  return (
    <Container>
      <div className="title">Control Structures</div>
      <div className="list-structure" style={{ flexGrow: 1 }}>
        <Scrollbars autoHide>
          {![{ name: 'Declaration' }, { name: 'Assignment' }, { name: 'Logic' }]?.length && (
            <span> Control Structures not found</span>
          )}
          {!![{ name: 'Declaration' }, { name: 'Assignment' }, { name: 'Logic' }]?.length &&
            [{ name: 'Declaration' }, { name: 'Assignment' }, { name: 'Logic' }]?.map((item, index) => {
              return <ControlStructureItem key={index} data={item} nodeType="simpleRectangle" />;
            })}
        </Scrollbars>
      </div>
    </Container>
  );
};

export default FunctionSidebar;
