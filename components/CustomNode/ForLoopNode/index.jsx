import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';
import FreeText from './FreeText';
import Scrollbars from 'react-custom-scrollbars';
import Expression from '@/components/Expression';
import ObjectID from 'bson-objectid';
import { ErrorMessage } from '@/components/atom/Message.style';
import { useDispatch } from 'react-redux';
import {
  AbsoluteContainer,
  ButtonWrapper,
  Card,
  CardBody,
  ContentWrapper,
  EditFormContainer,
  ForBlock,
  FormFooter,
  FormTitle,
  Label,
  ParentAbsoluteContainer,
} from './index.style';

const REQUIRE_MESSAGE = 'This field is required';

const ForLoopConditionNode = ({ id, data }) => {
  const [mode, setMode] = useState('view');
  const [start, setStart] = useState('');
  const [startError, setStartError] = useState('');
  const [step, setStep] = useState('');
  const [stepError, setStepError] = useState('');
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
  const { logicBlocks } = useDispatch();

  const validate = () => {
    let hasError = false;
    if (!start) {
      setStartError(REQUIRE_MESSAGE);
      hasError = true;
    }
    if (!step) {
      setStepError(REQUIRE_MESSAGE);
      hasError = true;
    }
    const updatedCondition = condition.map((item) => {
      if (!item.expression) {
        hasError = true;
        return { ...item, error: REQUIRE_MESSAGE };
      }
      return item;
    });
    setCondition(updatedCondition);
    return hasError;
  };

  const handleConfirm = () => {
    if (validate()) return;
    const _condition = condition.map(({ error, ...others }) => ({ ...others }));
    const data = {
      start,
      condition: _condition,
      step,
    };

    logicBlocks.updateNode(id, data);
    setMode('view');
  };

  const handleStartChange = (value) => {
    setStart(value);
    setStartError(value ? '' : REQUIRE_MESSAGE);
  };

  const handleStepChange = (value) => {
    setStep(value);
    setStepError(value ? '' : REQUIRE_MESSAGE);
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
            <Box sx={{ flexGrow: 1 }}>
              <Scrollbars>
                <ContentWrapper sx={{}}>
                  <div>
                    <Label>Start</Label>
                    <FreeText nodeId={id} value={start} setValue={handleStartChange} />
                    {startError && <ErrorMessage customStyle={{ marginTop: 5 }}>{startError}</ErrorMessage>}
                  </div>

                  <div>
                    <Label>Condition</Label>
                    <Expression data={condition} setData={setCondition} nodeId={id} />
                  </div>
                  <div>
                    <Label>Step</Label>
                    <FreeText nodeId={id} value={step} setValue={handleStepChange} />
                    {stepError && <ErrorMessage customStyle={{ marginTop: 5 }}>{stepError}</ErrorMessage>}
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
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default ForLoopConditionNode;
