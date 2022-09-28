import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import ButtonRemoveNode from '../atom/ButtonRemoveNode';
import { AbsoluteContainer, Card, CardBody } from './CustomNode.style';

const ContinueNode = ({ id }) => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="data-view">{`Continue`}</div>
        </CardBody>
        <AbsoluteContainer className="action-node">
          <ButtonRemoveNode id={id} />
        </AbsoluteContainer>
      </Card>
      <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
    </>
  );
};

export default ContinueNode;
