import { Button, Tooltip } from '@mui/material';
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
import {
  AbsoluteContainer,
  Footer,
  Card,
  CardBody,
  EditingContainer,
  ErrorContainer,
  ItemContainer,
  Title,
} from './CustomNode.style';

const POSITION_SUGGEST = {
  top: 68,
  left: 48,
};
const regex = new RegExp(REGEX.SPECIAL_CHARACTER);
const DeclarationNode = ({ id, data }) => {
  const moduleState = useSelector((state) => state.userModule);

  const [inputText, setInputText] = useState('');
  const [errorText, setErrorText] = useState('');
  const { validateDeclaration } = useDeclaration();
  const { logicBlocks } = useDispatch();
  const [mode, setMode] = useState(_.isEmpty(data?.params) ? 'editing' : 'view');
  // State Suggest
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [position, setPosition] = useState(POSITION_SUGGEST);
  const [positionChange, setPositionChange] = useState({ start: 0, end: 0 });

  const convertDataToText = () => {
    return `${data?.params?.type ? data?.params?.type : ''} ${data?.params?.isArray ? '[]' : ''} ${
      data?.params?.location ? data?.params?.location : ''
    } ${data?.params?.indentifier ? data?.params?.indentifier : ''} ${
      data?.params?.assignOperation ? data?.params?.assignOperation : ''
    } ${data?.params?.valueText ? data?.params?.valueText : ''}`;
  };

  useEffect(() => {
    if (mode === 'editing') {
      // convert data to text
      const declaration = convertDataToText().trim();
      setInputText(declaration);
      if (!declaration) {
        setErrorText('');
      }
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
      if (iLoIn === -1 || position < iLoIn) {
        const listType = generateDataType();
        listOption = listType.filter((item) => item.label.includes(textSearch));
        isOpen = !!listOption.length;
      } else {
        listOption = LOCATION_OPTIONS.filter((item) => item.label.includes(textSearch));
        const listStructName = moduleState?.sources?.structs?.map((item) => item?.name);
        if (
          nodeData.type === 'string' ||
          nodeData.type === 'bytes' ||
          nodeData.isArray ||
          listStructName.includes(nodeData.type)
        ) {
          isOpen = !!listOption.length;
        }
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

  const handleClickInput = (e) => {
    showSuggestion();
    e.stopPropagation();
  };

  const handleClickOut = () => {
    setOpen(false);
    setOptions([]);
  };

  const checkValidateText = () => {
    // Validate Declaration
    const element = splitElements(inputText);
    const nodeData = convertToDeclaration(element);
    const errorMess = validateDeclaration(id, nodeData);

    setErrorText(errorMess);

    return { errorMess, nodeData };
  };

  const onConfirm = () => {
    // Validate Declaration
    const { errorMess, nodeData } = checkValidateText();
    if (errorMess) return;

    // Update Declaration
    data['params'] = {
      ...nodeData,
      valueText: nodeData?.value,
      assignOperation: nodeData?.value && '=',
    };
    delete data['params'].value;
    delete data['params'].errorIsArray;
    logicBlocks.updateNode(data);
    setMode('view');
  };

  useEffect(() => {
    let size = { width: 200, height: 100 };
    if (mode === 'editing') size = { width: 468, height: 213 };
    logicBlocks.updateNode(id, { size });
  }, [mode]);

  return (
    <>
      {mode === 'view' && (
        <Card className="nodrag">
          <CardBody>
            <Tooltip title={convertDataToText().trim()} placement="top" arrow>
              <div className="data-view">{`Declaration: ${convertDataToText().trim()}`}</div>
            </Tooltip>
          </CardBody>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => setMode('editing')}>
              <IconEditNode />
            </Button>
            <ButtonRemoveNode id={id} />
          </AbsoluteContainer>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer className="nodrag" onClick={handleClickOut}>
          <Title>DECLARATION</Title>
          <ItemContainer error={errorText}>
            <Input id={id} value={inputText} onClick={handleClickInput} onChange={handleChange} onKeyUp={handleKeyUp} />
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
          <Footer>
            <Button className="action-icon" onClick={() => setMode('view')}>
              <IconCancel />
            </Button>
            <Button className="action-icon" onClick={onConfirm}>
              <IconConfirm />
            </Button>
          </Footer>
        </EditingContainer>
      )}
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
    </>
  );
};

export default DeclarationNode;
