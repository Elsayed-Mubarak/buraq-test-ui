import React, { useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant, Controls, MiniMap, Panel, useReactFlow } from '@xyflow/react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import useFlowStore from './reactflowstate/store';
import { useParams } from 'next/navigation';
import CustomNode from './nodetypes/custom-node/CustomNode';
import NodeSettingsBar from './node-settings-bar/node-settings-bar';
import CustomEdge from './edgetypes/CustomEdge';
import WorkflowHeader from './header/WorkflowHeader';

export const dynamic = "force-dynamic";

import { items } from "./shared/Items";
import ConnectionLine from './nodetypes/custom-node/ConnectionLine';
import { INewFlowNodeContent } from '@/types/workflows/nodes/newFlow/newFlow';

export const nodeTypes: any = {
  trigger: (props: any) => <CustomNode {...props} type="trigger" />,
  message: (props: any) => <CustomNode {...props} type="message" />,
  collect_input: (props: any) => <CustomNode {...props} type="collect_input" />,
  email: (props: any) => <CustomNode {...props} type="email" />,
  Condition: (props: any) => <CustomNode {...props} type="Condition" />,
  Option: (props: any) => <CustomNode {...props} />,
  calender: (props: any) => <CustomNode {...props} type="calender" />,
  image: (props: any) => <CustomNode {...props} type="image" />,
  carousel: (props: any) => <CustomNode {...props} type="carousel" />,
  dialog: (props: any) => <CustomNode {...props} type="dialog" />,
  button: (props: any) => <CustomNode {...props} type="button" />,
  slider: (props: any) => <CustomNode {...props} type="slider" />,
  form: (props: any) => <CustomNode {...props} type="form" />,
  delay: (props: any) => <CustomNode {...props} type="delay" />,
  file: (props: any) => <CustomNode {...props} type="file" />,
  flow: (props: any) => <CustomNode {...props} type="flow" />,
  jump: (props: any) => <CustomNode {...props} type="jump" />,
  catalogue: (props: any) => <CustomNode {...props} type="catalogue" />,
  whatsapp_flow: (props: any) => <CustomNode {...props} type="whatsapp_flow" />,
  google_analytics: (props: any) => <CustomNode {...props} type="google_analytics" />,
  dynamic_data: (props: any) => <CustomNode {...props} type="dynamic_data" />,
  zoho: (props: any) => <CustomNode {...props} type="zoho" />,
  zapier: (props: any) => <CustomNode {...props} type="zapier" />,
  slack: (props: any) => <CustomNode {...props} type="slack" />,
  slack_chat: (props: any) => <CustomNode {...props} type="slack_chat" />,
  set_AI: (props: any) => <CustomNode {...props} type="set_AI" />,
  answer_AI: (props: any) => <CustomNode {...props} type="answer_AI" />,
  options1: (props: any) => <CustomNode {...props} type="options1" />,
  list: (props: any) => <CustomNode {...props} type="list" />,
  freshDesk: (props: any) => <CustomNode {...props} type="freshDesk" />,
  hubSpot: (props: any) => <CustomNode {...props} type="hubSpot" />,
  googleSheets: (props: any) => <CustomNode {...props} type="googleSheets" />,
  salesForce: (props: any) => <CustomNode {...props} type="salesForce" />,
  http_request: (props: any) => <CustomNode {...props} type="http_request" />,
  javascript: (props: any) => <CustomNode {...props} type="javascript" />,
  human: (props: any) => <CustomNode {...props} type="human" />,
  webhook: (props: any) => <CustomNode {...props} type="webhook" />,
  send_status: (props: any) => <CustomNode {...props} type="send_status" />,
  send_sms: (props: any) => <CustomNode {...props} type="send_sms" />,
  send_whatsapp: (props: any) => <CustomNode {...props} type="send_whatsapp" />,
  FlowStart: (props: any) => <CustomNode {...props} type='FlowStart' />,
};


for (const key in items) {
  if (items.hasOwnProperty(key)) {
    nodeTypes[key] = (props: any) => <CustomNode {...props} type={items[key].label.toLowerCase()} />;
  }
}

const ReactFlowComponent: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, fetchOneWorkFlow, setSelectedNode, onNodesDelete, onConnect, onNodeDragStop, onConnectStart, onConnectEnd, saving, errors, isFlowEnterd, selectedNode, partialNodes } = useFlowStore();


  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    reactFlowInstance.setCenter(200, 350, { zoom: 1 });
  }, [reactFlowInstance]);

  // useEffect(() => {
  //   console.log("ReactFlowComponent errors")
  //   console.log(errors)

  // })


  const { workflowId } = useParams();

  React.useEffect(() => {
    fetchOneWorkFlow(workflowId);
  }, [workflowId]);

  const onNodeClick = (event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  }

  const styles = {
    background: '#f3f3f3',
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  useEffect(() => {
    console.log(isFlowEnterd)
  })

  return (
    <div className='w-full h-screen'>

      <WorkflowHeader saving={saving} errors={errors} />

      <ReactFlow

        // nodes={nodes}
        nodes={isFlowEnterd ? partialNodes : nodes}
        edges={edges}
        // onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        onEdgeMouseEnter={() => { console.log("mouse Entered into edge") }}
        onNodeDragStop={onNodeDragStop}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineComponent={ConnectionLine}
        onNodeClick={onNodeClick}
        // onNodeMouseEnter={onNodeMouseEnter}
        // onNodeMouseLeave={onNodeMouseLeave}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodesFocusable
        connectionLineStyle={{
          color: "#3076a8",
          strokeDasharray: "10, 10",
          strokeWidth: 3,
          stroke: "red",
          // opacity: 0.5,
        }}
        // panOnScroll
        // selectionOnDrag
        // panOnDrag={false}

        zoomOnScroll={false}


        colorMode="light"
        style={styles}
        onConnect={onConnect}
      >
        <Background
          id="1"
          gap={11}
          color="#4C3947B8"
          variant={BackgroundVariant.Dots}

        />
        <MiniMap />
        <Controls />
        <NodeSettingsBar />
      </ReactFlow>
    </div>
  );
};

function FlowWithProvider(prop: any) {
  return (
    <>

      <ReactFlowProvider>
        <ReactFlowComponent />
      </ReactFlowProvider>
    </>
  );
}

export default FlowWithProvider;
