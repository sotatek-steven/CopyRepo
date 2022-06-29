/* eslint-disable no-param-reassign */
import React from 'react';
import { styled } from '@mui/material/styles';
import DragIcon from '../../assets/icon/drag.svg';
import { useRouter } from 'next/router';

const Item = styled('div')(({ disable }) => ({
  gap: '17px',
  alignContent: 'center',
  padding: '11px 19px',
  display: disable === 'true' ? 'none' : 'flex',
}));

const Text = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Segoe UI',
  color: theme.palette.text.primary,
  ...theme.components.truncate.singleLineEllipsis,
}));

const ModuleItem = ({ data, nodeType }) => {
  const route = useRouter();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer?.setData('application/reactflow', nodeType);
    const dataJson = JSON.stringify(data);
    event.dataTransfer.setData('foo', dataJson);
    event.dataTransfer.effectAllowed = 'move';
  };

  const redirectToModulePage = () => {
    console.log('data: ', data);
    const { _id } = data;
    console.log('replace');
    route.push(`/modules/${_id}`);
  };

  return (
    <Item
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      key={data.id}
      disable={data.disable.toString()}
      onClick={redirectToModulePage}>
      <div>
        <DragIcon />
      </div>
      <Text>{data.name}</Text>
    </Item>
  );
};

export default ModuleItem;
