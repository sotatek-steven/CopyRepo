import ModalHeaderWarning from './ModalHeaderWarning';
import React from 'react';

export const ModalHeader = ({ type, ...others }) => {
  if (type === 'warning') return <ModalHeaderWarning {...others} />;
  return <div></div>;
};
