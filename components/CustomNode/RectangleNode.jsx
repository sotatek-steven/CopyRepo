import { Handle, Position } from 'react-flow-renderer';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import SmartContractModal from '../SmartcontractModal';

const Card = styled('div')(({ theme }) => ({
  border: theme.palette.mode === 'dark' ? 'solid 1px #BEA75A' : '',
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

const CardTitle = styled('div')(() => ({
  padding: '10px',
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

const Status = ({ label, count }) => (
  <Item>
    <div style={{ fontSize: '16px', fontWeight: 600 }}>
      {count}
    </div>
    <div style={{ fontSize: '13px', fontWeight: 500 }}>
      {label}
    </div>
  </Item>
);

const RectangleNode = ({ data }) => {
  const { description, code, name, onDeleteNode, _id } = data;
  const deleteModule = (event) => {
    event.stopPropagation();
    if(!onDeleteNode) return;
    onDeleteNode(_id);
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Card>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <CardTitle> {code}: {name} </CardTitle>
          <div
            style={{ padding: '10px' }}
            onClick={deleteModule}
          >
            X
          </div>
        </div>

        <CardBody >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <Status label="Tasks" count={4} />
            <Status label="Functions" count={13} />
            <Status label="API Services" count={6} />
          </div>
          <Label> Description</Label>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: 13,
          }}>
            {description}
          </div>
        </CardBody>
        <Handle
          type="source"
          position={Position.Top}
          id="a"
          style={{ background: '#555' }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="b"
          style={{ background: '#555' }}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="c"
          style={{ background: '#555' }}
        />
        <Handle
          type="source"
          position={Position.Left}
          style={{ background: '#555' }}
          id="d"
        />
        <div>{data.text}</div>
      </Card>

      <SmartContractModal/>
    </>
  );
};

export default RectangleNode;
