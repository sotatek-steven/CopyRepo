import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';
import TextIcon from '@/assets/icon/text.svg';
import FunctionIcon from '@/assets/icon/function.svg';
import VariableIcon from '@/assets/icon/variable.svg';

const Container = styled('div')(({ theme, position }) => ({
  position: 'absolute',
  zIndex: '100',
  top: position.top,
  left: position.left,
  background: theme.palette.background.dark,
  maxWidth: 300,
}));

const SuggestionItem = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
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

const SuggestionPopover = ({ options, position, onClick, setOpen }) => {
  const wrapperRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef?.current && !wrapperRef.current.contains(event.target)) {
        if (!setOpen) return;
        setOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <Container ref={wrapperRef} position={position} className="nowheel">
      <Scrollbars autoHeight autoHeightMax={140}>
        {options?.map((item, index) => {
          const { type, label } = item;
          return (
            <SuggestionItem key={index} onClick={() => onClick(item)}>
              {type === 'text' ? (
                <TextIcon width={14} height={14} fill={theme.palette.text.primary} />
              ) : type === 'function' ? (
                <FunctionIcon width={11} height={11} fill={theme.palette.text.primary} />
              ) : (
                <VariableIcon width={13} height={13} fill={theme.palette.text.primary} />
              )}
              <div>{label}</div>
            </SuggestionItem>
          );
        })}
      </Scrollbars>
    </Container>
  );
};

export default SuggestionPopover;
