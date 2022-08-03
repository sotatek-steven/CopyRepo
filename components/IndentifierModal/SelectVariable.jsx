const { useState } = require('react');
const { useDispatch, useSelector } = require('react-redux');
import { INIT_OBJECT_TYPE, INIT_VALUE_TYPE } from '@/config/constant/common';
import ObjectID from 'bson-objectid';
import useObjectTab from '../ObjectTabPanel/hooks/useObjectTab';
import Select from '../Select';
import useValuesTab from '../ValuesPanel/hooks/useValuesTab';

const SelectVariable = ({ label, options, variable, redirectToAddField }) => {
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const [value, setValue] = useState('');
  const { handleAddValues, converToValueShow } = useValuesTab();
  const { handleAddObject, convertToObjectShow } = useObjectTab();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const selectedOptions = options.filter((item) => item.label === value);

    // mapToFunction(variable, selectedOption[0]);

    const { variables } = moduleState;

    if (value === 'declare new one') {
      const category = options[0].category === 'objects' ? 'structs' : options[0].category;
      const updatedData = removeStateVariableFromMapping(variables[category], variable, selectedOptions[0]);

      variables[category] = updatedData;
      userModule.updateVariables(variables);
      declareNewMapping();
      return;
    }

    const { category } = selectedOptions[0];

    const data = removeStateVariableFromMapping(variables[category], variable, selectedOptions[0]);
    const updatedData = addStateVariableToMapping(data, variable, selectedOptions[0]);

    variables[category] = updatedData;
    switch (category) {
      case 'values': {
        converToValueShow(variables.values);
        break;
      }
      case 'structs': {
        convertToObjectShow(variables.structs);
        break;
      }
    }
    userModule.updateVariables(variables);
  };

  const declareNewMapping = () => {
    const { category } = options[0];
    const { func, label, type, isArray, scope, constant } = variable;
    switch (category) {
      case 'values': {
        handleAddValues({
          initValue: { ...INIT_VALUE_TYPE, type, isArray, scope, constant, functions: [`${func}-${label}`] },
        });
        break;
      }
      case 'objects': {
        handleAddObject({
          initObject: {
            ...INIT_OBJECT_TYPE,
            type: 'struct',
            item: type,
            isArray,
            scope,
            name: '',
            functions: [`${func}-${label}`],
          },
        });
        break;
      }
      case 'mappings': {
        const {
          variables: { mappings },
        } = moduleState;
        if (!mappings) return;

        const newMappingItem = {
          _id: ObjectID(),
          label: '',
          scope,
          functions: [{ func, variable: label }],
          type: {
            key: '',
            values: { type: '' },
          },
        };
        mappings.push(newMappingItem);

        userModule.updateMappings(mappings);
        break;
      }
    }
    redirectToAddField(category, variable);
    return;
  };

  const removeStateVariableFromMapping = (mappings, stateVariable) => {
    const updatedData = mappings.map((item) => {
      const { functions } = item;

      //remove state variable from mapping
      const updatedFunctions = functions.filter(
        (element) => !(element.func === stateVariable.func && element.variable === stateVariable.label)
      );
      return {
        ...item,
        functions: updatedFunctions,
      };
    });
    return updatedData;
  };

  const addStateVariableToMapping = (mappings, stateVariable, selectedOption) => {
    const { label } = selectedOption;
    const updatedData = mappings.map((item) => {
      const { functions } = item;
      if (item.label !== label) {
        return item;
      }

      //add state variable to mapping
      const updatedFunctions = [...functions, { func: stateVariable.func, variable: stateVariable.label }];
      return {
        ...item,
        functions: updatedFunctions,
      };
    });

    return updatedData;
  };

  return <Select value={value} onChange={handleChange} label={label} options={options} />;
};

export default SelectVariable;
