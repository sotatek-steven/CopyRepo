import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material';
import MappingItem from './MappingItem';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled('div')({
  padding: '30px 70px',
});

const MappingTabPanel = () => {
  const moduleState = useSelector((state) => state.userModule);
  const { userModule } = useDispatch();
  const [error, setError] = useState(true);
  const [functions, setFunctions] = useState([]);

  const registerMapToFunction = (variableId, mappingId) => {
    const updatedFuctions = functions.map((item) => {
      const { id } = item;
      if (id !== variableId) return item;
      return {
        ...item,
        mappingId: mappingId,
      };
    });
    setFunctions(updatedFuctions);
  };

  const unregisterMapToFunction = (variableId) => {
    const updatedFuctions = functions.map((item) => {
      const { id } = item;
      if (id !== variableId) return item;
      return {
        ...item,
        mappingId: null,
      };
    });
    setFunctions(updatedFuctions);
  };

  useEffect(() => {
    const updateFunctions = moduleState?.sources?.functions?.flatMap((item) => {
      const { globalVariables, name: functionName } = item;

      return globalVariables.map((variable) => {
        const { _id: id, label, type } = variable;
        return {
          id,
          label: `${label}(${functionName})`,
          mappingId: null,
          type,
        };
      });
    });

    setFunctions(updateFunctions);
  }, [moduleState?.sources?.functions]);

  const handleClick = () => {
    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;

    const newMappingItem = {
      id: Date.now(),
      label: '',
      scope: 'public',
      variables: [],
      type: {
        key: '',
        value: { type: '', map: {} },
      },
    };
    mappings.push(newMappingItem);

    userModule.updateMappings(mappings);
  };

  // useEffect(() => {
  //   console.log('moduleState.variables.mappings: ', moduleState.variables.mappings);
  // }, [moduleState.variables.mappings]);

  const removeItem = (id) => {
    const {
      variables: { mappings },
    } = moduleState;
    if (!mappings) return;
    const updatedMappings = mappings.filter((item) => item.id !== id);
    userModule.updateMappings(updatedMappings);
    const updatedFuctions = functions.map((item) => {
      const { mappingId } = item;
      return {
        ...item,
        mappingId: mappingId === id ? null : mappingId,
      };
    });
    setFunctions(updatedFuctions);
  };

  return (
    <Container>
      {moduleState.variables.mappings.map((mappingItem, index) => {
        return (
          <MappingItem
            updateError={setError}
            id={mappingItem.id}
            key={index}
            functions={functions}
            setFunctions={setFunctions}
            registerMapToFunction={registerMapToFunction}
            unregisterMapToFunction={unregisterMapToFunction}
            removeItem={removeItem}
          />
        );
      })}
      <PrimaryButton width={123} onClick={handleClick}>
        <AddCircleOutlineIcon style={{ fontSize: 18 }} />
        <span>Create New</span>
      </PrimaryButton>
    </Container>
  );
};

export default MappingTabPanel;
