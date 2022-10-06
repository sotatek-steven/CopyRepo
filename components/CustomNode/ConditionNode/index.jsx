import { Button, styled, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import SingleAutoComplete from '@/components/AutoComplete/SingleAutoComplete';
import {
  CONDITION_OPTION,
  CONDITION_TYPE,
  convertLogicBlock,
  ELEMENT_TYPE,
  mapOperations,
} from '@/config/constant/common';
import ObjectID from 'bson-objectid';
import { Input } from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';

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
  '.data-view': {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: '0 12px',
  },
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
  height: 'fit-content',
  border: `1.5px dashed ${theme.palette.success.main}`,
  background: theme.palette.background.light,
  '.nowheel': {
    height: 140,
    paddingRight: 10,
    overflowY: 'scroll',
  },
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

const Body = styled('div')(({ theme, isError }) => ({
  marginBottom: 20,
  '.operation': {
    width: '30%',
    marginTop: isError ? 0 : 20,

    '.MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  right: 20,
  bottom: 20,
});

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  top: 0,
  right: 15,
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
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);
  const { logicBlocks } = useDispatch();

  const [listData, setListData] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [mode, setMode] = useState('view');

  const convertDataView = () => {
    let condition = data?.params?.inputs[0] || '';
    for (let index = 1; index < data?.params?.inputs?.length - 1; index += 2) {
      condition = `${condition}${mapOperations[`${data?.params?.inputs[index]}`]}${data?.params?.inputs[index + 1]}`;
    }
    setDataView(condition);
  };

  useEffect(() => {
    if (mode === 'view') {
      if (data?.params?.inputs) {
        // Data after change
        convertDataView();
      } else if (data?.conditions) {
        // data from api
        const { dataShow } = convertLogicBlock({ node: data });
        setDataView(dataShow);
      }
      return;
    }
    // Data after change
    if (data?.params?.inputs?.length) {
      const dataConvert = [];
      for (let index = 0; index <= data?.params?.inputs?.length - 2; index += 2) {
        dataConvert.push({
          id: ObjectID(32).toHexString(),
          condition: data?.params?.inputs[index],
          operation: data?.params?.inputs[index + 1],
        });
      }
      setListData(dataConvert);
      return;
    }
    // data from api
    if (!data?.conditions?.length) {
      setListData([{ id: ObjectID(32).toHexString(), condition: '', operation: CONDITION_TYPE.NONE }]);
    } else {
      const { dataEdit } = convertLogicBlock({ node: data });
      const dataConvert = [];
      for (let index = 0; index <= dataEdit?.length - 2; index += 2) {
        dataConvert.push({
          id: ObjectID(32).toHexString(),
          condition: dataEdit[index],
          operation: dataEdit[index + 1],
        });
      }
      setListData(dataConvert);
    }
  }, [data, mode]);

  const isDataError = () => {
    let isError = false;
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
    // check data
    if (isDataError()) return;

    // if haven't error
    const inputs = [];
    for (let index = 0; index < listData.length; index++) {
      inputs.push(listData[index].condition);
      inputs.push(listData[index].operation);
    }
    // Update Declaration
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);
    _blocksState[index]['data']['params'] = { inputs };

    logicBlocks.setNodes(_blocksState);
    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
  };

  const handleChange = (itemId, field, e, type) => {
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
  };

  return (
    <>
      {mode === 'view' && (
        <Card className="nodrag">
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
          </AbsoluteContainer>
          <CardBody onDoubleClick={() => setMode('editing')}>
            <Tooltip title={`If: ${dataView}`} placement="top" arrow>
              <div className="data-view">{`If: ${dataView}`}</div>
            </Tooltip>
          </CardBody>

          <Handle type="source" position={Position.Right} id="right" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Left} id="left" style={{ background: '#555' }} />
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer className="nodrag">
          <Title>If</Title>
          <div className="nowheel">
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

          <Footer>
            <ButtonWrapper className="action-icon" onClick={handleCancel}>
              <IconCancel />
            </ButtonWrapper>
            <ButtonWrapper className="action-icon" onClick={handleConfirm}>
              <IconConfirm />
            </ButtonWrapper>
          </Footer>
          <Handle type="target" position={Position.Top} id="top" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Left} id="left" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Right} id="right" style={{ background: '#555' }} />
        </EditingContainer>
      )}
    </>
  );
};

export default ConditionNode;
