import { styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ModuleItem from '../ModuleDrag/ModuleItem';

const FunctionContainer = styled('div')(({ theme }) => ({
  height: '70vh',
  overflowY: 'scroll',
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
    overflowY: 'scroll',
  },
}));

const FunctionTabPanel = () => {
  const moduleState = useSelector((state) => state.userModule);

  return (
    <div>
      <FunctionContainer>
        {!moduleState?.sources?.functions?.length && <span> Function not found</span>}
        {!!moduleState?.sources?.functions?.length?.length &&
          moduleState?.sources?.functions?.length.map((item, index) => {
            return <ModuleItem key={index} data={item} />;
          })}
      </FunctionContainer>
      <DescriptionContainer>
        <div className="title">DESCRIPTION</div>
        <div className="content">{moduleState?.description}</div>
      </DescriptionContainer>
    </div>
  );
};

export default FunctionTabPanel;
