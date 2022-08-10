import { Checkbox, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ParameterItem from './ParameterItem';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_PARAMETER } from '@/store/models/userFunction';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ParametersField = () => {
  const { parameters } = useSelector((state) => state.userFunction);
  const { userFunction } = useDispatch();
  const [hasParameters, setHasParameters] = useState(false);

  const hanleAddParameter = () => {
    parameters.push({ ...NEW_PARAMETER, id: Date.now() });
    userFunction.updateParameters(parameters);
  };

  const handleRemoveParameter = (parameterId) => {
    const updatedParameters = parameters.filter((item) => item.id !== parameterId);
    if (!updatedParameters.length) setHasParameters(false);
    userFunction.updateParameters(updatedParameters);
  };

  const updateParameter = (parameter) => {
    const updatedParameters = parameters.map((item) => {
      if (item.id !== parameter.id) return item;
      return parameter;
    });

    userFunction.updateParameters(updatedParameters);
  };

  useEffect(() => {
    if (hasParameters && parameters.length > 0) return;
    if (!hasParameters) {
      userFunction.updateParameters([]);
      return;
    }

    hanleAddParameter();
  }, [hasParameters]);

  return (
    <>
      <TitleWrapper>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          checked={hasParameters}
          onClick={() => setHasParameters((hasParameters) => !hasParameters)}
        />
        Paramerters
      </TitleWrapper>
      {hasParameters && (
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <ListWrapper>
              {parameters.map((item, index) => {
                return (
                  <ParameterItem key={index} data={item} onRemove={handleRemoveParameter} onUpdate={updateParameter} />
                );
              })}
            </ListWrapper>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }} item xs={1}>
            <AddButton onClick={hanleAddParameter} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ParametersField;
