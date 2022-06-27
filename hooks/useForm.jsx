import { useState } from 'react';

export const useForm = ({ initialValues, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(() => {
    const initialErrors = {};
    Object.entries(initialValues).forEach(([key]) => (initialErrors[key] = null));
    return initialErrors;
  });

  const hasError = (errors) => {
    const result = Object.entries(errors).filter(([key, value]) => {
      return value !== null;
    });

    return result.length !== 0;
  };
  const handleChange = (e) => {
    const currentValues = {
      ...values,
      [e.target.name]: e.target.value,
    };
    const _errors = validate(currentValues);

    setValues(currentValues);
    setErrors(_errors);
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();

    const currentErrors = validate(values);
    setErrors(currentErrors);

    if (hasError(currentErrors)) return;
    if (!onSubmit) return;
    onSubmit();
  };

  return [values, setValues, handleChange, handleSubmit, errors];
};
