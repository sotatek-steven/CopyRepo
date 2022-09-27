import OvalNode from './OvalNode';
import ModuleNode from './ModuleNode';
import SimpleRectangleNode from './SimpleRectangleNode';
import CircleNode from './CircleNode';
import DeclarationNode from './DeclarationNode';
import AssignmentNode from './AssigmentNode';
import InitialNode from './InitialNode';
import ActivityFinalNode from './AcitvityFinalNode';
import DropHereNode from './DropHereNode';
import ConditionNode from './ConditionNode';
import ParentNode from './ParentNode';
import RequireNode from './RequireNode';
import RevertNode from './RevertNode';

const CustomNodes = {
  module: ModuleNode,
  oval: OvalNode,
  simpleRectangle: SimpleRectangleNode,
  circle: CircleNode,
  declaration: DeclarationNode,
  assignment: AssignmentNode,
  initial: InitialNode,
  activityFinal: ActivityFinalNode,
  drop: DropHereNode,
  condition: ConditionNode,
  parent: ParentNode,
  require: RequireNode,
  revert: RevertNode,
};

export default CustomNodes;
