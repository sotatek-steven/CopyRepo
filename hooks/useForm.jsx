import { ELEMENT_TYPE } from '@/config/constant/common';
import { useState } from 'react';

export const useForm = ({ initialValues, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const hasError = (errors) => {
    const result = Object.entries(errors).filter(([key, value]) => {
      return value !== null;
    });

    return result.length !== 0;
  };
  const handleChange = (e, field, type) => {
    let valueField = {};
    if (type === ELEMENT_TYPE.INPUT) {
      valueField = {
        [field]: e.target.value,
      };
    }
    if (type === ELEMENT_TYPE.SELECT) {
      valueField = {
        [field]: e.target.value,
      };
    }
    if (type === ELEMENT_TYPE.TAG) {
      valueField = {
        [field]: e?.map((tag) => tag.value),
      };
    }

    const _errors = validate(valueField, errors);

    setValues((prev) => ({ ...prev, ...valueField }));
    setErrors(_errors);
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();

    const currentErrors = validate(values, errors);
    setErrors(currentErrors);

    if (hasError(currentErrors)) return;
    if (!onSubmit) return;
    onSubmit();
  };

  return { values, setValues, handleChange, handleSubmit, errors, setErrors };
};
