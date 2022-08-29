import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { PrimaryButton } from '../ButtonStyle';
import { Button, Grid, styled, TextField, useTheme } from '@mui/material';
import { BaseAutocomplete, StyledPopper } from '../AutoComplete/AutoComplete.style';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Input } from '../Input/input.style';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';

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

const CardBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
}));

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
  padding: '0px 20px',
});

const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));

const Body = styled('div')({
  height: 130,
});

const AssignmentNode = ({ data }) => {
  const theme = useTheme();
  const [mode, setMode] = useState('editing');
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

  const [variable, setVariable] = useState(data?.indentifier);
  const [value, setValue] = useState(data?.value);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVariableChange = (e, value) => {
    console.log(value);
    setVariable(value);
  };

  const handleValueChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
  };

  const handleConfirm = () => {
    if (!variable) {
      setErrorMessage('Missing variable');
      return;
    }

    if (!value) {
      setErrorMessage('Missing variable');
      return;
    }

    setErrorMessage('');
    const { label, isArray, position } = variable;
    const updatedData = {
      ...data,
      indentifier: label,
      isArray,
      position,
      assignOperation: '=',
      value,
    };

    logicBlocks.updateBlock(updatedData);
    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
  };

  return (
    <>
      {mode === 'view' && (
        <Card onDoubleClick={() => setMode('editing')}>
          <CardBody>
            {`${variable} = ${value}`}
            <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
            <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
          </CardBody>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>Assignment</Title>
          <Body>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <BaseAutocomplete
                  background={theme.palette.background.default}
                  options={variableOptions}
                  value={value}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={handleVariableChange}
                  PopperComponent={StyledPopper}
                />
              </Grid>
              <Grid item xs={2}>
                <EqualWrapper>
                  <span>=</span>
                </EqualWrapper>
              </Grid>
              <Grid item xs={6}>
                <Input background="default" value={value} onChange={handleValueChange} />
              </Grid>
            </Grid>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Body>
          <Footer>
            <Button className="action-icon" onClick={handleCancel}>
              <IconCancel />
            </Button>
            <Button className="action-icon" onClick={handleConfirm}>
              <IconConfirm />
            </Button>
          </Footer>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </EditingContainer>
      )}
    </>
  );
};

export default AssignmentNode;
