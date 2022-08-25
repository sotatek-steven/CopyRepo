import { styled } from '@mui/material';
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { PrimaryButton } from '../ButtonStyle';
import { Input } from '../Input';
import ErrorIconDeclaration from 'assets/icon/ErrorIconDeclaration.svg';

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

const DeclarationNode = ({ data }) => {
  const { _id, mode, textDeclaration, handleChangeMode, handleConfirm } = data;
  const [inputText, setInputText] = useState(textDeclaration);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <>
      {mode === 'init' && (
        <Card id={_id} onDoubleClick={() => handleChangeMode(_id)}>
          <CardBody>
            {textDeclaration || 'Declaration'}
            <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
            <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
          </CardBody>
        </Card>
      )}
      {mode === 'editing' && (
        <EditingContainer>
          <Title>DECLARATION</Title>
          <ItemContainer error={!inputText}>
            <Input value={inputText} onChange={handleChange} />
            {!inputText && (
              <ErrorContainer>
                <div className="icon">
                  <ErrorIconDeclaration />
                </div>
                <div className="error-text-declaration">Lorem ipsum dolor sit amet</div>
              </ErrorContainer>
            )}
          </ItemContainer>
          <ActionContainer>
            <PrimaryButton onClick={() => handleConfirm(_id, inputText)}>OK</PrimaryButton>
          </ActionContainer>
          <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Right} id="c" style={{ background: '#555' }} />
        </EditingContainer>
      )}
    </>
  );
};

export default DeclarationNode;
