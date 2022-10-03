import { styled } from '@mui/material/styles';
import { Handle, Position } from 'react-flow-renderer';

const Card = styled('article')(({ theme, width, height }) => ({
  padding: '10px 15px',
  width: width || 700,
  height: height || 500,
  backgroundColor: theme.palette.background.parentNode,
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  border: `1px dashed`,
  borderColor: theme.palette.text.primary,
  '&:hover': {
    '.action-node': {
      display: 'flex',
    },
  },
}));

const CardBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  fontStyle: 'italic',
});

const ForLoopConditionNode = ({ id, data }) => (
  <>
    <Card width={data?.size.width} height={data?.size.height}>
      For Loop Node
      <CardBody>
        <Handle type="target" position={Position.Top} id="a" style={{ background: '#555' }} />
        <Handle type="source" position={Position.Bottom} id="c" style={{ background: '#555' }} />
      </CardBody>
    </Card>
  </>
);

export default ForLoopConditionNode;
