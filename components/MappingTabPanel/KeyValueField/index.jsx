import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material';
import useMappingData from '../useMappingData';
import _ from 'lodash';
import Key from './Key';
import Value from './Value';

const Container = styled('div')({
  marginBottom: 30,
  position: 'relative',
});

const AddButtonContainer = styled('div')(({ theme, left }) => ({
  position: 'absolute',
  marginLeft: left,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  gap: 10,
  fontFamily: 'Segoe UI',
  cursor: 'pointer',
}));

const KeyValuePairContainer = styled('div')(({ marginleft }) => ({
  paddingTop: 30,
  position: 'relative',
  marginLeft: marginleft,
}));

const Line = styled('div')(({ theme }) => ({
  width: 1,
  background: theme.palette.primary.main,
  position: 'absolute',
  top: 0,
  height: 'calc(100% - 23px)',
}));

const LeftPosition = 70;

export const PAIR_TYPE = {
  first: 'firstPair',
  middle: 'middlePair',
  last: 'lastPair',
};

const KeyValueField = ({ id, mappingList, setMappingList }) => {
  const [data, updateData] = useMappingData(id);
  const [keyValues, setKeyValues] = useState([]);

  const addNewKeyValuePair = () => {
    let updatedKeyValues = [...keyValues];
    updatedKeyValues[updatedKeyValues.length - 1].value = 'map';
    updatedKeyValues.push({ key: '', value: '' });
    setKeyValues(updatedKeyValues);
  };

  useEffect(() => {
    if (!data) return;
    let keyValueArr = [];
    let keyValueObj = { map: data.type };
    let loop = true;
    while (loop) {
      const _data = keyValueObj.map;
      const {
        key,
        values: { type },
      } = _data;

      keyValueArr.push({ key, value: type });
      keyValueObj = { ..._data.values };
      if (_.isEmpty(keyValueObj.map)) loop = false;
      setKeyValues(keyValueArr);
    }
  }, []);

  const updateKey = (pairIndex, key) => {
    let updatedKeyValues = [...keyValues];
    updatedKeyValues[pairIndex].key = key;
    setKeyValues(updatedKeyValues);
  };

  const updateValue = (value) => {
    let updatedKeyValues = [...keyValues];
    const pairIndex = updatedKeyValues.length - 1;
    updatedKeyValues[pairIndex].value = value;
    setKeyValues(updatedKeyValues);
  };

  const returnToPreviousValue = (id) => {
    let updatedKeyValues = keyValues.splice(0, id + 1);
    setKeyValues(updatedKeyValues);
  };

  useEffect(() => {
    if (keyValues.length === 0) return;
    const keyValuesObj = keyValues.reduceRight((obj, pair) => {
      const { key, value } = pair;
      return {
        key: key,
        values: {
          type: obj ? 'map' : value,
          map: obj,
        },
      };
    }, null);
    updateData({ type: keyValuesObj });
  }, [keyValues]);

  return (
    <Container>
      {keyValues?.map((item, index) => {
        const { key, value } = item;
        let type = index === 0 ? PAIR_TYPE.first : index === keyValues.length - 1 ? PAIR_TYPE.last : PAIR_TYPE.middle;
        return (
          <KeyValuePairContainer
            key={index}
            marginleft={index === 0 ? 0 : `calc(${LeftPosition}px*${index - 1} + 20px)`}>
            <Key
              value={key}
              type={type}
              lenthOfData={keyValues.length}
              id={index}
              updateKey={updateKey}
              mappingList={mappingList}
              setMappingList={setMappingList}
            />
            <Value
              value={value}
              type={type}
              lenthOfData={keyValues.length}
              id={index}
              updateValue={updateValue}
              returnToPreviousValue={returnToPreviousValue}
              mappingList={mappingList}
              setMappingList={setMappingList}
            />
            {type !== PAIR_TYPE.first && <Line />}
          </KeyValuePairContainer>
        );
      })}
      {keyValues.length < 3 && (
        <AddButtonContainer
          left={`calc(${LeftPosition}px*${keyValues.length - 1} + 30% + 60px)`}
          onClick={addNewKeyValuePair}>
          <AddCircleIcon sx={{ fontSize: 22 }} />
          <span style={{ whiteSpace: 'nowrap' }}>Add new key-value pair</span>
        </AddButtonContainer>
      )}
    </Container>
  );
};

export default KeyValueField;
