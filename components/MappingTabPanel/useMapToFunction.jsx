import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMapToFunction = () => {
  const moduleState = useSelector((state) => state.userModule);
  const [functions, setFunctions] = useState([]);

  const registerMapToFunction = (functionName, mappingId) => {
    const updatedFuctions = functions.map((item) => {
      const { name } = item;
      if (name !== functionName) return item;
      return {
        ...item,
        mappingId: mappingId,
      };
    });

    setFunctions(updatedFuctions);
  };

  const unregisterMapToFunction = (functionName) => {
    const updatedFuctions = functions.map((item) => {
      const { name } = item;
      if (name !== functionName) return item;
      return {
        ...item,
        mappingId: null,
      };
    });

    setFunctions(updatedFuctions);
  };

  useEffect(() => {
    // console.log('moduleState?.sources?.functions: ', moduleState?.sources?.functions);
    const updateFunctions = moduleState?.sources?.functions?.map((item) => {
      const { _id, name } = item;
      return {
        id: _id,
        name,
        mappingId: null,
      };
    });

    setFunctions(updateFunctions);
  }, [moduleState?.sources?.functions]);

  return { functions, registerMapToFunction, unregisterMapToFunction };
};

export default useMapToFunction;
