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

const ControlStructures = [
  { name: 'Declaration', nodeType: 'declaration' },
  { name: 'Assignment', nodeType: 'assignment' },
  { name: 'IF - ELSE', nodeType: 'if_else' },
  { name: 'FOR LOOP', nodeType: 'for_loop' },
  { name: 'WHILE LOOP', nodeType: 'while_loop' },
  { name: 'DO WHILE LOOP', nodeType: 'do_while_loop' },
  { name: 'RETURN', nodeType: 'return' },
  { name: 'THROW', nodeType: 'throw' },
  { name: 'REQUIRE', nodeType: 'require' },
  { name: 'REVERT', nodeType: 'revert' },
  { name: 'ASSERT', nodeType: 'assert' },
  { name: 'EMIT', nodeType: 'emit' },
  { name: 'BREAK', nodeType: 'break' },
  { name: 'CONTINUE', nodeType: 'continue' },
];

const FunctionSidebar = () => {
  return (
    <Container>
      <div className="title">Control Structures</div>
      <div className="list-structure" style={{ flexGrow: 1 }}>
        <Scrollbars autoHide>
          {ControlStructures.map((item, index) => {
            return <ControlStructureItem key={index} name={item.name} nodeType={item.nodeType} />;
          })}
        </Scrollbars>
      </div>
    </Container>
  );
};

export default FunctionSidebar;
