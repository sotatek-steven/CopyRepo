import { styled } from '@mui/material/styles';
import { Handle, Position } from 'react-flow-renderer';

const Container = styled('div')(({ theme }) => ({
  border: `solid 1px ${theme.shape.backgroundNode}`,
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.shape.backgroundNode,
}));

const CircleNode = ({ id, data }) => (
  <Container id={id}>
    <Handle type="source" position={Position.Right} id="a1" style={{ background: '#555' }} />
    <Handle type="target" position={Position.Left} id="c1" style={{ background: '#555' }} />
    <div>{data.label}</div>
  </Container>
);

export default CircleNode;
