import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';
import FreeText from '../../atom/FreeText';
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

const convertDataToText = (start, condition, step) => {
  if (!start || !step) return 'For';
  console.log('start: ', start);
  let text = start.trim() + '; ';
  for (const { expression, logicalOperator } of condition) {
    text = text + expression.trim();
    if (logicalOperator === 'end') {
      text = text + '; ';
    } else {
      text = text + ' ' + logicalOperator + ' ';
    }
  }

  console.log('text: ', text);
  text = text + step.trim();

  // console.log('text: ', text);
  return 'for(' + text + ')';
};

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

  useEffect(() => {
    //system function has no edit field
    if (!data.edit) {
      console.log('condition: ', data);
      const { start, condition, step } = data;
      //convert start, condition, step to corresponding state

      // const convertToText = ({ indentifier, assignOperation, value }) => {
      //   return assignOperation ? indentifier + ' ' + assignOperation + ' ' + value.value : indentifier;
      // };

      // const _start = convertToText(start);
      // const _condition = convertConditionForLoop(condition);
      // const _step = convertToText(step);
      // setStart(_start);
      // setCondition(_condition);
      // setStep(_step);
      return;
    }
    const { start, condition, step } = data.edit;
    setStart(start);
    const _condition = condition.map((item) => ({ ...item, error: '' }));
    setCondition(_condition);
    setStep(step);
  }, [data, mode]);

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
    const _data = {
      start,
      condition: _condition,
      step,
    };

    logicBlocks.updateNode(id, { ...data, edit: _data });
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
            <p>{convertDataToText(start, condition, step)}</p>
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
          <Handle type="target" position={Position.Top} id="top" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#555' }} />
        </CardBody>
      </Card>
    </>
  );
};

export default ForLoopConditionNode;
