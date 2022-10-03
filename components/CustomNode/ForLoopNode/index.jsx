import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';

const Card = styled('article')(({ theme, width, height }) => ({
  padding: '10px 15px',
  width: width || 700,
  height: height || 500,
  backgroundColor: theme.palette.background.parentNode,
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  border: `1px dashed`,
  borderColor: theme.palette.text.primary,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
});

const ForBlock = styled('div')(({ theme }) => ({
  padding: '10px 15px',
  width: 120,
  height: 70,
  backgroundColor: theme.shape.backgroundNode,
  color: theme.palette.text.primary,
  position: 'relative',
  top: -10,
  left: -15,
  borderRadius: '0 0 6px 0',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  '& p': {
    margin: 0,
    flexGrow: 1,
  },
}));

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 10,
  '.action-icon': {
    minWidth: 28,
    background: theme.palette.success.main,
    opacity: 0.8,
    '&:hover': {
      background: theme.palette.success.main,
      opacity: 1,
    },
  },
}));

const ParentAbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  position: 'absolute',
  height: 25,
  right: 0,
  top: -25,
  gap: 2,
  '.action-icon': {
    minWidth: 28,
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.light,
    },
  },
}));

const ForLoopConditionNode = ({ id, data }) => {
  const [mode, setMode] = useState('view');
  return (
    <>
      <Card width={data?.size.width} height={data?.size.height}>
        <ParentAbsoluteContainer className="action-node">
          <ButtonRemoveNode id={id} />
        </ParentAbsoluteContainer>
        <ForBlock>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
          </AbsoluteContainer>
          <p>For</p>
        </ForBlock>
        <CardBody>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default ForLoopConditionNode;
