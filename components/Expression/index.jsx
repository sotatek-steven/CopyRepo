import { CONDITION_OPTION } from '@/config/constant/common';
import { styled, TextField, useTheme } from '@mui/material';
import ObjectID from 'bson-objectid';
import React from 'react';
import { ErrorMessage } from '../atom/Message.style';
import { BaseAutocomplete } from '../AutoComplete/AutoComplete.style';
import FreeText from '../CustomNode/ForLoopNode/FreeText';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
});
const SelectWrapper = styled('div')({
  width: 150,
});

const REQUIRE_MESSAGE = 'This field is required';

const Expression = ({ nodeId, data, setData }) => {
  const theme = useTheme();

  const handleSelect = (id, logicalOperator) => {
    if (logicalOperator === 'end') {
      const idx = data.findIndex((item) => item._id === id);
      //remove all operand after idx
      const updatedData = data.slice(0, idx + 1);
      //update last operand
      updatedData[idx].logicalOperator = 'end';
      //update data
      setData(updatedData);
      return;
    }

    //update operand that has id
    const updatedData = data.map((item) => (item._id === id ? { ...item, logicalOperator } : item));
    //add new item
    updatedData.push({ _id: ObjectID(24).toHexString(), expression: '', logicalOperator: 'end' });

    //update data
    if (!setData) return;
    setData(updatedData);
  };

  const handleOperandChange = (id, value) => {
    const updatedData = data.map((item) => {
      if (item._id !== id) return item;
      return {
        ...item,
        expression: value,
        error: value ? '' : REQUIRE_MESSAGE,
      };
    });

    if (!setData) return;
    setData(updatedData);
  };
  return (
    <Container>
      {data.map((item) => {
        const { _id, expression, logicalOperator, error } = item;
        return (
          <>
            <div>
              <FreeText nodeId={nodeId} value={expression} setValue={(value) => handleOperandChange(_id, value)} />
              {error && <ErrorMessage customStyle={{ marginTop: 5 }}>{error}</ErrorMessage>}
            </div>
            <SelectWrapper>
              <BaseAutocomplete
                background={theme.palette.background.default}
                value={CONDITION_OPTION.find((option) => option.value === logicalOperator)}
                options={CONDITION_OPTION}
                renderInput={(params) => <TextField {...params} />}
                disableClearable
                onChange={(e, { value }) => handleSelect(_id, value)}
              />
            </SelectWrapper>
          </>
        );
      })}
    </Container>
  );
};

export default Expression;
