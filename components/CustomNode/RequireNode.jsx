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
import { AbsoluteContainer, Footer, Card, CardBody, EditingContainer, Title, Body } from './CustomNode.style';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import { CONDITION_OPTION, CONDITION_TYPE, convertCondition, ELEMENT_TYPE } from '@/config/constant/common';
import ObjectID from 'bson-objectid';
import Label from '../atom/Label';
import Scrollbars from 'react-custom-scrollbars';

const RequireNode = ({ id, data }) => {
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();
  const [mode, setMode] = useState(_.isEmpty(data) ? 'editing' : 'view');
  const [listData, setListData] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});

  const convertDataView = () => {
    const condition = [];
    for (let index = 0; index < data?.inputs?.length; index += 2) {
      condition.push(data?.inputs[index]);
    }
    setDataView(condition);
  };

  useEffect(() => {
    if (mode === 'view') {
      if (data?.inputs) {
        // Data after change
        convertDataView();
      } else {
        // data from api
        const { dataShow } = convertCondition({ node: data });
        setDataView(dataShow);
      }
      return;
    }

    // Data after change
    if (data?.inputs?.length) {
      const dataConvert = [];
      for (let index = 0; index <= data?.inputs?.length - 2; index += 2) {
        dataConvert.push({
          id: ObjectID(32).toHexString(),
          condition: data?.inputs[index],
          operation: data?.inputs[index + 1],
        });
      }
      setListData(dataConvert);
      setErrorMessage(data?.errorMessage);
      return;
    }

    // data from api
    if (!data?.params?.condition?.operations?.length) {
      setListData([{ id: ObjectID(32).toHexString(), condition: '', operation: CONDITION_TYPE.NONE }]);
      setErrorMessage({ value: '', errorText: '' });
    } else {
      const { dataEdit } = convertCondition({ node: data });
      const dataConvert = [];
      for (let index = 0; index <= dataEdit?.length - 2; index += 2) {
        dataConvert.push({
          id: ObjectID(32).toHexString(),
          condition: dataEdit[index],
          operation: dataEdit[index + 1],
        });
      }
      setListData(dataConvert);
      setErrorMessage({ value: data?.params?.value?.value });
    }
  }, [data, mode]);

  const handleChange = (itemId, field, e, type) => {
    if (field === 'errorMessage') {
      const temp = {
        value: e.target.value,
        errorText: e.target.value ? '' : 'This field is required',
      };
      setErrorMessage(temp);
    } else {
      const iData = listData.findIndex(({ id }) => id === itemId);
      let dataClone = [...listData];
      switch (type) {
        case ELEMENT_TYPE.INPUT:
          dataClone[iData][field] = e.target.value;
          dataClone[iData]['errorCondition'] = e.target.value ? '' : 'This field is required';
          break;
        case ELEMENT_TYPE.SELECT:
          dataClone[iData][field] = e.value;
          if (
            dataClone[dataClone.length - 1].operation === CONDITION_TYPE.AND ||
            dataClone[dataClone.length - 1].operation === CONDITION_TYPE.OR
          ) {
            dataClone.push({ id: ObjectID(32).toHexString(), condition: '', operation: CONDITION_TYPE.NONE });
          } else if (e.value === CONDITION_TYPE.NONE) {
            dataClone = dataClone.slice(0, iData + 1);
          }
          break;
        default:
          break;
      }

      setListData(dataClone);
    }
  };

  const isDataError = () => {
    let isError = false;

    if (!errorMessage?.value) {
      setErrorMessage({ value: '', errorText: 'This field is required' });
      isError = true;
    }

    const temp = listData.map((item) => {
      if (!item?.condition) {
        item.errorCondition = 'This field is required';
        isError = true;
      }
      return item;
    });
    setListData(temp);

    return isError;
  };

  const handleConfirm = () => {
    if (isDataError()) return;
    const inputs = [];
    for (let index = 0; index < listData.length; index++) {
      inputs.push(listData[index].condition);
      inputs.push(listData[index].operation);
    }
    // Update Declaration
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);
    _blocksState[index]['data'] = { inputs, errorMessage };

    logicBlocks.setNodes(_blocksState);

    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
  };

  useEffect(() => {
    let size = { width: 200, height: 100 };
    if (mode === 'editing') size = { width: 468, height: 350 };
    logicBlocks.updateNode(id, { size });
  }, [mode]);

  return (
    <>
      {mode === 'view' && (
        <Card className="nodrag">
          <CardBody>
            <Tooltip title={`Require: ${dataView}`} placement="top" arrow>
              <div className="data-view">{`Require: ${dataView}`}</div>
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
        <EditingContainer className="nodrag">
          <Title>Require</Title>
          <Label type="basic">Condition</Label>
          <Scrollbars
            style={{
              height: 140,
              overflowX: 'hidden',
            }}>
            <div className="pr-10 nowheel">
              {listData?.length &&
                listData.map((item) => {
                  return (
                    <Body key={item?.id} isError={!!item?.errorCondition}>
                      <Input
                        background="dark"
                        value={item?.condition}
                        errorText={item?.errorCondition}
                        onChange={(e) => handleChange(item?.id, 'condition', e, ELEMENT_TYPE.INPUT)}
                      />
                      <div className="operation">
                        <SingleAutoComplete
                          value={CONDITION_OPTION.find((option) => option.value === item?.operation)}
                          options={CONDITION_OPTION}
                          onChange={(e, newValue) => handleChange(item?.id, 'operation', newValue, ELEMENT_TYPE.SELECT)}
                        />
                      </div>
                    </Body>
                  );
                })}
            </div>
          </Scrollbars>
          <Label type="basic">Error message</Label>
          <div className="pr-10">
            <Input
              background="dark"
              value={errorMessage?.value}
              errorText={errorMessage?.errorText}
              onChange={(e) => handleChange('', 'errorMessage', e, ELEMENT_TYPE.INPUT)}
            />
          </div>

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

export default RequireNode;
