import { Input } from '@/components/Input/input.style';
import SuggestionPopover from '@/components/SuggestionPopover';
import { sortNodes } from '@/utils/functionData/convertToELKFormat';
import { styled } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const closures = { '(': ')', '[': ']', '{': '}', "'": "'", '"': '"' };
const loveTheEights = Array.from(Array(256), (e, i) => i + 1).filter((item) => item % 8 === 0);

const KEYS = [
  'calldata',
  'memory',
  'storage',
  'bool',
  'address',
  'string',
  ...Array.from(Array(32), (e, i) => i + 1).map((item) => `bytes${item}`),
  'int',
  ...loveTheEights.map((item) => `int${item}`),
  'uint',
  ...loveTheEights.map((item) => `uint${item}`),
  'constant',
  'immutable',
  'new',
  'mapping',
  'struct',
  'enum',
];

const regex = new RegExp('(^[a-zA-Z]{1}$|^Delete$|^Backspace$)');

const widthLetter = 5;
const POSITION_SUGGEST = {
  top: 35,
  left: 20,
};

const InputWrapper = styled('div')({
  position: 'relative',
});

const FreeText = ({ nodeId }) => {
  const [value, setValue] = useState('');
  const [openSuggesstionBox, setOpenSuggesstionBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState(POSITION_SUGGEST);
  const inputRef = useRef(null);
  const positionOfCursor = useRef(0);
  const {
    sources: { functions },
  } = useSelector((state) => state.userModule);
  const functionState = useSelector((state) => state.userFunction);
  const { nodes, edges } = useSelector((state) => state.logicBlocks);
  const initialSuggestionList = useMemo(() => {
    //get all functions from current module
    const functionNames = functions.map(({ _id, name }) => ({ id: _id, label: name, type: 'function' }));

    //get all parameters from current function
    const { params } = functionState;
    const paramNames = params.map(({ _id, label }) => ({ id: _id, label, type: 'variable' }));

    //get all variables from current function's declaration block
    const sortedNodes = sortNodes({ nodes, edges });
    const variableNames = [];
    const currentNodeIdx = sortedNodes.indexOf(nodeId); //the index of node that contain this free text
    nodes.forEach(({ id, type: nodeType, data }) => {
      if (nodeType !== 'declaration') return;
      const variableName = data.params.indentifier;
      const type = sortedNodes.indexOf(id, currentNodeIdx) === -1 ? 'variable' : 'text'; //declared variable has type `variable`, otherwise the type is `text`
      variableNames.push({ id, label: variableName, type });
    });

    const keys = KEYS.map((item, idx) => ({ id: idx, label: item, type: 'text' }));

    return keys.concat(functionNames, paramNames, variableNames);
  }, []);

  const handleKeyDown = (e) => {
    //value of input before add key pressed
    const currentValue = e.target.value;
    //key pressed
    const key = e.key;

    if (Object.keys(closures).includes(key)) {
      e.preventDefault();
      insertBracketInto(currentValue, key, e);
      return;
    }

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
  };

  const handleKeyUp = (e) => {
    //key pressed
    const key = e.key;
    //value of input contain key pressed
    const inputValue = e.target.value;
    //position of text cursor
    const cursor = e.target.selectionStart;
    const preLetter = inputValue[cursor - 1];

    if (!key || key === ' ' || ((key === 'Delete' || key === 'Backspace') && preLetter && preLetter === ' ')) {
      setOpenSuggesstionBox(false);
      return;
    }

    if (!regex.test(key)) return;

    //update suggestion list
    const lastWordTyped = inputValue.slice(0, cursor).split(' ').pop();
    const suggestionList = initialSuggestionList.filter(({ label }) => label.includes(lastWordTyped));

    if (suggestionList.length > 0) {
      setSuggestions(suggestionList);
      setPosition({ ...position, left: POSITION_SUGGEST.left + cursor * widthLetter });
      setOpenSuggesstionBox(true);
    } else setOpenSuggesstionBox(false);
  };

  const handleChange = (e) => {
    const currentValue = e.target.value;
    setValue(currentValue);
  };

  const insertBracketInto = (inputValue, key, e) => {
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;
    /**
     * typing `(` => `()`
     * select `count` + typing `(` => `(count)`
     */
    const expectedValue =
      inputValue.slice(0, selectionStart) +
      key +
      inputValue.slice(selectionStart, selectionEnd) +
      closures[key] +
      inputValue.slice(selectionEnd);
    setValue(expectedValue);

    //update postion of cursor: (|)
    if (selectionStart === selectionEnd) positionOfCursor.current = e.target.selectionEnd + 1;
    else positionOfCursor.current = e.target.selectionEnd + 2;
  };

  const onClick = ({ label }) => {
    const leftCursor = value.slice(0, positionOfCursor.current).split(' '); //text to the left of the cursor
    const words = value.split(' ');
    words[leftCursor.length - 1] = label; //replace the word is being edited with selected suggestion
    const updatedValue = words.join(' ');
    positionOfCursor.current = positionOfCursor.current + (updatedValue.length - value.length); //move cusor to the end of the word just added

    setValue(updatedValue);
    setOpenSuggesstionBox(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.selectionStart = inputRef.current.selectionEnd = positionOfCursor.current;
  }, [value]);

  return (
    <InputWrapper>
      {' '}
      <Input
        ref={inputRef}
        background="default"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <SuggestionPopover open={openSuggesstionBox} options={suggestions} position={position} onClick={onClick} />
    </InputWrapper>
  );
};

export default FreeText;
