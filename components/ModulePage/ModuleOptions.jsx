import React, { useState } from 'react';
import { Popover, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StructIcon from '../../assets/icon/struct.svg';
import LibraryIcon from '../../assets/icon/library.svg';
import OptionItem from './OptionItem';
import { ModuleMode } from '@/store/models/moduleDesignMode';
import { DashedDivider } from '../atom/Divider';

const MoreButton = styled('div')(({ theme }) => ({
  fontSize: 25,
  color: '#292D32',
  transition: 'color 0.3s',
  cursor: 'pointer',
  ':hover': {
    color: theme.palette.text.primary,
  },
}));

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  width: 372,
}));

const options = [
  {
    id: 'libraries',
    label: 'Libraries',
    icon: <LibraryIcon />,
    mode: ModuleMode.LIBRARY,
  },
  {
    id: 'structs',
    label: 'Structs',
    icon: <StructIcon />,
    mode: ModuleMode.STRUCT,
  },
];

const ModuleOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <MoreButton onClick={handleClick}>
        <MoreVertIcon />
      </MoreButton>
      <Popover
        // sx={{
        //   boxShadow: '0px 0px 4px #A8A19F!important',
        //   width: 400,
        // }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Container>
          {options.map((item, index) => {
            const { id, label, icon, mode } = item;
            return (
              <div key={id}>
                <OptionItem key={id} mode={mode} label={label} icon={icon} />
                {index !== options.length - 1 && <DashedDivider />}
              </div>
            );
          })}
        </Container>
      </Popover>
    </div>
  );
};

export default ModuleOptions;
