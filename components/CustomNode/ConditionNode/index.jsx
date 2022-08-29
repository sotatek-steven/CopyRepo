import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
// import { Input } from '../Input/input.style';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';
import { Input } from '@/components/Input/input.style';

const CardBody = styled('article')(({ theme }) => ({
  border: 'solid 1px #BEA75A',
  borderRadius: '4px',
  width: '140px',
  height: '140px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#BEA75A' : '#BEA75A',
  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
}));

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.background.dark,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const EditingContainer = styled('div')(({ theme }) => ({
  padding: 30,
  width: 468,
  border: `1.5px dashed ${theme.palette.success.main}`,
  background: theme.palette.background.light,
}));

const Title = styled('div')(({ theme }) => ({
  width: '60px',
  height: '60px',
  position: 'absolute',
  color: theme.palette.background.dark,
  padding: '16px 10px',
  textAlign: 'center',
  transform: 'translate(-100% ,-100%)',
  background: theme.shape.backgroundNode,
  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
}));

const Body = styled('div')({
  height: 100,
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
});

const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));

// const Content = styled('p')(({ theme }) => ({
//   margin: 0,
//   textAlign: 'center',
//   fontSize: 14,
//   fontFamily: 'Segoe UI',
//   fontWeight: theme.typography.fontWeightBold,
//   ...theme.components.truncate.twoLineEllipsis,
//   wordBreak: 'break-all',
// }));

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
    opacity: 0.5,
    '&:hover': {
      background: theme.palette.success.main,
      opacity: 1,
    },
  },
}));

const ButtonWrapper = styled('div')({
  padding: '0px 12px',
  cursor: 'pointer',
});

const ConditionNode = ({ data, id }) => {
  const [mode, setMode] = useState('editing');
  const [errorMessage, setErrorMessage] = useState('this is an error');
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    // if (!variable) {
    //   setErrorMessage('Missing variable');
    //   return;
    // }

    // if (!value) {
    //   setErrorMessage('Missing variable');
    //   return;
    // }

    setErrorMessage('');
    // const { label, isArray, position } = variable;
    // const updatedData = {
    //   ...data,
    //   indentifier: label,
    //   isArray,
    //   position,
    //   assignOperation: '=',
    //   value,
    // };

    // logicBlocks.updateBlock(updatedData);
    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
  };

  return (
    <>
      {mode === 'view' && (
        <Card>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
          <CardBody onDoubleClick={() => setMode('editing')}>IF</CardBody>

          <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
          <Handle type="target" position={Position.Right} style={{ background: '#555' }} />
          <Handle type="target" position={Position.Bottom} style={{ background: '#555' }} />
          <Handle type="source" position={Position.Left} style={{ background: '#555' }} />
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>If</Title>
          <Body>
            <Input background="dark" value={value} onChange={handleChange} onKeyDown={handleChange} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Body>
          <Footer>
            <ButtonWrapper className="action-icon" onClick={handleCancel}>
              <IconCancel />
            </ButtonWrapper>
            <ButtonWrapper className="action-icon" onClick={handleConfirm}>
              <IconConfirm />
            </ButtonWrapper>
          </Footer>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </EditingContainer>
      )}
    </>
  );
};

export default ConditionNode;
