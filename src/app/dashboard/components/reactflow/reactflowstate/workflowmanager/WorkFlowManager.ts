import { Item } from './../../../../../../types/workflows/nodes/list.content.d';
import { Position, XYPosition } from '@xyflow/react';
// import { CustomNodeData, FlowState } from '@/types/workflow/FlowState.d';
import { Edge, Node } from "@xyflow/react";
import axios from "axios";
import { ObjectId } from "bson";
import { conditionIntitalData } from '@/constants/nodes/condition.data';
import { collectInputInitialData } from '@/constants/nodes/collect.data';
import { ConditionNodeContent } from '@/types/workflows/nodes/condition.content';
import { collectFileInitialData } from '@/constants/nodes/collectFile.data';
import { jumpInitialData } from '@/constants/nodes/jump.data';
import { SalesForceInititalData } from '@/constants/nodes/salesforce.data';
import { sendEmailInitialData } from '@/constants/nodes/email.data';
import { replyButtonInitialData } from '@/constants/nodes/replyButton.data';
import { IReplyButtonNodeContent } from '@/types/workflows/nodes/replyButton.content';
import { sendMessageInitialData } from '@/constants/nodes/message.data';
import { javaScriptInitialData } from '@/constants/nodes/javascript.data';
import { HumanNodeContentInitialData } from '@/constants/nodes/human.data';
import { ListContentInitialData } from '@/constants/nodes/list.data';
import { IListNodeContent } from '@/types/workflows/nodes/list.content';
import { WebhookInitialData } from '@/constants/nodes/webhook.data';
import { DynamicWhatsappInitiData } from '@/constants/nodes/dynamic-data/inbound-whatsapp';
import { CustomNodeData } from "@/types/workflows/FlowState";
import { ZohoCRMWhatsappInitialData } from "@/constants/nodes/zoho-crm/inbound-whatsapp.data";
import { AnswerAIWhatsappInitialData } from "@/constants/nodes/answer-ai/inbound-whatsapp.data";
import { SetAIWhatsappInitialData } from "@/constants/nodes/set-ai/inbound-whatsapp.data";
import { IWebhookNodeContent } from "@/types/workflows/nodes/webhook.content";
import { SuccessFailureNodesEnum } from "@/types/enums/SuccessFailureNodes";
import { axiosInstance } from "@/lib/axios";
import { httpNodeInitialData } from "@/constants/nodes/http.data";
import { OptionsWhatsappInitialData } from "@/constants/nodes/options/inbound-whatsapp.data";
import { IOptionsNodeContent } from "@/types/workflows/nodes/options/inbound/options-whatsapp";
import { WhatsappflowInboundInitData } from '@/constants/nodes/whatsapp-flow/inbound-whatsapp.data';
import { useVariablesStore } from '@/stores/settings/useVariables.store';
import { partialFlowInitialData } from '@/constants/nodes/partialFlow/partial-flow.data';
import { INewFlowNodeContent } from '@/types/workflows/nodes/newFlow/newFlow';

interface Error {
  node: string;
  nodeName: string;
  message: string;
}

const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL;

export class WorkflowManager {
  nodes: Node<CustomNodeData>[] = [];
  edges: Edge[] = [];
  errors: Error[] = [];
  workflow: any = null;
  selectedNode: Node | null = null;
  activeVariables: any[] = [];
  isFlowEnterd: boolean = false;
  currentFlowNode: Node | null = null;
  partialNodes: Node[] = [];
  async fetchWorkflow(workflowId: any) {
    try {
      const response = await axiosInstance.get(`/bot/workflow/${workflowId}`);
      if (response.status === 200) {

        const { nodes = [], connections = [] } = response.data;

        await useVariablesStore.getState().getActiveVariables();
        this.activeVariables = useVariablesStore.getState().activeVariables;

        this.nodes = nodes;
        this.edges = connections
        this.workflow = response.data;
        this.errors = [...response.data.errors];
        console.log("fetched workflow from manager ==>", this.errors)



      }
    } catch (error) {
      console.error("Error fetching workflow:", error);
    }
  }

  async saveWorkflow() {
    if (!this.workflow || !this.workflow.id) {
      console.error("No workflow to save or workflow ID missing");
      return;
    }
    try {

      console.log("updated workflow  from manager ==>")
      const updatedWorkflow = {
        ...this.workflow,
        nodes: this.nodes,
        connections: this.edges,
      };
      const response = await axiosInstance.patch(
        `${base_url}/bot/workflow/${this.workflow.id}`,
        updatedWorkflow
      );
      if (response.status === 200) {
        this.workflow = response.data;
      }
    } catch (error) {

      console.log(error);
    }
  }

  createNewNode(newNodeId: string, label: string, lastNode: Node, offsetX: number, targetHandle?: "success" | "failure") {

    // const outGoingConnections = this.edges.filter(edge => edge.source === lastNode.id);
    // // let xPosition = lastNode.position.x + (offsetX - 1) * 200;

    // let xPosition = lastNode.position.x;

    // if (lastNode.type === "Condition") {
    //   xPosition = lastNode.position.x + (offsetX - 1) * 200;
    // }

    // Base x position starts from the lastNode's x position
    let baseXPosition = lastNode.position.x;
    let xPosition = baseXPosition;

    if (Object.values(SuccessFailureNodesEnum).includes(lastNode.type as SuccessFailureNodesEnum)) {
      if (targetHandle === "success") {
        xPosition = lastNode.position.x + (offsetX - 1) * 200;
      }
      if (targetHandle === "failure") {
        xPosition = lastNode.position.x - (offsetX - 1) * 200;
      }
    }


    const spacing = 200; // Horizontal spacing between nodes
    const verticalSpacing = 200; // Vertical spacing between nodes


    // Adjust xPosition for symmetrical placement
    if (lastNode.type === "Condition") {
      // Use positive/negative offset for symmetry
      xPosition = baseXPosition + (offsetX % 2 === 0 ? -1 : 1) * Math.ceil(offsetX / 2) * spacing;
    }



    // Symmetry logic for specific node types
    if (lastNode.type === "options1" || lastNode.type === "button" || lastNode.type === "list") {
      let existingOptionsCount;

      if (lastNode.type === "options1")
        existingOptionsCount = (lastNode.data.nodeContent as IOptionsNodeContent).optionItems.length;
      if (lastNode.type === "button")
        existingOptionsCount = (lastNode.data.nodeContent as IReplyButtonNodeContent).interactive.action.buttons.length;
      if (lastNode.type === "list")
        existingOptionsCount = (lastNode.data.nodeContent as IListNodeContent).items.length;

      // Ensure existingOptionsCount is treated as a number
      const count = Number(existingOptionsCount);

      console.log(count)

      if (count === 1) {
        xPosition = lastNode.position.x - spacing / 2; // Slightly to the left
      } else {
        xPosition =
          lastNode.position.x +
          (count % 2 === 0 ? -1 : 1) * Math.ceil((count + 1) / 2) * spacing;
      }
    }


    // Adjust yPosition for vertical placement
    // const yPosition = lastNode.position.y + verticalSpacing;

    return {
      id: newNodeId,
      type: label || "default",
      data: {
        nodeName: label.includes("Option") ? label + " " + String(offsetX) : label,
        description: "",
        nodeContent: {},
      },
      position: {
        x: xPosition,
        y: lastNode.position.y + 200,
      },
    };
  }



  createEdge(sourceId: any, targetId: any, sourceHandle?: string | null) {
    const edge: Edge = {
      id: new ObjectId().toHexString(),
      source: sourceId,
      target: targetId,
      type: "custom",
    };


    console.log(sourceHandle)

    if (sourceHandle == 'success' || sourceHandle == 'failure') {
      const updatedEdge = {
        ...edge,
        "sourceHandle": sourceHandle,
      }

      return updatedEdge;
    }

    return edge;
  }

  addNode(label: any, lastNode: any, targetHandle?: "failure" | "success") {



    // console.log(this.isFlowEnterd);
    // if (this.currentFlowNode) {

    //   console.log("Flow is already entered, cannot add new node")
    //   const newNodeId = new ObjectId().toHexString();
    //   let newNode = this.createNewNode(newNodeId, label, lastNode, 0, targetHandle);
    //   const newEdge = this.createEdge(lastNode.id, newNode.id, targetHandle);

    //   this.partialNodes = [...this.partialNodes, newNode];

    //   // (this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes.push(newNode);


    //   // Override currentFlowNode with a new updated version
    //   this.currentFlowNode = {
    //     ...this.currentFlowNode,
    //     data: {
    //       ...this.currentFlowNode.data,
    //       nodeContent: {
    //         ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent),
    //         partialNodes: [
    //           ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes,
    //           newNode,
    //         ],
    //       },
    //     },
    //   };


    //   // Replace the old currentFlowNode in the nodes list with the new version
    //   if (this.nodes.length > 0)
    //     this.nodes = this.nodes.map((node) =>
    //       node.id === this.currentFlowNode?.id ? this.currentFlowNode : node
    //     );
    //   // this.nodes = [...this.nodes, this.currentFlowNode];
    //   this.edges = [...this.edges, newEdge];

    //   return this.currentFlowNode.id;

    // }




    const newNodeId = new ObjectId().toHexString();
    let newNode = this.createNewNode(newNodeId, label, lastNode, 0, targetHandle);
    const newEdge = this.createEdge(lastNode.id, newNode.id, targetHandle)

    if (targetHandle === "success") {
      // Update lastNode
      const updatedLastNode = {
        ...lastNode,
        data: {
          ...lastNode.data,
          nodeContent: {
            ...lastNode.data.nodeContent,
            successTargetId: newNodeId, // Set the successTargetId correctly
          },
        },
      };

      // Replace the lastNode in the nodes array
      this.nodes = this.nodes.map(node =>
        node.id === lastNode.id ? updatedLastNode : node
      );
    }

    if (targetHandle === "failure") {
      // Update lastNode
      const updatedLastNode = {
        ...lastNode,
        data: {
          ...lastNode.data,
          nodeContent: {
            ...lastNode.data.nodeContent,
            failureTargetId: newNodeId, // Set the failureTargetId correctly
          },
        },
      };

      // Replace the lastNode in the nodes array
      this.nodes = this.nodes.map(node =>
        node.id === lastNode.id ? updatedLastNode : node
      );
    }




    // Initialize node content based on type
    if (label === "Condition") {
      newNode.data.nodeContent = structuredClone(conditionIntitalData);
    } else if (label === "collect_input") {
      newNode.data.nodeContent = structuredClone(collectInputInitialData);
    } else if (label === "file") {
      newNode.data.nodeContent = structuredClone(collectFileInitialData);
    } else if (label === "jump") {
      newNode.data.nodeContent = structuredClone(jumpInitialData);
    } else if (label === "salesforce") {
      newNode.data.nodeContent = structuredClone(SalesForceInititalData)
    } else if (label === "email") {
      newNode.data.nodeContent = structuredClone(sendEmailInitialData);
    } else if (label === "button") {
      newNode.data.nodeContent = structuredClone(replyButtonInitialData);
    } else if (label === "message") {
      newNode.data.nodeContent = structuredClone(sendMessageInitialData);
    } else if (label === "human") {
      newNode.data.nodeContent = structuredClone(HumanNodeContentInitialData);
    } else if (label === "http_request") {
      newNode.data.nodeContent = structuredClone(httpNodeInitialData);
    } else if (label === "javascript") {
      newNode.data.nodeContent = structuredClone(javaScriptInitialData);
    } else if (label === "list") {
      newNode.data.nodeContent = structuredClone(ListContentInitialData);
    } else if (label === "webhook") {
      newNode.data.nodeContent = structuredClone(WebhookInitialData);
    } else if (label === "dynamic_data") {
      newNode.data.nodeContent = structuredClone(DynamicWhatsappInitiData);
    } else if (label === "zoho") {
      newNode.data.nodeContent = structuredClone(ZohoCRMWhatsappInitialData);
    } else if (label === "answer_AI") {
      newNode.data.nodeContent = structuredClone(AnswerAIWhatsappInitialData);
    } else if (label === "set_AI") {
      newNode.data.nodeContent = structuredClone(SetAIWhatsappInitialData);
    } else if (label === "options1") {
      newNode.data.nodeContent = structuredClone(OptionsWhatsappInitialData);
    } else if (label === "whatsapp_flow") {
      newNode.data.nodeContent = structuredClone(WhatsappflowInboundInitData);
    } else if (label === "flow") {
      newNode.data.nodeContent = structuredClone(partialFlowInitialData);
    }

    if (this.currentFlowNode) {
      this.partialNodes = [...this.partialNodes, newNode];

      this.currentFlowNode = {
        ...this.currentFlowNode,
        data: {
          ...this.currentFlowNode.data,
          nodeContent: {
            ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent),
            partialNodes: [
              ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes,
              newNode,
            ],
          },
        },
      };

      if (this.nodes.length > 0)
        this.nodes = this.nodes.map((node) =>
          node.id === this.currentFlowNode?.id ? this.currentFlowNode : node
        );
      this.edges = [...this.edges, newEdge];

    } else {
      this.nodes = [...this.nodes, newNode];
      this.edges = [...this.edges, newEdge];
    }


    if (label === "Condition") {

      const optionsId = this.addOptionNodes(newNode);
      (newNode.data.nodeContent as ConditionNodeContent)
        .conditions.map((cond, i) => cond.nextNodeId = optionsId[i])
    }
    if (label === "carousel") {
      this.addCarouselNode(newNode);
    }

    if (label === 'list') {
      const optionId = this.addOneOption(newNode);
      (newNode.data.nodeContent as IListNodeContent)
        .items.map((item) => item.nextNodeId = optionId);

      this.nodes.map((node) => {
        if (node.id === optionId) {
          node.position.x = newNode.position.x + 200;
        }
      })

    }

    if (label === "button") {
      const buttonId = this.addOneOption(newNode);
      (newNode.data.nodeContent as IReplyButtonNodeContent)
        .interactive.action.buttons.map((button) => button.nextNodeId = buttonId);
      this.nodes.map((node) => {
        if (node.id === buttonId) {
          node.position.x = newNode.position.x + 200;
        }
      })
    }

    if (label === "options1") {
      const branchId = this.addOneOption(newNode);
      (newNode.data.nodeContent as IOptionsNodeContent).optionItems.map((item) => item.nextNodeId = branchId);
      this.nodes.map((node) => {
        if (node.id === branchId) {
          node.position.x = newNode.position.x + 200;
        }
      })
    }
  }

  addOptionNodes(conditionNode: Node) {
    let optionNodeIds = [];

    for (let i = 0; i < 4; i++) {
      const optionNodeId = new ObjectId().toHexString();
      const optionNode = this.createNewNode(optionNodeId, "Option", conditionNode, i)
      const optionEdge = this.createEdge(conditionNode.id, optionNodeId)


      if (this.currentFlowNode) {
        this.partialNodes = [...this.partialNodes, optionNode];

        this.currentFlowNode = {
          ...this.currentFlowNode,
          data: {
            ...this.currentFlowNode.data,
            nodeContent: {
              ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent),
              partialNodes: [
                ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes,
                optionNode,
              ],
            },
          },
        };

        if (this.nodes.length > 0)
          this.nodes = this.nodes.map((node) =>
            node.id === this.currentFlowNode?.id ? this.currentFlowNode : node
          );
        this.edges = [...this.edges, optionEdge];

      } else {
        this.nodes = [...this.nodes, optionNode];
        this.edges = [...this.edges, optionEdge];
      }

      // this.nodes = [...this.nodes, optionNode];
      // this.edges = [...this.edges, optionEdge];

      if (i === 3) break;
      optionNodeIds.push(optionNodeId);

    }
    return optionNodeIds;
  }

  addOneOption(node: Node) {
    const optionNodeId = new ObjectId().toHexString();
    let optionNode: Node = {} as Node;

    if (node.type === "button") {
      optionNode = this.createNewNode(optionNodeId, "Option", node, (node.data.nodeContent as IReplyButtonNodeContent).interactive.action.buttons.length + 1)

    }


    if (node.type === "list") {
      optionNode = this.createNewNode(optionNodeId, "Option", node, (node.data.nodeContent as IListNodeContent).items.length + 1)

    }

    if (node.type === "Condition") {
      optionNode = this.createNewNode(optionNodeId, "Option", node, (node.data.nodeContent as ConditionNodeContent).conditions.length + 1)

    }

    if (node.type === "options1") {
      optionNode = this.createNewNode(optionNodeId, "Option", node, (node.data.nodeContent as IOptionsNodeContent).optionItems.length + 1)

    }

    const optionEdge = this.createEdge(node.id, optionNodeId)

    if (this.currentFlowNode) {
      this.partialNodes = [...this.partialNodes, optionNode];

      this.currentFlowNode = {
        ...this.currentFlowNode,
        data: {
          ...this.currentFlowNode.data,
          nodeContent: {
            ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent),
            partialNodes: [
              ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes,
              optionNode,
            ],
          },
        },
      };

      if (this.nodes.length > 0)
        this.nodes = this.nodes.map((node) =>
          node.id === this.currentFlowNode?.id ? this.currentFlowNode : node
        );
      this.edges = [...this.edges, optionEdge];

    } else {
      this.nodes = [...this.nodes, optionNode];
      this.edges = [...this.edges, optionEdge];
    }

    // this.nodes = [...this.nodes, optionNode];
    // this.edges = [...this.edges, optionEdge];

    return optionNodeId;
  }

  deleteOneOption(optionId: string) {
    this.nodes = this.nodes.filter(node => node.id !== optionId);
    this.edges = this.edges.filter(edge => edge.source !== optionId && edge.target !== optionId);
  }


  addCarouselNode(carouselNode: Node) {
    for (let i = 0; i < 2; i++) {
      const optionNodeId = new ObjectId().toHexString();
      const optionNode = this.createNewNode(optionNodeId, "Option", carouselNode, i)
      const optionEdge = this.createEdge(carouselNode.id, optionNodeId)

      this.nodes = [...this.nodes, optionNode];
      this.edges = [...this.edges, optionEdge];

      this.addNode("Option", optionNode)
    }
  }

  updateNodeContent(nodeContent: any, nodeId: string) {
    const node = this.nodes.find((node) => node.id === nodeId);

    if (!node) {
      console.warn(`Node with ID ${nodeId} does not exist. Skipping update.`);
      return; // Exit the function gracefully
    }
    // Update the node's content
    node.data.nodeContent = nodeContent;


  }


  // updateNodeContent(nodeContent: any, nodeId: string) {

  //   const node = this.nodes.find((node) => node.id === nodeId);

  //   console.log("chose node", node);

  //   if (!node) throw new Error("There's no Node Chosen");

  //   node.data.nodeContent = nodeContent;

  //   console.log("from manager", this.nodes);
  // }


  deleteNode(nodeId: string) {

    let deletedNode;

    if (this.currentFlowNode) {

      console.log("deleteNode")
      // (this.currentFlowNode?.data.nodeContent as INewFlowNodeContent).partialNodes = (this.currentFlowNode?.data.nodeContent as INewFlowNodeContent).partialNodes.filter(node => node.id !== nodeId);


      this.partialNodes = this.partialNodes.filter(node => node.id !== nodeId);

        this.currentFlowNode = {
          ...this.currentFlowNode,
          data: {
            ...this.currentFlowNode.data,
            nodeContent: {
              ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent),
              partialNodes: [
                ...(this.currentFlowNode.data.nodeContent as INewFlowNodeContent).partialNodes,
              ],
            },
          },
        };

        if (this.nodes.length > 0)
          this.nodes = this.nodes.map((node) =>
            node.id === this.currentFlowNode?.id ? this.currentFlowNode : node
          );

          return
        
      }


      deletedNode = this.nodes.find((node) => node.id === nodeId);

      if (deletedNode?.type === "button" || deletedNode?.type === "Condition" || deletedNode?.type === "options1" || deletedNode?.type === "list") {
        const connectedEdges = this.edges.filter((edge) => edge.source === deletedNode.id || edge.target === deletedNode.id);

        const filterdEdges = connectedEdges.filter((edge) => edge.source === nodeId);

        filterdEdges.forEach((edge) => {
          this.nodes = this.nodes.filter((node) => node.id !== edge.target)

          this.edges = this.edges.filter((e) => e.id !== edge.target);

        })
      }


      this.nodes = this.nodes.filter((node) => node.id !== nodeId);
      this.edges = this.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

    }

    updateNodePosition(NodeId: string, Position: XYPosition) {

      this.nodes = [...this.nodes.map((node) => {
        if (node.id === NodeId) {
          node.position = Position
        }
        return node
      })]
    }

    setOptionNodeName(name: string, nodeId: string) {
      const node = this.nodes.find((node) => node.id === nodeId);
      if (!node) {
        console.warn(`Node with ID ${nodeId} does not exist. Skipping update.`);
        return; // Exit the function gracefully
      }
      node.data.nodeName = name;
      this.nodes = [...this.nodes, node]
    }

  }
