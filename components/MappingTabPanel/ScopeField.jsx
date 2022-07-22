import { SCOPE } from '@/config/constant/common';
import React from 'react';

import Select from '../Select';
import useMappingData from './useMappingData';

const ScopeField = ({ id }) => {
  const [data, updateData] = useMappingData(id);

  const handleChange = (event) => {
    const value = event.target.value;
    updateData({ scope: value });
  };

  return <Select label={'SCOPE'} value={data?.scope} options={SCOPE} onChange={handleChange} />;
};

export default ScopeField;
