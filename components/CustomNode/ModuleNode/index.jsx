import { Handle, Position } from 'react-flow-renderer';
import React from 'react';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModuleActionPopover from './ModuleActionPopover';
import SmartContractModal from '@/components/SmartcontractModal';

const Card = styled('div')(({ theme }) => ({
  border: 'solid 1px',
  borderRadius: '4px',
  width: '260px',
  backgroundColor: theme.shape.backgroundNode,
  cursor: 'pointer',
}));

const CardTitle = styled('div')(({ theme }) => ({
  padding: '10px',
  color: theme.palette.background.dark,
  fontSize: 14,
  fontWeight: 600,
  ...theme.components.truncate.singleLineEllipsis,
  flexGrow: 1,
}));

const CardBody = styled('div')(({ theme }) => ({
  borderRadius: '0px 0px 4px 4px',
  padding: '10px',
  backgroundColor: theme.palette.background.dark,
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: 'Segoe UI',
  marginBottom: '5px',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 300,
  ...theme.components.truncate.threeLineEllipsis,
}));

const Button = styled('button')({
  border: 'none',
  outline: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  padding: 5,
  cursor: 'pointer',
});

const RectangleNode = ({ data, id }) => {
  const { description, code, name, onDeleteNode, _id: moduleId, event, color } = data;

  const deleteModule = (event) => {
    event.stopPropagation();
    if (!onDeleteNode) return;
    onDeleteNode(id, moduleId);
  };

  return (
    <>
      <Card
        sx={{
          background: color || '#BEA75A',
          borderColor: color || '#BEA75A',
        }}>
        <div
          style={{
            display: 'flex',
          }}>
          <CardTitle>
            {code}: {name}
          </CardTitle>
          <Button>
            <ModuleActionPopover data={data} />
          </Button>

          <Button onClick={deleteModule}>
            <CloseIcon sx={{ fontSize: 17 }} />
          </Button>
        </div>

        <CardBody>
          <Label> Description</Label>
          <Description>{description}</Description>
        </CardBody>
        <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
        <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        <div>{data.text}</div>
      </Card>

      <SmartContractModal openDefault={event ? false : false} />
    </>
  );
};

export default RectangleNode;
