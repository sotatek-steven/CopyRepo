import { styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Popover from '@mui/material/Popover';
import { PrimaryButton } from '../ButtonStyle';
import ModuleInfoModal from './ModuleInfoModal';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../atom/Dialog/ConfirmDialog';
import { useRouter } from 'next/router';
import { MODE } from '@/config/constant/common';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  position: 'absolute',
  top: 32,
  left: 67,
  color: theme.palette.primary.light,
  ...theme.typography.h2,
  fontFamily: 'Segoe UI',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 26,
  height: 26,
  overflow: 'hidden',
  border: 'solid 1px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

const arrowIconStyle = {
  fontSize: 17,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-30%, -50%)',
};

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
  const contractState = useSelector((state) => state.contract);

  const redirectToContractPage = () => {
    const { _id: id } = contractState.current;
    if (!id) return;
    route.push(`/smartcontract/${id}`);
    // route.back();
  };

  const handleConfirm = async () => {
    const moduleData = await userModule.getDetailModule(moduleState._id);
    if (JSON.stringify({ ...moduleData, updatedAt: '' }) === JSON.stringify({ ...moduleState, updatedAt: '' })) {
      redirectToContractPage();
      return;
    }
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
        <IconWrapper onClick={handleConfirm}>
          <ArrowBackIosIcon sx={arrowIconStyle} />
        </IconWrapper>
        <span>{moduleState.name}</span>
        <MoreVertIcon sx={moreVertIconStyle} onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
          <PrimaryButton width="150px" onClick={handleInfoModalOpen}>
            Module Infomation
          </PrimaryButton>
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
