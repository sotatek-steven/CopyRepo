import { styled } from '@mui/material/styles';
import {
  Handle,
  Position,
} from 'react-flow-renderer';

const OvalShape = styled('div')(({ theme }) => ({
  border: 'solid 1px #BEA75A',
  borderRadius: '50%',
  width: '230px',
  height: '130px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
  backgroundColor: theme.palette.mode === 'dark' ? '#BEA75A' : '#BEA75A',
}));

const OvalNode = ({ id, data }) => (
  <>
    <OvalShape id={id}>

      <div>
        Oval Node
      </div>
      <Handle
        type="source"
        position={Position.Top}
        id="a1"
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="b1"
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="c1"
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555' }}
        id="d1"
      />
      <div>{data.text}</div>
    </OvalShape>
  </>
);

export default OvalNode;
