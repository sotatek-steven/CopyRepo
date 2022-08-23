import { Checkbox, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ParameterItem from './ParameterItem';
import { useDispatch, useSelector } from 'react-redux';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

const Error = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 14,
  margin: 0,
}));

const ParametersField = ({ isDuplicated }) => {
  const { params } = useSelector((state) => state.functionDefinition);
  const { functionDefinition } = useDispatch();
  const [hasParameters, setHasParameters] = useState(params.length > 0);

  const handleAddParameter = () => {
    const _params = [...params, { ...NEW_PARAMETER, _id: ObjectID(32).toHexString() }];
    functionDefinition.updateParameters(_params);
  };

  const handleRemoveParameter = (parameterId) => {
    const updatedParameters = params.filter((item) => item._id !== parameterId);
    if (!updatedParameters.length) setHasParameters(false);
    functionDefinition.updateParameters(updatedParameters);
  };

  const onUpdate = (parameter) => {
    const updatedParameters = params.map((item) => {
      if (item._id !== parameter._id) return item;
      return parameter;
    });

    functionDefinition.updateParameters(updatedParameters);
  };

  useEffect(() => {
    if (hasParameters && params.length > 0) return;
    if (!hasParameters) {
      functionDefinition.updateParameters([]);
      return;
    }

    handleAddParameter();
  }, [hasParameters]);

  return (
    <>
      <Header>
        <TitleWrapper>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            checked={hasParameters}
            onClick={() => setHasParameters((hasParameters) => !hasParameters)}
          />
          Include Paramerters?
        </TitleWrapper>
        {isDuplicated && <Error>Parameters types and order are duplicated, please update the parameters</Error>}
      </Header>

      {hasParameters && (
        <Grid container spacing={2} sx={{ paddingLeft: '30px' }}>
          <Grid item xs={11}>
            <ListWrapper>
              {params.map((item, index) => {
                return <ParameterItem onUpdate={onUpdate} key={index} data={item} onRemove={handleRemoveParameter} />;
              })}
            </ListWrapper>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }} item xs={1}>
            <AddButton onClick={handleAddParameter} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ParametersField;
