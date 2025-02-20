import { Connection, Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";



export type CustomNodeData = {
  nodeName?: string | undefined,
  description?: string | undefined,
  nodeContent?: object | undefined,
}





export type FlowState = {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
  workflow: any;
  activeVariables: any[];


  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  fetchOneWorkFlow: (workflowId: string[] | string) => void;
  setWorkflow: (workflow: FlowState) => void;
  updateWorkflow: (workflow: FlowState) => void
  selectedNode: Node | null;
  setSelectedNode: (node: Node) => void;
  closePopup: () => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  addNode: (nodeId: any, id: any, targetHandle?: "failure" | "success") => void;
  lastNode: () => Node,
  lastEdge: () => Edge,

  saveWorkflow: () => any;
  updateNodeContent: (nodeContent: any, nodeId: string) => void;
  addOption: (node: Node) => string;
  deleteOneOption: (optionId: string) => void;
  onNodesDelete: (node: Node[]) => void;
  // addOptionNode:(label:any , node:any)=>any;

  onConnect: (edge: any) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
  connecting: boolean;
  onConnectStart: () => void;
  onConnectEnd: () => void;
  saving: boolean;
  errors: any[];
  redHilighted: boolean;
  highLightedNode: string;
  setRedHilghted: (nodeId: string) => void;
  onConnect: (edge: any) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
  connecting: boolean;
  onConnectStart: () => void;
  onConnectEnd: () => void;
  optionNodeName: string;
  setOptionNodeName: (name: string, nodeId: string) => void;
  isFlowEnterd: boolean;
  toggleFlowEnterd: (seletedNode: Node) => void;
  partialNodes: Node[];
  currentFlowNode : Node | null;


};
