import FunctionDetail from '@/components/ModulePage/FunctionDetail';
import { Popover, styled } from '@mui/material';
import React, { useState } from 'react';

const ItemContainer = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  width: 125,
  '& > .item': {
    borderBottom: `0.5px dashed ${theme.shape.borderColor}`,
    ':last-child': {
      borderBottom: 'unset',
    },
  },
}));

const Label = styled('div')(({ theme }) => ({
  padding: 12,
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: theme.typography.fontWeightRegular,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'background 0.2s',
  ':hover': {
    background: theme.hover.background.dark,
  },
}));

const ActionPopover = ({ open, anchorEl, handlePopoverClose, functionId }) => {
  const idPopover = open ? 'simple-popover' : undefined;
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const showDetailFunction = () => {
    handlePopoverClose();
    setDetailModalOpen(true);
  };

  return (
    <>
      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 50,
          horizontal: -5,
        }}>
        <ItemContainer>
          <Label onClick={showDetailFunction}>Details</Label>
        </ItemContainer>
      </Popover>

      <FunctionDetail open={detailModalOpen} onClose={() => setDetailModalOpen(false)} functionId={functionId} />
    </>
  );
};

export default ActionPopover;
