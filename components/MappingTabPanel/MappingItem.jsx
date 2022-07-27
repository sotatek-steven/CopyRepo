import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyValueField from './KeyValueField';
import MapToFunctionField from './MapToFunctionField';
import ScopeField from './ScopeField';
import VariableNameField from './VariableNameField';
import CloseIcon from '@mui/icons-material/Close';
import useMappingData from './useMappingData';
import { useSelector } from 'react-redux';
import { convertMappingObjToArr } from './utils';

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

  //setup options list of map to function field
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
          {mapToFunctionOptions.length && (
            <MapToFunctionField
              {...props}
              options={mapToFunctionOptions}
              setMapToFunctionOptions={setMapToFunctionOptions}
            />
          )}
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
