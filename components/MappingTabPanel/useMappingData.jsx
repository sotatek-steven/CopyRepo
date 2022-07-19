import { useDispatch, useSelector } from 'react-redux';

const useMappingData = (id) => {
  const {
    variables: { mappings },
  } = useSelector((state) => state.userModule);
  const { userModule } = useDispatch();

  const data = mappings.find((item) => item.id === id);

  const updateValue = (newValue, oldValue) => {
    return typeof newValue !== 'undefined' ? newValue : oldValue;
  };

  const updateData = ({ scope, label, variables, type }) => {
    const updatedMapping = mappings.map((item) => {
      if (item.id !== id) return item;

      const { scope: _scope, label: _label, variables: _variables, type: _type } = item;
      return {
        ...item,
        scope: updateValue(scope, _scope),
        label: updateValue(label, _label),
        variables: updateValue(variables, _variables),
        type: updateValue(type, _type),
      };
    });

    userModule.updateMappings(updatedMapping);
  };

  return [data, updateData];
};

export default useMappingData;
