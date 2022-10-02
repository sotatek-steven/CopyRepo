import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Button, Grid, styled, TextField, useTheme } from '@mui/material';
import { BaseAutocomplete, StyledPopper } from '../AutoComplete/AutoComplete.style';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Input } from '../Input/input.style';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';
import _ from 'lodash';

const Card = styled('article')(({ color, theme }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: 200,
  height: 100,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
}));

const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const EditingContainer = styled('div')(({ theme }) => ({
  padding: 30,
  width: 468,
  height: 217,
  border: `1.5px dashed ${theme.palette.success.main}`,
  background: theme.palette.background.light,
}));

const Title = styled('div')(({ theme }) => ({
  width: 'fit-content',
  background: theme.shape.backgroundNode,
  color: theme.palette.background.dark,
  position: 'absolute',
  padding: 8,
  top: '-20px',
  left: '-40px',
}));

const EqualWrapper = styled('div')({
  fontSize: 25,
  height: '100%',
  textAlign: 'center',
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  gap: 5,
});

const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));

const Body = styled('div')({
  height: 130,
});

const AbsoluteContainer = styled('div')(({ theme }) => ({
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

const ButtonWrapper = styled('div')({
  height: 45,
  width: 45,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  '&:hover': {
    background: '#504e4d',
  },
});

const AssignmentNode = ({ data, id }) => {
  const theme = useTheme();
  const { variables } = useSelector((state) => state.userModule);
  const functionState = useSelector((state) => state.userFunction);
  const { logicBlocks } = useDispatch();

  const variableOptions = useMemo(() => {
    const values = variables?.values || [];
    const _values = values.map((item) => ({ ...item, position: 'globalVariable' }));
    const params = functionState.params || [];
    const _params = params.map((item) => ({ ...item, position: 'params' }));
    return _values.concat(_params);
  }, [variables, functionState.params]);

  const [variable, setVariable] = useState(null);
  const [value, setValue] = useState('');
  const [mode, setMode] = useState(_.isEmpty(data) ? 'editing' : 'view');
  const [variableError, setVariableError] = useState('');
  const [valueError, setValueError] = useState('');

  useEffect(() => {
    if (!data.params || _.isEmpty(data.params)) {
      setVariable(null);
      setValue('');
      return;
    }

    const { identifier, value } = data.params;
    setVariable(identifier ? { label: identifier } : null);
    setValue(value || '');
  }, [data]);

  const handleVariableChange = (e, value) => {
    setVariable(value);
    if (!value) setVariableError('This field required');
    else setVariableError('');
  };

  const handleValueChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
    if (!_value) setValueError('This field required');
    else setValueError('');
  };

  const handleConfirm = () => {
    let hasError = false;
    if (!variable) {
      setVariableError('This field required');
      hasError = true;
    }
    if (!value) {
      setValueError('This field required');
      hasError = true;
    }
    if (hasError) return;

    setVariableError('');
    setValueError('');
    const { label, isArray, position } = variable;
    const updatedData = {
      identifier: label,
      isArray,
      position,
      assignOperation: '=',
      value,
    };

    logicBlocks.updateNode(id, { params: updatedData });
    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
    setVariableError('');
    setValueError('');

    if (!data) {
      setVariable(null);
      setValue('');
      return;
    }
    const { identifier, value } = data;
    setVariable(identifier ? { label: identifier } : undefined);
    setValue(value);
  };

  const handleFocus = () => {
    setValueError('');
  };

  const handleOutFocus = () => {
    if (!value) {
      setValueError('This field required');
    }
  };

  useEffect(() => {
    let size = { width: 200, height: 100 };
    if (mode === 'editing') size = { width: 468, height: 213 };
    logicBlocks.updateNode(id, { size });
  }, [mode]);

  return (
    <>
      {mode === 'view' && (
        <Card onDoubleClick={() => setMode('editing')}>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
          <CardBody>
            {variable && value ? `${variable.label} = ${value}` : 'Assignment Block'}
            <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
            <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
          </CardBody>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>Assignment</Title>
          <Body>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <BaseAutocomplete
                  background={theme.palette.background.default}
                  options={variableOptions}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  value={variable}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={handleVariableChange}
                  PopperComponent={StyledPopper}
                  error={variableError ? 1 : 0}
                />
                {variableError && <ErrorMessage>{variableError}</ErrorMessage>}
              </Grid>
              <Grid item xs={1}>
                <EqualWrapper>
                  <span>=</span>
                </EqualWrapper>
              </Grid>
              <Grid item xs={6}>
                <Input
                  onFocus={handleFocus}
                  onBlur={handleOutFocus}
                  error={valueError ? 1 : 0}
                  background="default"
                  value={value}
                  onChange={handleValueChange}
                />
                {valueError && <ErrorMessage>{valueError}</ErrorMessage>}
              </Grid>
            </Grid>
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

export default AssignmentNode;
