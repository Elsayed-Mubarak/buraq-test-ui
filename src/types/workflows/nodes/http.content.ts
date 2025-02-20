import { Node } from "@xyflow/react";
import { ObjectId } from "bson";

export interface HttpRequestHeader {
  key: string;
  value: string;
}

export type textBody = string;

export type FieldBody = {
  id: string;
  key: string;
  value: string;
  type: "text" | "file";
};

export type Variable = { id: string; objectPath: string; variable: string };

export interface IHttpNodeContent {
  id: string;
  name: string;
  type: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers: HttpRequestHeader[];
  body: {
    bodyFormat: "RAW" | "FORM";
    raw?: textBody;
    form?: FieldBody[];
  };
  variables: Variable[];
}

export interface IHttpRequestStore {
  changeName: (node: Node, name: string) => void;
  onTypeChange: (type: "GET" | "POST" | "DELETE" | "PUT", node: Node) => void;
  onURLChange: (url: string, node: Node) => void;
  onRemoveHeader: (index: number, node: Node) => void;
  onAddHeader: (node: Node) => void;
  onAddVariable: (node: Node) => void;
  onRemoveVariable: (index: number, node: Node) => void;
  onAddField: (type: "text" | "file", node: Node) => void;
  onRemoveField: (index: number, node: Node) => void;
  setBodyFormat: (bodyFormat: "FORM" | "RAW", node: Node) => void;
  onRawChange: (value: string, node: Node) => void;
  onHeaderValueChange: (index: number, value: string | null, node: Node) => void;
  onHeaderKeyChange: (index: number, key: string | null, node: Node) => void;
  onBodyFieldValueChange: (index: number, value: string, node: Node) => void;
  onBodyFieldKeyChange: (index: number, key: string, node: Node) => void;

  onVariableChange: (index: number, field: 'objectPath' | 'variable', value: string, node: Node) => void;

}
