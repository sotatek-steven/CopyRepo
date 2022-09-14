import { MODE, MODE_ACTION_MODULE, MODULE_OWNER } from '@/config/constant/common';
import { Popover, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModuleInfoModal from '@/components/ModulePage/ModuleInfoModal';
import ModuleDetail from '@/components/ModulePage/ModuleDetail';
const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  width: 125,
  '& > .item': {
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    cursor: 'pointer',
    transition: 'background 0.2s',
    borderBottom: `0.5px dashed ${theme.shape.borderColor}`,
    ':hover': {
      background: theme.hover.background.dark,
    },
    ':last-child': {
      borderBottom: 'unset',
    },
  },
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
}));

const options = [
  {
    id: MODE_ACTION_MODULE.DETAILS,
    label: MODE_ACTION_MODULE.DETAILS,
    mode: MODE_ACTION_MODULE.DETAILS,
  },
  {
    id: MODE_ACTION_MODULE.CLONE,
    label: MODE_ACTION_MODULE.CLONE,
    mode: MODE_ACTION_MODULE.CLONE,
  },
];

const ModuleActionPopover = ({ data }) => {
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenModuleDetail, setIsOpenModuleDetail] = useState(false);
  const [dataClone, setDataClone] = useState({});
  const [isOpenModuleInfo, setIsOpenModuleInfo] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const redirectToModulePage = () => {
    const { _id } = data;
    route.push(`/modules/${_id}`);
  };

  const handleOpenModuleInfo = () => {
    setDataClone({});
    setIsOpenModuleInfo(!isOpenModuleInfo);
  };

  const handleClickActionMenu = (mode) => {
    if (!data) return;
    const { owner, ...dataModule } = data;
    switch (mode) {
      case MODE_ACTION_MODULE.DETAILS:
        setIsOpenModuleDetail(true);
        setAnchorEl(null);
        break;
      case MODE_ACTION_MODULE.SYSTEM_DESIGN:
        redirectToModulePage();
        setAnchorEl(null);
        break;
      case MODE_ACTION_MODULE.CLONE:
        setDataClone({ ...dataModule, name: `${dataModule.name}${Math.floor(Date.now() / 1000)}` });
        setIsOpenModuleInfo(true);
        setAnchorEl(null);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MoreVertIcon
        sx={{
          fontSize: '17px',
        }}
        onClick={handleClickAction}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Container>
          {options.map((item) => {
            const { id, label, mode } = item;
            if (data?.owner.toUpperCase() === MODULE_OWNER.SYSTEM) {
              return (
                <div key={id} className="item" onClick={() => handleClickActionMenu(mode)}>
                  <Label>{label}</Label>
                </div>
              );
            } else {
              if (mode === MODE_ACTION_MODULE.CLONE) {
                return;
              }
              return (
                <div key={id} className="item" onClick={() => handleClickActionMenu(mode)}>
                  <Label>{label}</Label>
                </div>
              );
            }
          })}
        </Container>
      </Popover>
      <ModuleDetail open={isOpenModuleDetail} onClose={() => setIsOpenModuleDetail(false)} moduleId={data._id} />

      <ModuleInfoModal mode={MODE.CLONE} open={isOpenModuleInfo} onClose={handleOpenModuleInfo} data={dataClone} />
    </>
  );
};

export default ModuleActionPopover;
