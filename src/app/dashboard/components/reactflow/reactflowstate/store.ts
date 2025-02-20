import { ObjectId } from "bson";
import { create } from 'zustand';
import { Node, applyNodeChanges, applyEdgeChanges, addEdge, getIncomers, getOutgoers, getConnectedEdges, Position, Edge } from '@xyflow/react';
import axios from 'axios';
import { WorkflowManager } from './workflowmanager/WorkFlowManager';
import { FlowState } from "@/types/workflows/FlowState";
import { axiosInstance } from "@/lib/axios";
import { INewFlowNodeContent } from "@/types/workflows/nodes/newFlow/newFlow";


const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL


const useFlowStore = create<FlowState>((set, get) => {

  const manager = new WorkflowManager();


  return {

    nodes: [],
    optionNodeName: "option",
    edges: [],
    workflow: null,
    selectedNode: null,
    saving: false,
    redHilighted: false,
    highLightedNode: '',
    errors: [],
    activeVariables: [],

    currentFlowNode: null,
    isFlowEnterd: false,
    partialNodes: [],


    lastNode: () => get().nodes[get().nodes.length - 1],
    lastEdge: () => get().edges[get().edges.length - 1],
    // Set the entire workflow
    setWorkflow: (workflow) => set({ workflow }),


    // Update specific workflow fields


    fetchOneWorkFlow: async (workflowId) => {
      await manager.fetchWorkflow(workflowId);
      set({
        nodes: manager.nodes,
        edges: manager.edges,
        workflow: manager.workflow,
        errors: [...manager.errors],
        activeVariables: manager.activeVariables,
      });


    },

    updateWorkflow: (updatedWorkflow: any) =>
      set((state) => ({
        workflow: {
          ...state.workflow,
          ...updatedWorkflow,
        },
      })),


    // Save the workflow to the backend
    saveWorkflow: async () => {

      set({ saving: true }); // Set the saving flag to true
      const { workflow } = get(); // Get the current workflow from the state

      if (!workflow || !workflow.id) {
        console.error('No workflow to save or workflow ID missing');
        return;
      }



      try {
        const response = await axiosInstance.patch(`${base_url}/bot/workflow/${workflow.id}`, workflow);
        if (response)
          setTimeout(() => {
            set({ saving: false });
          }, 1000)
        if (response.status === 200) {
          const updatedWorkflow = response.data;
          set({ workflow: updatedWorkflow }); // Update the state with the saved workflow
          set({ errors: response.data.errors });
        }
        console.log(response);
      } catch (error) {
        console.error('Error saving workflow:', error);
      }
    },





    addNode: async (label: any, mylastNode: any, targetHandle?: "success" | "failure") => {


      const nodeId = manager.addNode(label, mylastNode, targetHandle)

      // Synchronize the state with manager
      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],
        partialNodes: [...state.partialNodes , ...manager.partialNodes],
        workflow: {
          ...state.workflow,
          nodes: [...manager.nodes],
          connections: [...manager.edges],
        },
      }))

      return nodeId;

    },

    addOption: (node: Node) => {
      const optionId = manager.addOneOption(node);

      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],
        workflow: {
          ...state.workflow,
          nodes: [...manager.nodes],
          connections: [...manager.edges],
        },
      }))

      return optionId;
    },

    deleteOneOption: (optionId) => {
      manager.deleteOneOption(optionId);

      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],
        // workflow: {
        //   ...state.workflow,
        //   nodes: [...manager.nodes],
        //   connections: [...manager.edges],
        // },
      }))
    },


    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    onNodesChange: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
    onEdgesChange: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

    setSelectedNode: (node: Node) => set((state) => {

      if (!(node.data as { nodeName: string }).nodeName.includes("Option")) {
        return { selectedNode: node };
      }
      return state;
    }),

    closePopup: () => set(() => ({
      selectedNode: null
    })),

    onNodesDelete: (deletedNodes: Node[]) => {
      const { nodes, edges } = get();

      const updatedEdges = deletedNodes.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({
            id: `${source}->${target}`,
            source,
            target,
          }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges);

      // Remove the deleted nodes from the state
      const updatedNodes = nodes.filter(
        (node) => !deletedNodes.some((deleted) => deleted.id === node.id)
      );

      set({
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    },


    removeNode: (nodeId) => {

      manager.deleteNode(nodeId);

      get().updateNodeContent(null, nodeId)



      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],

        workflow: {
          ...state.workflow,
          nodes: [...manager.nodes],
          connections: [...manager.edges],
        }
      }))

      get().saveWorkflow()
      // manager.saveWorkflow()


    },

    duplicateNode: (nodeId) => set((state) => {
      const nodeToDuplicate = state.nodes.find((node) => node.id === nodeId);
      if (!nodeToDuplicate) return state;

      const newNode: Node = {
        ...nodeToDuplicate,
        id: `${nodeToDuplicate.id}-copy-${Date.now()}`,
        position: {
          x: nodeToDuplicate.position.x + 300,
          y: nodeToDuplicate.position.y + 0,
        },
      };
      return {
        nodes: [...state.nodes, newNode],
      };
    }),

    updateNodeContent: (nodeContent: any, nodeId: string) => {
      manager.updateNodeContent(nodeContent, nodeId)

      set((state) => {

        const updatedNodes = [...manager.nodes];

        if (JSON.stringify(state.workflow?.nodes) === JSON.stringify(updatedNodes)) {

          return state; // Skip the update if nothing has changed
        }

        return {
          workflow: {
            ...state.workflow,
            nodes: [...manager.nodes],
            edges: [...manager.edges],
          },
        }
      });



      get().saveWorkflow();
    },




    onConnect: (connection: Edge) => {

      const newEdge = manager.createEdge(connection.source, connection.target, connection.sourceHandle);

      manager.edges.push(newEdge);
      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],
      }))

      // manager.saveWorkflow()

      get().saveWorkflow();


    },



    onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => {
      manager.updateNodePosition(node.id, node.position)

      set((state) => ({
        nodes: [...manager.nodes],
        edges: [...manager.edges],
      }))

      // manager.saveWorkflow()
      get().saveWorkflow();


    },

    connecting: false,
    onConnectStart: () => {
      set((state) => ({
        connecting: true
      }))
    },

    onConnectEnd: () => {
      set((state) => ({
        connecting: false
      }))
    },



    setRedHilghted: (nodeId: string) => {

      set({ highLightedNode: nodeId })
      set({ redHilighted: true });
      setTimeout(() => {
        set({ redHilighted: false });
      }, 4000);
    },



    setOptionNodeName(name: string, nodeId: string) {
      console.log(name)
      console.log(nodeId)
    },



    toggleFlowEnterd: (seletedNode: Node) => {

      set((state) => {
        return {
          currentFlowNode: get().selectedNode,
          partialNodes: [
            ...(state.selectedNode?.data.nodeContent as INewFlowNodeContent).partialNodes,
          ],
          isFlowEnterd: !state.isFlowEnterd,
        };
      });

      manager.currentFlowNode = get().currentFlowNode
      manager.isFlowEnterd = get().isFlowEnterd;


    }








  }





});

export default useFlowStore;
