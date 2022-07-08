import { HTTP_CODE } from '@/config/constant/common';
import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormModal from '../FormModal';

const Container = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  ...theme.components.truncate.singleLineEllipsis,
}));

const Content = styled('div')(({ theme }) => ({
  marginBottom: 17,
  '& > .title': {
    color: theme.palette.primary.light,
  },
}));

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

  return (
    <FormModal height={600} width={750} open={open} onClose={onClose} title={functionInfo?.name} showFooter={false}>
      <Container>
        <Content>
          <div className="title">Name</div>
          <div className="content">{functionInfo?.name}</div>
        </Content>
        <Content>
          <div className="title">Description</div>
          <div className="content">{functionInfo?.description}</div>
        </Content>
        <Content>
          <div className="title">Scope</div>
          <div className="content">{functionInfo?.scopes?.scope}</div>
        </Content>
        <Content>
          <div className="title">Parameters Included</div>
          <div className="content">{functionInfo?.params?.map((item) => item?.label)?.toString()}</div>
        </Content>
        <Content>
          <div className="title">Returns</div>
          <div className="content">{functionInfo?.returnVariables?.toString()}</div>
        </Content>
      </Container>
    </FormModal>
  );
};

export default FunctionDetail;
