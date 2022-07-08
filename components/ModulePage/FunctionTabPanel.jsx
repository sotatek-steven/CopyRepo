import { styled } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import FunctionItem from '../FunctionDrag/FunctionItem';

const FunctionContainer = styled('div')(() => ({
  height: '70vh',
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  height: '17vh',
  padding: '11px 19px',

  '& .title': {
    color: theme.palette.primary.light,
    marginBottom: 8,
    fontSize: '14px',
    fontWeight: '400',
    fontFamily: 'Segoe UI',
    ...theme.components.truncate.singleLineEllipsis,
  },
  '& .content': {
    height: '82%',
    padding: 13,
    border: `1px solid ${theme.palette.text.primary}`,
  },
}));

const FunctionTabPanel = () => {
  const moduleState = useSelector((state) => state.userModule);
  const listFunction = useSelector((state) => state.functions);

  return (
    <div>
      <FunctionContainer>
        <Scrollbars autoHide>
          {!listFunction?.length && <span> Function not found</span>}
          {!!listFunction?.length &&
            listFunction?.map((item, index) => {
              return <FunctionItem key={index} data={item} />;
            })}
        </Scrollbars>
      </FunctionContainer>
      <DescriptionContainer>
        <div className="title">DESCRIPTION</div>
        <div className="content">
          <Scrollbars autoHide>{moduleState?.description}</Scrollbars>
        </div>
      </DescriptionContainer>
    </div>
  );
};

export default FunctionTabPanel;
