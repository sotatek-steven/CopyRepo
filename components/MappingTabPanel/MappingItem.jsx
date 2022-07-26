import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyValueField from './KeyValueField';
import MapToFunctionField from './MapToFunctionField';
import ScopeField from './ScopeField';
import VariableNameField from './VariableNameField';
import CloseIcon from '@mui/icons-material/Close';
import useMappingData from './useMappingData';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const RemoveButton = styled(CloseIcon)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '50%',
  color: theme.palette.common.black,
  fontSize: 18,
  marginBottom: 12,
  cursor: 'pointer',
}));

const MappingItem = (props) => {
  const { removeItem, id } = props;
  const [data] = useMappingData(id);
  const mappingVariableOptionsState = useSelector((state) => state.mappingVariableOptions);
  const [mapToFunctionOptions, setMapToFunctionOptions] = useState([]);

  const convertMappingObjToArr = (keyValueObj) => {
    let keyValueArr = [];
    const loop = true;
    while (loop) {
      const _data = keyValueObj.map;
      const {
        key,
        values: { type },
      } = _data;

      keyValueArr.push({ key, value: type });
      keyValueObj = { ..._data.values };
      if (!keyValueObj.map) break;
    }

    return keyValueArr;
  };

  useEffect(() => {
    if (!data) return;
    const keyValueArr = convertMappingObjToArr({ map: data.type });
    const updatedOptions = mappingVariableOptionsState?.map((item) => {
      const { _id, label, subscriber, mapping, func, variable } = item;
      const typeArr = convertMappingObjToArr({ map: mapping });
      const matching = JSON.stringify(typeArr) === JSON.stringify(keyValueArr);

      return {
        _id,
        label,
        func,
        variable,
        locked: !matching || (!!subscriber && subscriber !== id),
      };
    });

    setMapToFunctionOptions(updatedOptions);
  }, [mappingVariableOptionsState, data.type]);

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
          <MapToFunctionField
            {...props}
            options={mapToFunctionOptions}
            setMapToFunctionOptions={setMapToFunctionOptions}
          />
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', marginTop: 40 }}>
          <RemoveButton onClick={handleClick} />
        </Grid>
      </Grid>
      <KeyValueField {...props} options={mapToFunctionOptions} setMapToFunctionOptions={setMapToFunctionOptions} />
    </div>
  );
};

export default MappingItem;
