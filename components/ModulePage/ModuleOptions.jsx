import React, { useState } from 'react';
import { Popover, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StructIcon from '../../assets/icon/struct.svg';
import LibraryIcon from '../../assets/icon/library.svg';
import OptionItem from './OptionItem';

const MoreButton = styled('div')(({ theme }) => ({
  fontSize: 25,
  color: '#292D32',
  transition: 'color 0.3s',
  ':hover': {
    color: theme.palette.text.primary,
    cursor: 'pointer',
  },
}));

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  width: 372,
}));

const Divide = styled('div')(({ theme }) => ({
  borderBottom: '0.5px dashed #8C8C8C',
}));

const options = [
  {
    id: 'liraries',
    label: 'Libraries',
    icon: <LibraryIcon />,
  },
  {
    id: 'structs',
    label: 'Structs',
    icon: <StructIcon />,
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

  const handleInfoModalOpen = () => {
    handlePopoverClose();
  };
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
            const { id, label, icon } = item;
            return (
              <>
                <OptionItem key={id} label={label} icon={icon} onClick={handleInfoModalOpen} />
                {index !== options.length - 1 && <Divide />}
              </>
            );
          })}
        </Container>
      </Popover>
    </div>
  );
};

export default ModuleOptions;
