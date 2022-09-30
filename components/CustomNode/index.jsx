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
import AssertNode from './AssertNode';
import EmitNode from './EmitNode';
import ContinueNode from './ContinueNode';
import ReturnNode from './ReturnNode';
import ReturnsNode from './ReturnsNode';
import DeleteNode from './DeleteNode';
import LogicNode from './LogicNode';
import ForLoopNode from './ForLoopNode';
import UncheckedNode from './UncheckedNode';

const CustomNodes = {
  module: ModuleNode,
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
  assert: AssertNode,
  emit: EmitNode,
  continue: ContinueNode,
  return: ReturnNode,
  returns: ReturnsNode,
  delete: DeleteNode,
  logic: LogicNode,
  forLoop: ForLoopNode,
  unchecked: UncheckedNode,
};

export default CustomNodes;
