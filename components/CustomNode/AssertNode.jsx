import { Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Input } from '../Input';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';
import _ from 'lodash';
import { AbsoluteContainer, Footer, Card, CardBody, EditingContainer, Title } from './CustomNode.style';
import Label from '../atom/Label';

const AssertNode = ({ id, data }) => {
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();
  const [mode, setMode] = useState(_.isEmpty(data) ? 'editing' : 'view');
  const [dataView, setDataView] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  useEffect(() => {
    if (mode === 'view') {
      setDataView(data?.inputs || '');
    } else {
      setDataEdit({
        value: data?.inputs,
      });
    }
  }, [data, mode]);

  const handleChange = (e) => {
    const value = e.target.value;

    setDataEdit({
      value,
      errorText: !value ? 'This field is required' : '',
    });
  };

  const isDataError = () => {
    let isError = false;

    if (!dataEdit?.value) {
      setDataEdit({
        ...dataEdit,
        errorText: 'This field is required',
      });
      isError = true;
    }

    return isError;
  };

  const handleConfirm = () => {
    if (isDataError()) return;

    // Update Declaration
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);
    _blocksState[index]['data'] = { inputs: dataEdit?.value };

    logicBlocks.setNodes(_blocksState);

    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
  };

  return (
    <>
      {mode === 'view' && (
        <Card>
          <CardBody>
            <Tooltip title={`Assert ("${dataView}")`} placement="top" arrow>
              <div className="data-view">{`Assert ("${dataView}")`}</div>
            </Tooltip>
          </CardBody>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>Assert</Title>
          <Label type="basic">Expression</Label>
          <Input background="dark" value={dataEdit?.value} errorText={dataEdit?.errorText} onChange={handleChange} />

          <Footer>
            <Button className="action-icon" onClick={handleCancel}>
              <IconCancel />
            </Button>
            <Button className="action-icon" onClick={handleConfirm}>
              <IconConfirm />
            </Button>
          </Footer>
        </EditingContainer>
      )}
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
    </>
  );
};

export default AssertNode;
