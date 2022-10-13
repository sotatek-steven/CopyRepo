import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';
import { Box, Button, styled } from '@mui/material';
import ObjectID from 'bson-objectid';
import React, { useState } from 'react';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
import {
  AbsoluteContainer,
  ButtonWrapper,
  Card,
  CardBody,
  ContentWrapper,
  ForBlock,
  FormFooter,
  FormTitle,
  Label,
  ParentAbsoluteContainer,
} from '../ForLoopNode/index.style';
import Scrollbars from 'react-custom-scrollbars';
import Expression from '@/components/Expression';
import { Handle, Position } from 'react-flow-renderer';

export const EditFormContainer = styled('div')(({ theme }) => ({
  width: 364,
  height: 240,
  background: theme.palette.background.light,
  border: `1.5px dashed ${theme.palette.success.main}`,
  position: 'absolute',
  top: -180,
  left: '-100%',
  zIndex: 1000,
  padding: '20px 0px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

const WhileLoopNode = ({ id, data }) => {
  const [mode, setMode] = useState('view');
  const [condition, setCondition] = useState([
    {
      _id: ObjectID(24).toHexString(),
      expression: '',
      logicalOperator: 'end',
      error: '',
    },
  ]);

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
            <p>While</p>
          </ForBlock>
        ) : (
          <EditFormContainer height={250}>
            <FormTitle>
              <span>For</span>
            </FormTitle>
            <Box sx={{ flexGrow: 1 }}>
              <Scrollbars>
                <ContentWrapper sx={{}}>
                  <div>
                    <Label>Condition</Label>
                    <Expression data={condition} setData={setCondition} nodeId={id} />
                  </div>
                </ContentWrapper>
              </Scrollbars>
            </Box>
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
          <Handle type="target" position={Position.Top} id="top" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default WhileLoopNode;
