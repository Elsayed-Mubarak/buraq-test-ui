import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import {
  IHttpNodeContent,
  IHttpRequestStore,
} from "@/types/workflows/nodes/http.content";
import { Node } from "@xyflow/react";
import { ObjectId } from "bson";
import debounce from "lodash.debounce";

import { create } from "zustand";







const useHTTPStore = create<IHttpRequestStore>((set) => {
  return {
    changeName: (node: Node, name: string) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

      if ((node.data.nodeContent as IHttpNodeContent)) {
        const clonedNodeContent = structuredClone(node.data.nodeContent as IHttpNodeContent);

        clonedNodeContent.name = name;

        updateNodeContent({ ...clonedNodeContent }, node.id);
        saveWorkflow();
      }
    },

    onTypeChange: (type: "GET" | "POST" | "DELETE" | "PUT", node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        clonedNodeContent.type = type;
        updateNodeContent(clonedNodeContent, node.id);
        saveWorkflow();
      }
    },

    onURLChange: (url: string, node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );

        clonedNodeContent.url = url !== null ? url : "";
        updateNodeContent(clonedNodeContent, node.id);
      }
    },


    onHeaderKeyChange: (index: number, key: string | null, node: Node) => {
      const { updateNodeContent } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        clonedNodeContent.headers[index].key = key || ""; // Ensure no null values

        updateNodeContent(clonedNodeContent, node.id);
      }
    },

    onHeaderValueChange: (index: number, value: string | null, node: Node) => {
      const { updateNodeContent } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        clonedNodeContent.headers[index].value = value || ""; // Ensure no null values

        updateNodeContent(clonedNodeContent, node.id);
      }
    },




    onAddHeader: (node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        clonedNodeContent.headers.push({ key: "", value: "" });
        updateNodeContent(clonedNodeContent, node.id);
        saveWorkflow();
      }
    },

    onRemoveHeader: (index: number, node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        clonedNodeContent.headers.splice(index, 1);
        updateNodeContent(clonedNodeContent, node.id);
        // saveWorkflow();
      }
    },






    onRawChange: (value: string | null, node: Node) => {
      const { updateNodeContent } = useFlowStore.getState();

      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        // Ensure empty strings are handled properly
        clonedNodeContent.body.raw = value !== null ? value : "";
        updateNodeContent(clonedNodeContent, node.id);

        console.log("Updated raw value:", clonedNodeContent.body.raw); // Debug log
      }
    },


    onAddVariable: (node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        clonedNodeContent.variables.push({
          id: new ObjectId().toHexString(),
          objectPath: "",
          variable: "",
        });
        updateNodeContent(clonedNodeContent, node.id);
        saveWorkflow();
      }
    },

    onRemoveVariable: (index: number, node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        clonedNodeContent.variables.splice(index, 1);
        updateNodeContent(clonedNodeContent, node.id);
        saveWorkflow();
      }
    },

    onAddField: (type: "text" | "file", node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        if (clonedNodeContent.body.form) {
          if (type === "text") {
            clonedNodeContent.body.form.push({
              key: "",
              value: "",
              type: "text",
              id: new ObjectId().toHexString(),
            });
          }
          if (type === "file") {
            clonedNodeContent.body.form.push({
              key: "",
              value: "",
              type: "file",
              id: new ObjectId().toHexString(),
            });
          }
          updateNodeContent(clonedNodeContent, node.id);
          saveWorkflow();
        }
      }
    },

    onRemoveField: (index, node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );

        if (clonedNodeContent.body.form) {
          clonedNodeContent.body.form.splice(index, 1);
          updateNodeContent(clonedNodeContent, node.id);
          saveWorkflow();
        }
      }
    },

    setBodyFormat: (bodyFormat: "FORM" | "RAW", node: Node) => {
      const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent,
        );
        if (clonedNodeContent.body.form) {
          clonedNodeContent.body.bodyFormat = bodyFormat;
          updateNodeContent(clonedNodeContent, node.id);
          saveWorkflow();
        }
      }
    },


    onBodyFieldKeyChange: (index: number, key: string, node: Node) => {
      const { updateNodeContent } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        if (clonedNodeContent.body.form) {
          clonedNodeContent.body.form[index].key = key;
        }
        updateNodeContent(clonedNodeContent, node.id);
      }
    },

    onBodyFieldValueChange: (index: number, value: string, node: Node) => {
      const { updateNodeContent } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        if (clonedNodeContent.body.form) {
          clonedNodeContent.body.form[index].value = value;
        }
        updateNodeContent(clonedNodeContent, node.id);
      }
    },

    onVariableChange: (
      index: number,
      field: 'objectPath' | 'variable',
      value: string,
      node: Node
    ) => {
      const { updateNodeContent } = useFlowStore.getState();
      if (node.data.nodeContent) {
        const clonedNodeContent = structuredClone(
          node.data.nodeContent as IHttpNodeContent
        );

        // Update the specific variable's field (either objectPath or variable)
        clonedNodeContent.variables[index][field] = value;

        updateNodeContent(clonedNodeContent, node.id);
      }
    },




  };
});

export default useHTTPStore;
