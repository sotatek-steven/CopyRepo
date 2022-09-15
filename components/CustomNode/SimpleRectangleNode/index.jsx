import { styled, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import ActionPopover from './ActionPopover';
import { Handle, Position } from 'react-flow-renderer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import _ from 'lodash';

const Card = styled('article')(({ color, theme, error }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: 208,
  height: 94,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
  border: error === 1 ? `solid 2px ${theme.palette.primary.red1}` : 'none',
  position: 'relative',
}));

const CardHeader = styled('header')(() => ({
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 7,
}));

const Button = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: 'color, 0.2s',
  fontSize: 17,
  ':hover': {
    color: `${theme.palette.primary.contrastText}9c`,
  },
}));

const CardBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const Content = styled('p')(({ theme }) => ({
  margin: 0,
  textAlign: 'center',
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: theme.typography.fontWeightBold,
  ...theme.components.truncate.twoLineEllipsis,
  wordBreak: 'break-all',
}));

const ErrorFlag = styled('div')(({ theme }) => ({
  background: theme.palette.primary.light2,
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  borderRadius: '5px 5px 0px 0px',
  width: 21,
  height: 19,
  position: 'absolute',
  right: '25px',
  top: '-20px',
}));

const SimpleRectangleNode = ({ data, id }) => {
  const { name, onDeleteNode, _id: functionId, color } = data;
  const [anchorEl, setAnchorEl] = useState(null);
  const moduleState = useSelector((state) => state.userModule);
  const mapping = useSelector((state) => state.mapping);
  const object = useSelector((state) => state.object);
  const value = useSelector((state) => state.value);
  const error = useMemo(() => {
    const errorFunctions = mapping.errorFunctions.concat(object.errorFunctions, value.errorFunctions);
    const uniqErrorFunctions = _.uniq(errorFunctions);

    return uniqErrorFunctions.includes(id);
  }, [mapping, object, value]);

  const open = Boolean(anchorEl);

  const deleteModule = (event) => {
    event.stopPropagation();
    if (!onDeleteNode) return;
    onDeleteNode(id, functionId);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card color={color} error={error ? 1 : 0}>
        {error && (
          <Tooltip
            title={`The name of the variable mapped to this function identifier is duplicated with another declared variable. Please go to 'Add Fields' to changes the variable name. Or you can remove duplicated variables and map all of desired functions under a single variable`}
            placement="top"
            arrow>
            <ErrorFlag>
              <ErrorOutlineIcon fontSize="14px" />
            </ErrorFlag>
          </Tooltip>
        )}
        <CardHeader>
          <Button onClick={handlePopoverOpen}>
            <MoreVertIcon />
          </Button>
          {moduleState?.owner.toLowerCase() !== 'system' && (
            <Button onClick={deleteModule}>
              <CloseIcon />
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Content>{name}</Content>
          <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
        </CardBody>
      </Card>
      <ActionPopover open={open} anchorEl={anchorEl} handlePopoverClose={handlePopoverClose} functionId={functionId} />
    </>
  );
};

export default SimpleRectangleNode;
