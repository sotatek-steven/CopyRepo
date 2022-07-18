import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyValuePairComponent, { PAIR_TYPE } from './KeyValuePairComponent';
import { styled } from '@mui/material';
import useMappingData from './useMappingData';
import _ from 'lodash';

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

const LeftPosition = 70;

const KeyValueField = ({ id }) => {
  const [data, updateData] = useMappingData(id);
  const [keyValues, setKeyValues] = useState([]);

  const addNewKeyValuePair = () => {
    if (data.length >= 3) return;
    let updatedKeyValues = [...keyValues];
    updatedKeyValues[updatedKeyValues.length - 1].value = 'map';
    updatedKeyValues.push({ key: '', value: '' });
    setKeyValues(updatedKeyValues);

    const keyValuesObj = updatedKeyValues.reduceRight((obj, pair) => {
      const { key, value } = pair;
      return {
        key: key,
        value: {
          type: value,
          map: obj,
        },
      };
    }, {});
    updateData({ type: keyValuesObj });
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
        value: { type },
      } = _data;

      keyValueArr.push({ key, value: type });
      keyValueObj = { ..._data.value };
      if (_.isEmpty(keyValueObj.map)) loop = false;
      setKeyValues(keyValueArr);
    }
  }, [data]);

  return (
    <Container>
      {keyValues?.map((item, index) => {
        let type = index === 0 ? PAIR_TYPE.first : index === data.length - 1 ? PAIR_TYPE.last : PAIR_TYPE.middle;
        return (
          <KeyValuePairContainer
            key={index}
            marginleft={index === 0 ? 0 : `calc(${LeftPosition}px*${index - 1} + 20px)`}>
            <KeyValuePairComponent data={item} type={type} lenthOfData={keyValues.length} />
          </KeyValuePairContainer>
        );
      })}
      <AddButtonContainer
        left={`calc(${LeftPosition}px*${keyValues.length - 1} + 30% + 60px)`}
        onClick={addNewKeyValuePair}>
        <AddCircleIcon sx={{ fontSize: 22 }} />
        <span style={{ whiteSpace: 'nowrap' }}>Add new key-value pair</span>
      </AddButtonContainer>
    </Container>
  );
};

export default KeyValueField;
