const { useState } = require('react');
import Select from '../Select';

const SelectVariable = ({ label, options, onChange, identifier }) => {
  const [value, setValue] = useState('declare new one');

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (!onChange) return;
    const selectedOption = options.find((item) => item.label === value);
    onChange(identifier, selectedOption);
  };

  return <Select value={value} onChange={handleChange} label={label} options={options} />;
};

export default SelectVariable;
