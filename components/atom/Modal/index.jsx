import ModalHeaderWarning from './ModalHeaderWarning';
import React from 'react';
import ModalHeaderBasic from './ModalHeaderBasic';

export const ModalHeader = ({ type, ...others }) => {
  if (type === 'warning') return <ModalHeaderWarning {...others} />;
  return <ModalHeaderBasic {...others} />;
};
