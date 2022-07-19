import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormModal from '../FormModal';
import Scrollbars from 'react-custom-scrollbars';

const Wrapper = styled('div')(() => ({
  marginBottom: 17,
  fontFamily: 'Segoe UI',
}));

const Label = styled('h6')(({ theme }) => ({
  fontSize: 16,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.light,
  margin: '0px 0px 5px',
}));

const Description = styled('p')(({ theme }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.primary,
  margin: 0,
}));

const ContentItem = ({ label, description }) => {
  if (!description) return <></>;
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Description>{description}</Description>
    </Wrapper>
  );
};

const FunctionDetail = ({ open, onClose, functionId }) => {
  const { functions } = useDispatch();
  const [functionInfo, setFunctionInfo] = useState({});
  useEffect(() => {
    getDetailFunction();
  }, [open, functionId]);

  const getDetailFunction = async () => {
    try {
      if (open && functionId) {
        const { code, data } = await functions.getDetailUserFunction(functionId);
        if (code === HTTP_CODE.SUCCESS) {
          setFunctionInfo(data);
        }
      }
    } catch (error) {
      console.log('error');
    }
  };

  const getModifierOfFunction = (modifiers) => {
    if (!modifiers) return null;
    const modifierNames = modifiers.map((modifier) => modifier.content.name);
    return modifierNames.join(', ');
  };

  return (
    <FormModal height={600} width={750} open={open} onClose={onClose} title={functionInfo?.name} showFooter={false}>
      <Scrollbars style={{ height: '450px' }}>
        <ContentItem label="Name" description={functionInfo?.name} />
        <ContentItem label="Description" description={functionInfo?.description} />
        <ContentItem label="Type" description={functionInfo?.scopes?.type} />
        <ContentItem label="Scope" description={functionInfo?.scopes?.scope} />
        <ContentItem label="Modifiers" description={getModifierOfFunction(functionInfo?.modifiers)} />
      </Scrollbars>
    </FormModal>
  );
};

export default FunctionDetail;
