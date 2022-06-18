import { Handle, Position } from 'react-flow-renderer';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import SmartContractModal from '../SmartcontractModal';
import CloseIcon from '@mui/icons-material/Close';

const Card = styled('div')(({ theme }) => ({
  border: 'solid 1px',
  borderRadius: '4px',
  width: '260px',
  backgroundColor: theme.palette.mode === 'dark' ? '#BEA75A' : '',
  ":hover": {
    cursor: "pointer",
  }
}));

const Item = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#F7F7F7' : '#F7F7F7',
}));

const CardTitle = styled('div')(({ theme }) => ({
  padding: '10px',
  color: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
  ...theme.components.Truncate.singleLineEllipsis
}));

const CardBody = styled('div')(({ theme }) => ({
  borderRadius: '0px 0px 4px 4px',
  padding: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? '#2E2E30' : '#2E2E30',
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '5px',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 13,
  ...theme.components.Truncate.threeLineEllipsis
}));

const CloseBtn = styled('div')(({ theme }) => ({
  padding: '10px',
  color: 'white',
  transition: 'color, 0.2s',
  ':hover': {
    color: '#e1e1e19c',
  }
}));

const Status = ({ label, count }) => (
  <Item>
    <div style={{ fontSize: '18px', fontWeight: 600 }}>
      {count}
    </div>
    <div style={{ fontSize: '13px', fontWeight: 500 }}>
      {label}
    </div>
  </Item>
);

const RectangleNode = ({ data, id }) => {
  const { description, code, name, onDeleteNode, _id: moduleId, event, color } = data;
  const deleteModule = (event) => {
    event.stopPropagation();
    if (!onDeleteNode) return;
    onDeleteNode(id, moduleId);
  }

  return (
    <>
      <Card sx={{
        background: color || '#BEA75A',
        borderColor: '#BEA75A'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <CardTitle> {code}: {name} </CardTitle>
          <CloseBtn
            onClick={deleteModule}
          >
            <CloseIcon sx={{ fontSize: 20, color: '#000000' }}/>
          </CloseBtn>
        </div>

        <CardBody>
          {/* <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <Status label="Tasks" count={4} />
            <Status label="Functions" count={13} />
            <Status label="API Services" count={6} />
          </div> */}
          <Label> Description</Label>
          <Description>
            {description}
          </Description>
        </CardBody>
        <Handle
          type="source"
          position={Position.Top}
          id="a"
          style={{ background: '#555' }}
        />
        {/* <Handle
          type="target"
          position={Position.Right}
          id="b"
          style={{ background: '#555' }}
        /> */}
        <Handle
          type="target"
          position={Position.Bottom}
          id="c"
          style={{ background: '#555' }}
        />
        {/* <Handle
          type="source"
          position={Position.Left}
          style={{ background: '#555' }}
          id="d"
        /> */}
        <div>{data.text}</div>
      </Card>

      <SmartContractModal openDefault={event ? false : false} />
    </>
  );
};

export default RectangleNode;
