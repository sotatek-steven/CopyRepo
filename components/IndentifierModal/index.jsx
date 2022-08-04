import { Modal, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ModalBox } from '../atom/ModalBox';
import { PrimaryButton } from '../ButtonStyle';
import { useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import SelectVariable from './SelectVariable';
import { ModalHeader } from '../atom/Modal';

const ModalBody = styled('div')({
  padding: '0px 30px',
});

const ModalFooter = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  padding: '35px 30px 30px',
});

const SelectWrapper = styled('div')({
  marginBottom: 15,
});

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

const IndentifierModal = ({ open, onClose, stateVariables, redirectToAddField }) => {
  const moduleState = useSelector((state) => state.userModule);
  const [globalVariables, setGlobalVariables] = useState([]);

  useEffect(() => {
    if (!moduleState.variables) return;
    let globalVariables = [];
    const { mappings, structs, values } = moduleState.variables;
    mappings.forEach((value) => {
      let { label, isArray, type } = value;
      let stringbuffer = [];
      generateTypeOfMapping(type, stringbuffer);
      globalVariables.push({
        label,
        type: stringbuffer.join(''),
        isArray,
        category: 'mappings',
      });
    });

    structs.forEach((value) => {
      const { label, type, isArray } = value;
      globalVariables.push({
        label,
        type,
        isArray,
        category: 'structs',
      });
    });

    values.forEach((value) => {
      const { label, type, isArray } = value;
      globalVariables.push({
        label,
        type,
        isArray,
        category: 'values',
      });
    });

    setGlobalVariables(globalVariables);
  }, [moduleState.variables]);

  return (
    <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open} onClose={onClose}>
      <ModalBox maxheight="700px">
        <ModalHeader type="warning" title="Unidentified identifiers" onClose={onClose} />
        <Scrollbars style={{ marginTop: 45 }} autoHeightMax={460} autoHeight>
          <ModalBody>
            {stateVariables &&
              stateVariables.map((item, index) => {
                const { type, isArray, label, objectType } = item;
                let options = [{ ...defaulItem, category: objectType }];
                globalVariables.forEach((element) => {
                  const { type: _type, isArray: _isArray, label: _label } = element;

                  if (type.replace(/\s*/g, '') === _type.replace(/\s*/g, '') && !!isArray === !!_isArray)
                    options.push({ ...element, value: _label });
                });
                return (
                  <SelectWrapper key={index}>
                    <SelectVariable
                      redirectToAddField={redirectToAddField}
                      variable={item}
                      label={`${label} ( ${type}, isArray: ${isArray} )`}
                      options={options}
                    />
                  </SelectWrapper>
                );
              })}
          </ModalBody>
        </Scrollbars>
        <ModalFooter>
          <PrimaryButton onClick={onClose}>Continue</PrimaryButton>
        </ModalFooter>
      </ModalBox>
    </Modal>
  );
};

export default IndentifierModal;
