import { Input } from '@/components/Input/input.style';
import React, { useEffect, useRef, useState } from 'react';

const closures = { '(': ')', '[': ']', '{': '}', "'": "'", '"': '"' };

const FreeText = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const positionOfCursor = useRef(0);

  const handleKeyDown = (e) => {
    //value of input before add key pressed
    const currentValue = e.target.value;
    //key pressed
    const key = e.key;

    if (!Object.keys(closures).includes(key)) {
      switch (key) {
        case 'Delete':
          positionOfCursor.current = e.target.selectionStart;
          break;
        case 'Backspace':
          positionOfCursor.current = e.target.selectionStart - 1;
          break;
        default:
          positionOfCursor.current = e.target.selectionStart + 1;
          break;
      }
      return;
    }

    e.preventDefault();
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;
    /**
     * typing `(` => `()`
     * select `count` + typing `(` => `(count)`
     */
    const expectedValue =
      currentValue.slice(0, selectionStart) +
      key +
      currentValue.slice(selectionStart, selectionEnd) +
      closures[key] +
      currentValue.slice(selectionEnd);
    setValue(expectedValue);

    //update postion of cursor: (|)
    if (selectionStart === selectionEnd) positionOfCursor.current = e.target.selectionEnd + 1;
    else positionOfCursor.current = e.target.selectionEnd + 2;
  };

  const handleChange = (e) => {
    const currentValue = e.target.value;
    setValue(currentValue);
  };

  useEffect(() => {
    inputRef.current.selectionStart = inputRef.current.selectionEnd = positionOfCursor.current;
  }, [value]);
  return <Input ref={inputRef} background="default" value={value} onChange={handleChange} onKeyDown={handleKeyDown} />;
};

export default FreeText;
