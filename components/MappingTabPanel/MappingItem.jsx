import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyValueField from './KeyValueField';
import MapToFunctionField from './MapToFunctionField';
import ScopeField from './ScopeField';
import VariableNameField from './VariableNameField';
import CloseIcon from '@mui/icons-material/Close';
import useMappingData from './useMappingData';
import _ from 'lodash';

const RemoveButton = styled(CloseIcon)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '50%',
  color: theme.palette.common.black,
  fontSize: 22,
  marginBottom: 12,
  cursor: 'pointer',
}));

const MappingItem = (props) => {
  const { removeItem, id, functions } = props;
  const [data] = useMappingData(props.id);
  const [mappingList, setMappingList] = useState([]);

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
    }
    const { value } = keyValueArr[keyValueArr.length - 1];
    const _functions = functions?.map((item) => {
      return {
        ...item,
        matching: value === '' ? true : value === item.type, //matching type with key-value field
      };
    });

    setMappingList(_functions);
  }, [functions, data.type]);

  const handleClick = () => {
    if (!removeItem) return;
    removeItem(id);
  };

  return (
    <div style={{ marginBottom: 60 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ScopeField {...props} />
        </Grid>
        <Grid item xs={3}>
          <VariableNameField {...props} />
        </Grid>
        <Grid item xs={3}>
          <MapToFunctionField {...props} mappingList={mappingList} setMappingList={setMappingList} />
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', alignItems: 'end' }}>
          <RemoveButton onClick={handleClick} />
        </Grid>
      </Grid>
      <KeyValueField {...props} mappingList={mappingList} setMappingList={setMappingList} />
    </div>
  );
};

export default MappingItem;
