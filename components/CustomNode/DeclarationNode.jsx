import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Input } from '../Input';
import ErrorIconDeclaration from 'assets/icon/ErrorIconDeclaration.svg';
import IconCancel from 'assets/icon/IconCancel.svg';
import IconConfirm from 'assets/icon/IconConfirm.svg';
import IconEditNode from 'assets/icon/IconEditNode.svg';
import IconDeleteNode from 'assets/icon/IconDeleteNode.svg';
import SuggestionPopover from '../SuggestionPopover';
import { convertToDeclaration, splitElements } from '@/config/constant/common';
import useDeclaration from '../functionsPage/hooks/useDeclaration';

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

const DeclarationNode = ({ data }) => {
  const { _id, mode, textDeclaration, handleChangeMode, handleConfirm, handleCancel } = data;
  const [inputText, setInputText] = useState(textDeclaration);
  const [errorText, setErrorText] = useState('');
  const [isOpenSuggest, setIsOpenSuggest] = useState(false);
  const [position, setPosition] = useState({ top: 62, left: 32 });
  const { validateDeclaration } = useDeclaration();

  const handleChange = (e) => {
    let element = document.getElementById(`${_id}`);
    setIsOpenSuggest(true);
    const plusLeft =
      e.target.selectionEnd * 8 <= element.offsetWidth - 40 ? e.target.selectionEnd * 8 : element.offsetWidth - 40;
    setPosition({
      top: element.offsetTop + 30,
      left: element.offsetLeft + plusLeft,
    });

    setInputText(e.target.value);
  };

  const onConfirm = () => {
    // Validate Declaration
    const element = splitElements(inputText);
    const nodeData = convertToDeclaration(element);
    const errorMess = validateDeclaration(nodeData);

    if (errorMess) {
      setErrorText(errorMess);
      return;
    }

    // Update Declaration
    nodeData.textDeclaration = inputText;
    handleConfirm(_id, nodeData);
  };

  return (
    <>
      {mode === 'init' && (
        <Card id={_id}>
          <CardBody>
            {textDeclaration}
            <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
            <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
          </CardBody>
          <AbsoluteContainer className="action-node">
            <Button className="action-icon" onClick={() => handleChangeMode(_id)}>
              <IconEditNode />
            </Button>
            <Button className="action-icon">
              <IconDeleteNode />
            </Button>
          </AbsoluteContainer>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>DECLARATION</Title>
          <ItemContainer error={errorText}>
            <Input id={_id} value={inputText} onClick={handleChange} onChange={handleChange} onKeyDown={handleChange} />
            <SuggestionPopover open={isOpenSuggest} position={position} options={[{ label: 1 }, { label: 2 }]} />
            {!!errorText && (
              <ErrorContainer>
                <div className="icon">
                  <ErrorIconDeclaration />
                </div>
                <div className="error-text-declaration">{errorText}</div>
              </ErrorContainer>
            )}
          </ItemContainer>
          <ActionContainer>
            <Button className="action-icon" onClick={() => handleCancel(_id)}>
              <IconCancel />
            </Button>
            <Button className="action-icon" onClick={onConfirm}>
              <IconConfirm />
            </Button>
          </ActionContainer>
          <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
        </EditingContainer>
      )}
    </>
  );
};

export default DeclarationNode;
