import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material';
import MappingItem from './MappingItem';
import { useDispatch, useSelector } from 'react-redux';
import { compareMappingVariable } from './utils';
import Scrollbars from 'react-custom-scrollbars';
import ObjectID from 'bson-objectid';

const Container = styled('div')({
  paddingLeft: 30,
});

const MappingTabPanel = () => {
  const moduleState = useSelector((state) => state.userModule);
  const { userModule, mappingVariableOptions } = useDispatch();
  const [error, setError] = useState(true);

  //update mapping variable list
  useEffect(() => {
    //get all global mapping variables
    const options = [];
    moduleState?.sources?.functions?.forEach((item) => {
      const { globalVariables, name: functionName, _id } = item;

      globalVariables.forEach((variable) => {
        const { label, type } = variable;
        if (type.includes('mapping'))
          options.push({
            ...variable,
            label: `(${functionName})(${label})`,
            func: _id,
            variable: label,
          });
      });
    });

    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;

    //update mapping subcriber for mapping variable list
    const updatedMappingVariableOptions = options.map((option) => {
      let subscriber = null;
      for (const mapping of mappings) {
        const { functions, _id } = mapping;
        if (functions.find((item) => compareMappingVariable(item, option))) subscriber = _id;
      }
      return {
        ...option,
        subscriber,
      };
    });

    mappingVariableOptions.update(updatedMappingVariableOptions);
  }, [moduleState?.sources?.functions]);

  const handleClick = () => {
    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;

    const newMappingItem = {
      _id: ObjectID(),
      label: '',
      scope: 'public',
      functions: [],
      type: {
        key: '',
        values: { type: '' },
      },
    };
    mappings.push(newMappingItem);

    userModule.updateMappings(mappings);
  };

  // useEffect(() => {
  //   console.log('moduleState.variables.mappings: ', moduleState.variables.mappings);
  // }, [moduleState.variables.mappings]);

  const removeMappingItem = (mappingId) => {
    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;
    const updatedMappings = mappings.filter((item) => item._id !== mappingId);
    userModule.updateMappings(updatedMappings);

    mappingVariableOptions.unregisterAllOptions(mappingId);
  };

  return (
    <Container>
      <Scrollbars
        style={{
          height: '77vh',
          overflowX: 'hidden',
        }}>
        {moduleState.variables?.mappings?.map((mappingItem) => {
          const { _id } = mappingItem;
          return <MappingItem updateError={setError} id={_id} key={_id} removeItem={removeMappingItem} />;
        })}
        <PrimaryButton width={123} onClick={handleClick}>
          <AddCircleOutlineIcon style={{ fontSize: 18 }} />
          <span>Create New</span>
        </PrimaryButton>
      </Scrollbars>
    </Container>
  );
};

export default MappingTabPanel;
