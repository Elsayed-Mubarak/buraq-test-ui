import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import useJavascripStore from "@/stores/nodes/useJavaScriotStore";
import useFlowStore from "../../reactflowstate/store";
import { IJavaScriptNodeContent } from "@/types/workflows/nodes/javaSript.content";

import * as monaco from "monaco-editor"; // Import Monaco types



const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function JavaScriptContent() {

  const { onChangeData, changeName } = useJavascripStore();

  const { selectedNode } = useFlowStore();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  if (!selectedNode) return null;

  const nodeContent = selectedNode.data.nodeContent as IJavaScriptNodeContent;



  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: any) => {

    editorRef.current = editor;

    const observer = new MutationObserver(() => {
      const suggestionContainer = document.querySelector(".suggest-widget") as HTMLElement;
      const editorContainer = editor.getDomNode() as HTMLElement;

      monaco.editor.defineTheme("customGrayTheme", {
        base: "vs",
        inherit: false,
        rules: [
          { token: "comment", foreground: "008000", fontStyle: "italic" },
          { token: "number", foreground: "098658" },
          { token: "string", foreground: "A31515" },
          { token: "variable", foreground: "0000FF" },
          { token: "function", foreground: "0000DD", fontStyle: "bold" },
          { token: "type", foreground: "aa0d91" },
          { token: "property", foreground: "006ab1" },
          { token: "keyword", foreground: "aa0d91" },
        ],
        colors: {
          "editorGutter.background": "#f3f3f3",
          "editor.border": "#A12323FF"
        },
      });

      // Apply the custom theme
      monaco.editor.setTheme("customGrayTheme");

      if (suggestionContainer && editorContainer) {
        suggestionContainer.style.width = `${editorContainer.offsetWidth}px`;
        suggestionContainer.style.maxWidth = "100%";
        suggestionContainer.style.left = `${editorContainer.offsetLeft}px`;
      }
    });

    const editorContainer = editor.getDomNode();
    if (editorContainer) {
      observer.observe(editorContainer, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    }
  };


  const beautifyCode = () => {
    if (!editorRef.current) {
      console.error("Editor instance is not available.");
      return;
    }
    const formatAction = editorRef.current.getAction("editor.action.formatDocument");
    if (formatAction) {
      formatAction.run(); // Run the formatting action if it exists
    } else {
      console.error("Formatting action not found.");
    }
  };

  return (
    <>
      <NodeSettingsHeader
        icon={svgs.javascript}
        text={nodeContent.name || selectedNode.data.nodeName as string}
        onChange={(e) => changeName(selectedNode, e.target.value)}
      />
      <div className="mt-4">
        <div className="flex justify-end items-center gap-3 p-2 ">
          <button onClick={beautifyCode}  ><svg width="20" height="20" viewBox="0 0 24 24" fill="#808080" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V9C4 9.55 3.55 10 3 10H2V14H3C3.55 14 4 14.45 4 15V17C4 18.65 5.35 20 7 20H10V18H7C6.45 18 6 17.55 6 17V15C6 13.7 5.16 12.58 4 12.17V11.83C5.16 11.42 6 10.3 6 9V7C6 6.45 6.45 6 7 6H10V4H7C5.35 4 4 5.35 4 7Z" fill="#808080"></path><path d="M21 10C20.45 10 20 9.55 20 9V7C20 5.35 18.65 4 17 4H14V6H17C17.55 6 18 6.45 18 7V9C18 10.3 18.84 11.42 20 11.83V12.17C18.84 12.58 18 13.69 18 15V17C18 17.55 17.55 18 17 18H14V20H17C18.65 20 20 18.65 20 17V15C20 14.45 20.45 14 21 14H22V10H21Z" fill="#808080"></path></svg></button>
          <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#808080" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path></svg></button>
        </div>

        <div className="border border-red-600 h-[70vh] rounded-lg overflow-hidden ">
          <MonacoEditor
            language="javascript"
            theme="customGrayTheme"
            defaultValue={nodeContent.code}
            onMount={handleEditorDidMount}
            onChange={(value) => onChangeData(selectedNode, value as string)}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              wrappingIndent: "indent",
              wrappingStrategy: "advanced",
              renderLineHighlight: "gutter",
              lineDecorationsWidth: 3,
              lineNumbersMinChars: 3,
              linkedEditing: true,
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: "on",
              acceptSuggestionOnCommitCharacter: true,
              snippetSuggestions: "inline",
              quickSuggestions: { other: true, comments: false, strings: false },
              quickSuggestionsDelay: 100,
              suggest: { snippetsPreventQuickSuggestions: false },
              suggestSelection: "recentlyUsed",
              suggestFontSize: 11,
              suggestLineHeight: 14,
              cursorStyle: "line-thin",
              cursorWidth: 1,
              fontSize: 14,
              extraEditorClassName: "bg-red-700",
              fontFamily: "Arial, sans-serif",
              fontLigatures: true,
              formatOnType: true,
              formatOnPaste: true,

            }}
          />
        </div>



      </div>

    </>
  );
}
