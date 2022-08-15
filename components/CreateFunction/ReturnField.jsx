import { Checkbox, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Label from '../atom/Label';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch, useSelector } from 'react-redux';
import ReturnItem from './ReturnItem';

const AddButton = styled(AddCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  margin: '10px 0px',
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const ReturnField = () => {
  const { returns: returnData } = useSelector((state) => state.userFunction);
  const [hasReturn, setHasReturn] = useState(false);
  const { userFunction } = useDispatch();

  const hanleAddItem = () => {
    returnData.push({ data: '', id: Date.now() });
    userFunction.updateReturn(returnData);
  };

  const handleRemoveItem = (itemId) => {
    const updatedReturnData = returnData.filter((el) => itemId !== el.id);
    if (!updatedReturnData.length) setHasReturn(false);
    userFunction.updateReturn(updatedReturnData);
  };

  const updateReturn = (parameter) => {
    const updatedReturnData = returnData.map((item) => {
      if (item.id !== parameter.id) return item;
      return parameter;
    });

    userFunction.updateReturn(updatedReturnData);
  };

  useEffect(() => {
    if (hasReturn && returnData.length > 0) return;
    if (!hasReturn) {
      userFunction.updateReturn([]);
      return;
    }

    hanleAddItem();
  }, [hasReturn]);

  return (
    <>
      <TitleWrapper>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          checked={hasReturn}
          onClick={() => setHasReturn((hasReturn) => !hasReturn)}
        />
        Return
      </TitleWrapper>
      {hasReturn && (
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <ListWrapper>
              {returnData.map((item, index) => {
                return <ReturnItem data={item} key={index} onUpdate={updateReturn} onRemove={handleRemoveItem} />;
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
