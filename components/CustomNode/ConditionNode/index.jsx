import { Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import ButtonRemoveNode from '@/components/atom/ButtonRemoveNode';
import SingleAutoComplete from '@/components/AutoComplete/SingleAutoComplete';
import { CONDITION_OPTION, CONDITION_TYPE, ELEMENT_TYPE } from '@/config/constant/common';
import ObjectID from 'bson-objectid';
import { Input } from '@/components/Input';

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
  height: 'fit-content',
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
  position: 'absolute',
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
  const [listData, setListData] = useState([]);
  const [mode, setMode] = useState('view');

  useEffect(() => {
    if (!data?.length) {
      setListData([{ id: ObjectID(32).toHexString(), condition: '', operation: CONDITION_TYPE.NONE }]);
    }
  }, [data]);

  const handleConfirm = () => {
    // if (!variable) {
    //   setErrorMessage('Missing variable');
    //   return;
    // }
    // if (!value) {
    //   setErrorMessage('Missing variable');
    //   return;
    // }
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
    // setMode('view');
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
        <Card>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
          </AbsoluteContainer>
          <CardBody onDoubleClick={() => setMode('editing')}>IF</CardBody>

          <Handle type="target" position={Position.Top} id="top" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Right} id="right" style={{ background: '#555' }} />
          <Handle type="target" position={Position.Bottom} id="bottom" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Left} id="left" style={{ background: '#555' }} />
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>If</Title>
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
