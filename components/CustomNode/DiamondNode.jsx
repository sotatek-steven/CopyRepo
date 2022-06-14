import { Handle, Position } from 'react-flow-renderer';
import { styled } from '@mui/material/styles';

const Diamond = styled('div')(({ theme }) => ({
  border: 'solid 1px #BEA75A',
  borderRadius: '4px',
  width: '140px',
  height: '140px',
  transform: 'rotate(45deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
  backgroundColor: theme.palette.mode === 'dark' ? '#BEA75A' : '#BEA75A',
}));

const DiamondNode = ({ id }) => (
  <Diamond id={id}>
    <div style={{
      transform: 'rotate(315deg)',
    }}
    >
      Diamond Node
    </div>
    <Handle
      type="source"
      position={Position.Top}
      id="a"
      style={{ background: '#555', left: '0%' }}
    />
    <Handle
      type="target"
      position={Position.Right}
      id="b"
      style={{ background: '#555', top: '0%' }}
    />
    <Handle
      type="target"
      position={Position.Bottom}
      id="c"
      style={{ background: '#555', left: '100%' }}
    />
    <Handle
      type="source"
      position={Position.Left}
      style={{ background: '#555', top: '100%' }}
      id="d"
    />
  </Diamond>
);

export default DiamondNode;
