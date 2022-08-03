import { styled } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import ModuleInfoModal from './ModuleInfoModal';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../atom/Dialog/ConfirmDialog';
import { useRouter } from 'next/router';
import { MODE } from '@/config/constant/common';
import BackButton from '../atom/BackButton';
import _ from 'lodash';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  position: 'absolute',
  top: 32,
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

const ModuleControl = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [saveChangeDialogOpen, setSaveChangeDialogOpen] = useState(false);

  const route = useRouter();
  const { userModule } = useDispatch();
  const moduleState = useSelector((state) => state.userModule);
  const initialModuleState = useSelector((state) => state.initialModule);
  const contractState = useSelector((state) => state.contract);

  const redirectToContractPage = () => {
    // const { _id: id } = contractState.current;
    // console.log('contractState.current: ', contractState.current);
    // if (!id) return;
    // route.push(`/smartcontract/${id}`);
    route.back();
  };

  const handleConfirm = async () => {
    // console.log('initialModuleState : ', JSON.stringify({ ...initialModuleState, updatedAt: '' }));
    // console.log('moduleState: ', JSON.stringify({ ...moduleState, updatedAt: '' }));
    if (
      moduleState.owner === 'system' ||
      _.isEqual({ ...initialModuleState, updatedAt: '' }, { ...moduleState, updatedAt: '' })
    ) {
      console.log('fkdf');
      redirectToContractPage();
      return;
    }
    console.log('no redirect');
    setSaveChangeDialogOpen(true);
  };

  const saveChangeAndRedirect = async () => {
    await userModule.updateModule({ moduleId: moduleState._id, moduleInfo: moduleState });
    redirectToContractPage();
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
    setInfoModalOpen(true);
    handlePopoverClose();
  };

  return (
    <>
      <Wrapper>
        <BackButton onClick={handleConfirm} />
        <span>{moduleState.name}</span>
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
          <ModuleActionItem onClick={handleInfoModalOpen}>Module Infomation</ModuleActionItem>
        </Popover>
      </Wrapper>

      <ModuleInfoModal
        mode={MODE.EDIT}
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={moduleState}
      />

      <ConfirmDialog
        open={saveChangeDialogOpen}
        onClose={() => setSaveChangeDialogOpen(false)}
        onDisagree={redirectToContractPage}
        onAgree={saveChangeAndRedirect}
        title="You have unsave changes"
        closeText="Discard"
        agreeText="Save"
      />
    </>
  );
};

export default ModuleControl;
