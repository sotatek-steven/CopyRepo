import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme, open, position }) => ({
  position: 'absolute',
  zIndex: '100',
  top: position.top,
  left: position.left,
  display: open === 1 ? 'block' : 'none',
  background: theme.palette.background.dark,
  maxWidth: 300,
}));

const SuggestionItem = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightRegular,
  padding: '3px 10px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  ...theme.components.truncate.singleLineEllipsis,
  ':hover': {
    background: theme.palette.background.light,
  },
}));

const SuggestionPopover = ({ open, options, position, onClick }) => {
  return (
    <Container open={open ? 1 : 0} position={position}>
      {options?.map((item, index) => {
        return (
          <SuggestionItem key={index} onClick={() => onClick(item)}>
            {item.label}
          </SuggestionItem>
        );
      })}
    </Container>
  );
};

export default SuggestionPopover;
