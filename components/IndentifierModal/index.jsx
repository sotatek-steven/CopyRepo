import { Modal, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalBox } from '../atom/ModalBox';
import { PrimaryButton } from '../ButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import SelectVariable from './SelectVariable';
import { ModalHeader } from '../atom/Modal';
import useValuesTab from '../ValuesPanel/hooks/useValuesTab';
import useObjectTab from '../ObjectTabPanel/hooks/useObjectTab';
import ObjectID from 'bson-objectid';
import useModule from '@/hooks/useModule';
import _ from 'lodash';

const ModalBody = styled('div')({
  padding: '20px 30px',
});

const ModalFooter = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  padding: '0px 30px 30px',
});

const SelectWrapper = styled('div')({
  marginBottom: 15,
});

const Message = styled('p')(({ theme }) => ({
  color: theme.palette.primary.light,
  margin: '0px 0px 20px',
  fontFamily: 'Segoe UI',
}));

const generateTypeOfMapping = (mapping, stringbuffer = []) => {
  stringbuffer.push('mapping');
  stringbuffer.push('(');
  stringbuffer.push(mapping.key);
  stringbuffer.push('=>');
  const value = mapping.values;
  if (value.type == 'map') {
    generateTypeOfMapping(value.map, stringbuffer);
  } else {
    stringbuffer.push(value.type);
  }
  stringbuffer.push(')');
  if (value.isArray) {
    stringbuffer.push('[]');
  }
};

const defaulItem = { value: 'declare new one', label: 'Declare new one' };

const IndentifierModal = ({ open, onClose, identifiers, redirectToAddField }) => {
  const moduleState = useSelector((state) => state.userModule);
  const objectState = useSelector((state) => state.object);
  const valueState = useSelector((state) => state.value);
  const [globalVariables, setGlobalVariables] = useState([]);
  const [mappings, setMappings] = useState([]);

  const { userModule, mapping } = useDispatch();
  const { handleAddValues } = useValuesTab();
  const { handleAddObject } = useObjectTab();
  const { checkValidateMapping } = useModule();

  useEffect(() => {
    const initialMappings = identifiers.map((item) => ({ identifier: item, selectedOption: defaulItem }));
    setMappings(initialMappings);
  }, [identifiers]);

  useEffect(() => {
    if (!moduleState.variables) return;
    let globalVariables = [];
    const { mappings } = moduleState.variables;
    mappings?.forEach((value) => {
      let { label, isArray, type, _id } = value;
      let stringbuffer = [];
      generateTypeOfMapping(type, stringbuffer);
      globalVariables.push({
        label,
        type: stringbuffer.join(''),
        isArray,
        category: 'mappings',
        _id,
      });
    });

    objectState.objects.forEach((value) => {
      const { label, type, isArray, _id } = value;
      globalVariables.push({
        label,
        type,
        isArray,
        category: 'structs',
        _id,
      });
    });

    valueState.values.forEach((value) => {
      const { label, type, isArray, _id } = value;
      globalVariables.push({
        label,
        type,
        isArray,
        category: 'values',
        _id,
      });
    });

    setGlobalVariables(globalVariables);
  }, [moduleState]);

  const handleChange = (identifier, selectedOption) => {
    const updatedMappings = mappings.map((item) => {
      if (item.identifier.label === identifier.label)
        return {
          ...item,
          selectedOption,
        };
      return item;
    });
    setMappings(updatedMappings);
  };

  // useEffect(() => {
  //   console.log('mappings: ', mappings);
  // }, [mappings]);

  const handleSubmit = () => {
    let newValues = [];
    let newObjects = [];
    let newMappings = moduleState?.variables?.mappings || [];

    mappings.forEach((item) => {
      const { identifier, selectedOption } = item;
      switch (identifier.objectType) {
        case 'values': {
          const { func, label, type, isArray, scope, constant, valueDefault } = identifier;
          const mappingToFunctions = func.map((item) => `${item}-${label}`);
          newValues.push({
            label,
            type,
            isArray,
            scope,
            constant,
            functionId: func,
            functions: mappingToFunctions,
            valueDefault,
            variableId: selectedOption._id,
          });
          break;
        }
        case 'objects': {
          const { func, label, type, isArray, scope, constant, valueDefault } = identifier;
          const mappingToFunctions = func.map((item) => `${item}-${label}`);
          let objectType = 'struct';
          const struct = moduleState?.sources?.structs?.find((str) => str?.name === type);
          if (_.isEmpty(struct)) {
            objectType = 'enum';
          }
          newObjects.push({
            name: label,
            item: type,
            type: objectType,
            isArray,
            scope,
            constant,
            functionId: func,
            functions: mappingToFunctions,
            valueDefault,
            variableId: selectedOption._id,
          });
          break;
        }
        case 'mappings': {
          const { func, label, scope, mapping } = identifier;
          if (!selectedOption._id) {
            if (!mappings) return;
            const mappingToFunctions = func.map((item) => ({ func: item, variable: label }));
            const newMappingItem = {
              _id: ObjectID(),
              label: label,
              scope,
              functions: mappingToFunctions,
              type: mapping,
            };
            newMappings.push(newMappingItem);
          } else {
            const selectedVariableIndex = newMappings.findIndex((item) => item._id === selectedOption._id);
            const selectedVariable = newMappings[selectedVariableIndex];

            const mappingToFunctions = [
              ...selectedVariable.functions,
              ...func.map((item) => ({ func: item, variable: label })),
            ];
            newMappings[selectedVariableIndex] = { ...selectedVariable, functions: mappingToFunctions };
          }

          break;
        }
      }
    });
    handleAddValues(newValues);
    handleAddObject(newObjects);

    const { numErr, funcIds } = checkValidateMapping(newMappings);
    mapping.setNumberError(numErr);
    mapping.setErrorFunctions(funcIds);

    userModule.updateMappings(newMappings);
    onClose();
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={(_, reason) => {
        if (reason === 'escapeKeyDown') {
          handleSubmit();
        } else if (reason !== 'backdropClick') {
          onClose();
        }
      }}>
      <ModalBox maxheight="700px">
        <ModalHeader type="warning" title="Unidentified identifiers" />
        <Scrollbars autoHeightMax={460} autoHeight>
          <ModalBody>
            <Message>{`A new state variable will be declared taking the same name of the identifier if you choose the option 'Declare new one'`}</Message>
            {identifiers &&
              identifiers.map((item, index) => {
                const { type, isArray, label } = item;
                let options = [{ ...defaulItem }];
                globalVariables.forEach((element) => {
                  const { type: _type, isArray: _isArray, label: _label, _id } = element;

                  if (type.replace(/\s*/g, '') === _type.replace(/\s*/g, '') && !!isArray === !!_isArray)
                    options.push({ ...element, value: _label, _id });
                });
                return (
                  <SelectWrapper key={index}>
                    <SelectVariable
                      redirectToAddField={redirectToAddField}
                      identifier={item}
                      label={`${label} ( ${type}, isArray: ${isArray} )`}
                      options={options}
                      onChange={handleChange}
                    />
                  </SelectWrapper>
                );
              })}
          </ModalBody>
        </Scrollbars>
        <ModalFooter>
          <PrimaryButton onClick={handleSubmit}>Continue</PrimaryButton>
        </ModalFooter>
      </ModalBox>
    </Modal>
  );
};

export default IndentifierModal;
