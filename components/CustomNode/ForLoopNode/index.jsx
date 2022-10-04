import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
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
  color: theme.palette.primary.contrastText,
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

const EditFormContainer = styled('div')(({ theme }) => ({
  width: 364,
  height: 500,
  background: theme.palette.background.light,
  border: `1.5px dashed ${theme.palette.success.main}`,
  padding: '30px',
  position: 'absolute',
  top: -450,
  left: '-100%',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
}));

const FormTitle = styled('div')(({ theme }) => ({
  backgroundColor: theme.shape.backgroundNode,
  padding: '7px 30px',
  position: 'absolute',
  top: '-20px',
  left: '-30px',
  color: theme.palette.primary.contrastText,
}));

const FormBody = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const FormFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
}));

const ButtonWrapper = styled('div')({
  height: 45,
  width: 45,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  cursor: 'pointer',
  '&:hover': {
    background: '#504e4d',
  },
});

const ForLoopConditionNode = ({ id, data }) => {
  const [mode, setMode] = useState('view');

  const handleCancel = () => {
    setMode('view');
  };

  const handleConfirm = () => {
    setMode('view');
  };

  return (
    <>
      <Card className="nodrag" width={data?.size.width} height={data?.size.height}>
        <ParentAbsoluteContainer className="action-node">
          <ButtonRemoveNode id={id} />
        </ParentAbsoluteContainer>
        {mode === 'view' ? (
          <ForBlock>
            <AbsoluteContainer className="action-node">
              <Button className="action-icon" onClick={() => setMode('editing')}>
                <IconEditNode />
              </Button>
            </AbsoluteContainer>
            <p>For</p>
          </ForBlock>
        ) : (
          <EditFormContainer>
            <FormTitle>
              <span>For</span>
            </FormTitle>
            <FormBody></FormBody>
            <FormFooter>
              <ButtonWrapper className="action-icon" onClick={handleCancel}>
                <IconCancel />
              </ButtonWrapper>
              <ButtonWrapper className="action-icon" onClick={handleConfirm}>
                <IconConfirm />
              </ButtonWrapper>
            </FormFooter>
          </EditFormContainer>
        )}
        <CardBody>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default ForLoopConditionNode;
