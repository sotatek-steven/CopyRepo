import { styled } from '@mui/material/styles';
import { Handle, Position } from 'react-flow-renderer';

const Card = styled('div')(({ theme, color }) => ({
  padding: '10px 15px',
  borderRadius: 30,
  width: 200,
  height: 100,
  backgroundColor: color || '#BEA75A',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
}));

const ReturnsNode = ({ id, data }) => (
  <>
    <Card id={id}>
      <div>Returns Node</div>
      <Handle type="target" position={Position.Top} id="a1" style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} id="c1" style={{ background: '#555' }} />
    </Card>
  </>
);

export default ReturnsNode;
