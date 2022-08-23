import { Popover, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../atom/BackButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoFunctionModal from '../CreateFunction/InfoFunctionModal';
import ConfirmDialog from '../atom/Dialog/ConfirmDialog';
import _ from 'lodash';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  position: 'absolute',
  zIndex: 100,
  top: 100,
  left: 60,
  color: theme.palette.primary.light,
  ...theme.typography.h2,
  fontFamily: 'Segoe UI',
}));

const ModuleActionItem = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: '7px 10px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: 'opacity 0.15s ease-in-out',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
}));

const moreVertIconStyle = {
  fontSize: 23,
  cursor: 'pointer',
};

const FunctionInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [functionModalOpen, setFunctionModalOpen] = useState(false);
  const [saveChangeDialogOpen, setSaveChangeDialogOpen] = useState(false);

  const route = useRouter();
  const { userFunction, functionDefinition } = useDispatch();
  const functionState = useSelector((state) => state.userFunction);
  const functionDefinitionState = useSelector((state) => state.functionDefinition);
  const initialFunctionState = useSelector((state) => state.initialFunction);

  const redirectToModulePage = () => {
    route.back();
  };

  const handleSaveConfirm = async () => {
    // console.log(initialFunctionState);
    // console.log(functionState);
    if (functionState.owner === 'system' || _.isEqual(initialFunctionState, functionState)) {
      redirectToModulePage();
      return;
    }
    setSaveChangeDialogOpen(true);
  };

  const saveChangeAndRedirect = async () => {
    userFunction.updateFunction(functionState);
    redirectToModulePage();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleInfoModalOpen = () => {
    setFunctionModalOpen(true);
    handlePopoverClose();
  };

  const handleSubmit = async () => {
    const dataTransferApi = await functionDefinition.convertToDataTransferApi(functionDefinitionState);
    userFunction.updateDefinition(dataTransferApi);
    setFunctionModalOpen(false);
  };

  const handleCancel = async () => {
    setFunctionModalOpen(false);
    if (functionState?.owner === 'system') return;
    const FEData = await functionDefinition.convertToFEDataDisplay(functionState);
    functionDefinition.update(FEData);
  };

  return (
    <>
      <Wrapper>
        <BackButton onClick={handleSaveConfirm} />
        <span>{functionState?.name}</span>
        <MoreVertIcon sx={moreVertIconStyle} onClick={handleClick} />
        <Popover
          sx={{
            '& .MuiPopover-paper': {
              borderRadius: 0,
            },
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
          <ModuleActionItem onClick={handleInfoModalOpen}>Function Infomation</ModuleActionItem>
        </Popover>
      </Wrapper>

      <InfoFunctionModal
        open={functionModalOpen}
        onClose={() => setFunctionModalOpen(false)}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        mode={functionState?.owner === 'system' ? 'view' : 'edit'}
      />

      <ConfirmDialog
        open={saveChangeDialogOpen}
        onClose={() => setSaveChangeDialogOpen(false)}
        onDisagree={redirectToModulePage}
        onAgree={saveChangeAndRedirect}
        title="You have unsave changes"
        closeText="Discard"
        agreeText="Save"
      />
    </>
  );
};

export default FunctionInfo;
