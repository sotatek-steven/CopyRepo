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

const GasContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 10,
  marginBottom: 17,
  '& > .title': {
    color: theme.palette.success.main,
  },
}));

const FunctionContainer = styled('div')(({ theme }) => ({
  marginBottom: 17,
  '& > .title': {
    color: theme.palette.primary.light2,
  },
}));

const ParamContainer = styled('div')(({ theme }) => ({
  marginBottom: 17,
  '& > .title': {
    color: theme.palette.primary.purple,
  },
}));

const LibraryContainer = styled('div')(({ theme }) => ({
  '& > .title': {
    color: theme.palette.primary.yellow,
  },
}));

const ModuleDetail = ({ open, onClose, moduleId }) => {
  const { userModule } = useDispatch();
  const [moduleInfo, setModuleInfo] = useState({});
  useEffect(async () => {
    if (open && moduleId) {
      const data = await userModule.getDetailModule(moduleId);
      if (data) {
        setModuleInfo(data);
      }
    }
  }, [open, moduleId]);

  return (
    <FormModal
      height={600}
      width={750}
      open={open}
      onClose={onClose}
      title={'Mintable Token Details'}
      showFooter={false}>
      <Container>
        <GasContainer>
          <div className="title">Gas fee:</div>
          <div className="content">{moduleInfo?.gasFee}</div>
        </GasContainer>
        <FunctionContainer>
          <div className="title">Functions</div>
          <div className="content">{moduleInfo?.sources?.functions?.toString()}</div>
        </FunctionContainer>
        <ParamContainer>
          <div className="title">Parameters Included</div>
          <div className="content">{moduleInfo?.sources?.contructorParams?.toString()}</div>
        </ParamContainer>
        <LibraryContainer>
          <div className="title">Libraries</div>
          <div className="content">
            {moduleInfo?.sources?.libraries?.map((item) => {
              return <div key={item}>{item}</div>;
            })}
          </div>
        </LibraryContainer>
      </Container>
    </FormModal>
  );
};

export default ModuleDetail;
