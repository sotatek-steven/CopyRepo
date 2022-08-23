import { Box, Grid, styled } from '@mui/material';
import React, { useEffect } from 'react';
import Select from '../Select';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IS_ARRAY_OPTION, LOCATION_OPTIONS, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import { useSelector } from 'react-redux';
import ParameterName from './ParameterName';

const RemoveButton = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  paddingTop: 10,
}));

const ParameterItem = ({ data, onRemove, onUpdate }) => {
  const { label, type, isArray, location, _id } = data;
  const moduleState = useSelector((state) => state.userModule);

  const handleLabelChange = (updatedLabel) => {
    const updatedData = { ...data, label: updatedLabel };
    onUpdate(updatedData);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    const updatedData = { ...data, location: value };
    onUpdate(updatedData);
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const updatedData = { ...data, type: value };
    onUpdate(updatedData);
  };

  const handleIsArrayChange = (event) => {
    const value = event.target.value;
    const updatedData = { ...data, isArray: value };
    onUpdate(updatedData);
  };

  const getTypeOptions = () => {
    const { structs, enums } = moduleState.sources;

    const structOptions = structs.map((item) => ({
      value: item.name,
      label: item.name,
    }));

    const enumOptions = enums.map((item) => ({
      value: item.name,
      label: item.name,
    }));

    const options = VALUE_TYPE_OPTIONS.concat(structOptions, enumOptions);
    return options;
  };

  useEffect(() => {
    const updateLocation = () => {
      const { structs } = moduleState.sources;
      const structOptions = structs.map((item) => item.name);
      const bytesOptions = [];
      VALUE_TYPE_OPTIONS.forEach((item) => {
        if (item.value.includes('bytes')) bytesOptions.push(item.value);
      });
      const typeIsArray = ['string', ...bytesOptions, ...structOptions];

      let _location = location;
      if (!typeIsArray.find((item) => item === type) && !isArray) {
        _location = '';
      } else {
        _location = location || 'memory';
      }

      const updatedData = { ...data, location: _location };
      onUpdate(updatedData);
    };

    updateLocation();
  }, [type, isArray]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Select
          placeholder="Type"
          value={type}
          options={getTypeOptions()}
          onChange={handleTypeChange}
          menuProps={true}
        />
      </Grid>
      <Grid item xs={2}>
        <Select placeholder="IsArray" value={isArray} options={IS_ARRAY_OPTION} onChange={handleIsArrayChange} />
      </Grid>
      {location && (
        <Grid item xs={2}>
          <Select placeholder="Location" value={location} options={LOCATION_OPTIONS} onChange={handleLocationChange} />
        </Grid>
      )}
      <Grid sx={{ display: 'flex', alignContent: 'center' }} item xs={4}>
        <Box sx={{ flexGrow: 1 }}>
          <ParameterName label={label} id={_id} updateLabel={handleLabelChange} />
        </Box>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'end' }} item xs={1}>
        <RemoveButton onClick={() => onRemove(data._id)}>
          <RemoveCircleOutlineIcon />
        </RemoveButton>
      </Grid>
    </Grid>
  );
};

export default ParameterItem;
