import OvalNode from './OvalNode';
import DiamondNode from './DiamondNode';
import RectangleNode from './RectangleNode';
import SimpleRectangleNode from './SimpleRectangleNode';
import CircleNode from './CircleNode';
import DeclarationNode from './DeclarationNode';
import AssignmentNode from './AssigmentNode';

const CustomNodes = {
  rectangle: RectangleNode,
  diamond: DiamondNode,
  oval: OvalNode,
  simpleRectangle: SimpleRectangleNode,
  circle: CircleNode,
  declaration: DeclarationNode,
  assignment: AssignmentNode,
};

export default CustomNodes;
