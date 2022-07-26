import { useDispatch, useSelector } from 'react-redux';

const useMappingData = (id) => {
  const {
    variables: { mappings },
  } = useSelector((state) => state.userModule);
  const { userModule } = useDispatch();

  // console.log('mapping: ', mappings);
  const data = mappings.find((item) => item._id === id);

  const updateValue = (newValue, oldValue) => {
    return typeof newValue !== 'undefined' ? newValue : oldValue;
  };

  const updateData = ({ scope, label, functions, type }) => {
    // console.log('functions: ', functions);
    const updatedMapping = mappings.map((item) => {
      if (item._id !== id) return item;

      const { scope: _scope, label: _label, functions: _functions, type: _type } = item;
      // console.log('updateValue(type, _type): ', updateValue(type, _type));
      return {
        ...item,
        scope: updateValue(scope, _scope),
        label: updateValue(label, _label),
        functions: updateValue(functions, _functions),
        type: updateValue(type, _type),
      };
    });

    userModule.updateMappings(updatedMapping);
  };

  return [data, updateData];
};

export default useMappingData;
