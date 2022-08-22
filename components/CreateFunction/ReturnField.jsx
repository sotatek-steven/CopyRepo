import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Label from '../atom/Label';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Select from '../Select';
import { useDispatch, useSelector } from 'react-redux';
import { BOOLEAN_OPTIONS } from '@/config/constant/common';
import ParameterItem from './ParameterItem';
import ObjectID from 'bson-objectid';
import { NEW_PARAMETER } from '@/store/models/functionDefinition';

const AddButton = styled(AddCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  margin: '10px 0px',
}));

const ListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const ReturnField = () => {
  const { returns: returnData, type } = useSelector((state) => state.functionDefinition);
  const [hasReturn, setHasReturn] = useState(returnData.length > 0);
  const { functionDefinition } = useDispatch();

  const handleReturnChange = (e) => {
    const value = e.target.value;
    setHasReturn(value);
  };

  const hanleAddItem = () => {
    returnData.push({ ...NEW_PARAMETER, _id: ObjectID(32).toHexString() });
    functionDefinition.updateReturns(returnData);
  };

  const handleRemoveItem = (itemId) => {
    const updatedReturnData = returnData.filter((el) => itemId !== el._id);
    if (!updatedReturnData.length) setHasReturn(false);
    functionDefinition.updateReturns(updatedReturnData);
  };

  const updateReturns = (parameter) => {
    const updatedReturnData = returnData.map((item) => {
      if (item._id !== parameter._id) return item;
      return parameter;
    });

    functionDefinition.updateReturns(updatedReturnData);
  };

  useEffect(() => {
    if (hasReturn && returnData.length > 0) return;
    if (!hasReturn) {
      functionDefinition.updateReturns([]);
      return;
    }

    hanleAddItem();
  }, [hasReturn]);

  useEffect(() => {
    if (type === 'readonly') setHasReturn(true);
  }, [type]);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Label type="basic">Return values?</Label>
          <Select
            disabled={type === 'readonly'}
            value={hasReturn}
            options={BOOLEAN_OPTIONS}
            onChange={handleReturnChange}
          />
        </Grid>
      </Grid>
      {hasReturn && (
        <Grid sx={{ padding: '20px 0px 0px 30px' }} container spacing={2}>
          <Grid item xs={11}>
            <ListWrapper>
              {returnData.map((item, index) => {
                return <ParameterItem data={item} key={index} onUpdate={updateReturns} onRemove={handleRemoveItem} />;
              })}
            </ListWrapper>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }} item xs={1}>
            <AddButton onClick={hanleAddItem} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ReturnField;
