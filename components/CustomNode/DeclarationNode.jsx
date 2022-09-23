import { Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Input } from '../Input';
import ErrorIconDeclaration from 'assets/icon/ErrorIconDeclaration.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import {
  convertToDeclaration,
  generateDataType,
  getFirstNearSpace,
  LOCATION_OPTIONS,
  splitElements,
} from '@/config/constant/common';
import useDeclaration from '../functionsPage/hooks/useDeclaration';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';
import _ from 'lodash';
import SuggestionPopover from '../SuggestionPopover';
import { REGEX } from '@/config/constant/regex';
import { useRef } from 'react';

const Card = styled('article')(({ color, theme }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: 200,
  height: 100,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const CardBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
}));

const EditingContainer = styled('div')(({ theme }) => ({
  padding: 30,
  width: 468,
  height: 217,
  border: `1.5px dashed ${theme.palette.success.main}`,
  background: theme.palette.background.light,
}));

const Title = styled('div')(({ theme }) => ({
  width: 'fit-content',
  background: theme.shape.backgroundNode,
  position: 'absolute',
  padding: 8,
  top: '-20px',
  left: '-40px',
  color: theme.palette.text.colorNode,
}));

const ItemContainer = styled('div')(({ theme, error }) => ({
  marginBottom: error ? 34 : 72,
  '& > input': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: 45,
    borderRadius: 5,
    border: `solid 1px ${theme.palette.background.light}`,
    outline: 'none',
    width: '100%',
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    padding: '0px 15px',
    fontFamily: theme.typography.fontFamily,
    '&::placeholder': {
      fontSize: '10px',
    },
  },
}));

const ErrorContainer = styled('div')({
  display: 'flex',
  gap: 8,
  marginTop: 10,
});

const ActionContainer = styled('div')({
  display: 'flex',
  justifyContent: 'end',
});

const AbsoluteContainer = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'end',
  position: 'absolute',
  right: 12,
  '.action-icon': {
    minWidth: 28,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
}));

const POSITION_SUGGEST = {
  top: 68,
  left: 48,
};
const regex = new RegExp(REGEX.SPECIAL_CHARACTER);
const DeclarationNode = ({ id, data }) => {
  const { nodes: blocksState } = useSelector((state) => state.logicBlocks);

  const [inputText, setInputText] = useState('');
  const [errorText, setErrorText] = useState('');
  const { validateDeclaration } = useDeclaration();
  const { logicBlocks } = useDispatch();
  const [mode, setMode] = useState(_.isEmpty(data) ? 'editing' : 'view');
  // State Suggest
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [position, setPosition] = useState(POSITION_SUGGEST);
  const [positionChange, setPositionChange] = useState({ start: 0, end: 0 });

  const convertDataToText = () => {
    return `${data?.type ? data?.type : ''} ${data?.isArray ? '[]' : ''} ${data?.location ? data?.location : ''} ${
      data?.indentifier ? data?.indentifier : ''
    } ${data?.assignOperation ? data?.assignOperation : ''} ${data?.valueText ? data?.valueText : ''}`;
  };

  useEffect(() => {
    if (mode === 'editing') {
      // convert data to text
      const declaration = convertDataToText().trim();
      setInputText(declaration);
    }
  }, [data, mode]);

  const showSuggestion = (value = inputText) => {
    const element = splitElements(value);
    const nodeData = convertToDeclaration(element);
    const input = document.getElementById(id);

    // get position cursor in value text
    const position = input.selectionStart;

    // get index location or indentifier
    const iLoIn = value.lastIndexOf(nodeData?.location || nodeData?.indentifier);

    // get width of element
    const offsetWidth = input.offsetWidth;

    // get width of value text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = getComputedStyle(document.body).font;

    const { iBeforeSpace, iBehindSpace } = getFirstNearSpace(value, position);
    const textPosition = value.substring(0, position);
    const widthValue =
      Math.floor(context.measureText(textPosition).width) + 48 > offsetWidth
        ? offsetWidth - 48
        : Math.floor(context.measureText(textPosition).width);

    let isOpen = false;
    let listOption = [];
    let textSearch = value.substring(iBeforeSpace, position).trimStart();
    if (iLoIn + nodeData?.location?.length < position) {
      setOpen(false);
      setOptions([]);
      return;
    }

    if (!regex.test(textSearch)) {
      isOpen = true;
      if (iLoIn === -1 || position < iLoIn) {
        const listType = generateDataType();
        listOption = listType.filter((item) => item.label.includes(textSearch));
      } else {
        listOption = LOCATION_OPTIONS.filter((item) => item.label.includes(textSearch));
      }
    }

    setOpen(isOpen);
    setPosition({ ...POSITION_SUGGEST, left: widthValue + 48 });
    setOptions(listOption);
    setPositionChange({ start: iBeforeSpace, end: iBehindSpace });
  };

  const onClickSuggest = (item) => {
    let textValue = '';
    if (!positionChange?.start && !positionChange?.end) {
      textValue = `${item?.value} `;
    } else if (!positionChange?.start && positionChange?.end) {
      textValue = `${item?.value} ${inputText.substring(positionChange?.end).trim()} `;
    } else if (positionChange?.start && !positionChange?.end) {
      textValue = `${inputText.substring(0, positionChange?.start)} ${item?.value} `;
    } else if (positionChange?.start && positionChange?.end) {
      textValue = `${inputText.substring(0, positionChange?.start)} ${item?.value}${inputText.substring(
        positionChange?.end
      )}`;
    }

    // set position cursor
    const input = document.getElementById(id);
    input.focus();

    setOpen(false);
    setInputText(textValue);
  };

  const handleChange = (e) => {
    let value = e.target.value;

    setInputText(value);
  };

  const handleKeyUp = (e) => {
    let value = inputText;
    let keyPress = e.key;
    const input = document.getElementById(id);
    // get position cursor in value text
    const position = input.selectionStart;
    const indexEqual = value.lastIndexOf('=');
    let valuePlus = '';

    switch (e.key) {
      case '[':
        valuePlus = ']';
        break;
      case '{': {
        const index = value.lastIndexOf('{');
        if (indexEqual > -1 && index > indexEqual) {
          valuePlus = '}';
        }
        break;
      }

      case '(': {
        const index = value.lastIndexOf('(');
        if (indexEqual > -1 && index > indexEqual) {
          valuePlus = ')';
        }
        break;
      }

      case "'": {
        const index = value.lastIndexOf("'");
        if (indexEqual > -1 && index > indexEqual) {
          valuePlus = "'";
        }
        break;
      }

      case '"': {
        const index = value.lastIndexOf('"');
        if (indexEqual > -1 && index > indexEqual) {
          valuePlus = '"';
        }
        break;
      }

      case 'Backspace': {
        keyPress = inputText.charAt(position - 1);
        break;
      }

      default:
        break;
    }

    if (valuePlus) {
      value = `${value.substring(0, position)}${valuePlus}${value.substring(position)}`;
      setInputText(value);
    }

    if (regex.test(keyPress)) {
      setOpen(false);
      setOptions([]);
    } else {
      showSuggestion(value);
    }
  };

  const checkValidateText = () => {
    // Validate Declaration
    const element = splitElements(inputText);
    const nodeData = convertToDeclaration(element);
    const errorMess = validateDeclaration(nodeData);

    setErrorText(errorMess);

    return { errorMess, nodeData };
  };

  const onConfirm = () => {
    // Validate Declaration
    const { errorMess, nodeData } = checkValidateText();
    if (errorMess) return;

    // Update Declaration
    const _blocksState = [...blocksState];
    const index = blocksState.findIndex((item) => item?.id === id);

    _blocksState[index]['data'] = { ...nodeData, valueText: nodeData?.value, assignOperation: nodeData?.value && '=' };
    delete _blocksState[index]['data'].value;
    delete _blocksState[index]['data'].errorIsArray;

    logicBlocks.setBlocks(_blocksState);
    setMode('view');
  };

  return (
    <>
      {mode === 'view' && (
        <Card>
          <CardBody>{convertDataToText().trim() || 'Declaration'}</CardBody>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>DECLARATION</Title>
          <ItemContainer error={errorText}>
            <Input
              id={id}
              value={inputText}
              onClick={() => showSuggestion()}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
            {!!errorText && (
              <ErrorContainer>
                <div className="icon">
                  <ErrorIconDeclaration />
                </div>
                <div className="error-text-declaration">{errorText}</div>
              </ErrorContainer>
            )}
            <SuggestionPopover open={open} options={options} position={position} onClick={onClickSuggest} />
          </ItemContainer>
          <ActionContainer>
            <Button className="action-icon" onClick={() => setMode('view')}>
              <IconCancel />
            </Button>
            <Button className="action-icon" onClick={onConfirm}>
              <IconConfirm />
            </Button>
          </ActionContainer>
        </EditingContainer>
      )}
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
    </>
  );
};

export default DeclarationNode;
