import React, { useEffect, useRef, useState } from 'react';
import { FieldBody, HttpRequestHeader, IHttpNodeContent, Variable } from '@/types/workflows/nodes/http.content';
import { ObjectId } from 'bson';
import { RiDeleteBin4Fill } from "react-icons/ri";
import useHTTPStore from '@/stores/nodes/useHttpRequest.store';
import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { useVariablesStore } from '@/stores/settings/useVariables.store';
import NodeSettingsHeader from '@/app/dashboard/components/reactflow/node-settings-bar/node-settings-header';
import { svgs } from '@/app/dashboard/components/reactflow/shared/SVG';
import CreateTestApiModal from '@/components/settings/modals/CreateTestApiModal';
import useSyncedInput from '@/hooks/useSyncedInput';
import SyncedInput from '@/components/shared/SyncedInput';
import TextEditorVariable from './variable-editor/TextEditorVariable';
import TextInputVariable from './variable-editor/TextInputVariable';
import VariablesDropdown from './VariablesDropdown';

interface HttpRequestProps {
    node: IHttpNodeContent;
    onChange: (node: IHttpNodeContent) => void;
}

function HttpRequest({ node, onChange }: HttpRequestProps) {


    // use state
    const [parsedRawData, setParsedRawData] = useState({});

    const [showCreateTestApiModal, setShowCreateTestApiModal] = useState(false);


    // use store
    const { selectedNode } = useFlowStore();
    const nodeContent = selectedNode?.data.nodeContent as IHttpNodeContent;

    const { onTypeChange,
        onURLChange,
        onHeaderKeyChange,
        onHeaderValueChange,
        onRemoveHeader,
        onAddHeader,
        onAddVariable,
        onRemoveVariable,
        onAddField,
        onRemoveField,
        setBodyFormat,
        changeName,
        onRawChange,
        onBodyFieldValueChange,
        onBodyFieldKeyChange,
        onVariableChange
    } = useHTTPStore();






    const handleFieldChange = (id: string, field: 'key' | 'value', value: string | File) => {
        if (!node.body.form) return;

        // Find and update the target field
        const updatedForm = node.body.form.map((f) =>
            f.id === id ? { ...f, [field]: value } : f
        );

        // Update the node
        onChange({
            ...node,
            body: {
                ...node.body,
                form: updatedForm,
            },
        });
    };



    const handleVariableChange = (id: string, field: 'objectPath' | 'variable', value: string) => {
        if (!node.body.form) return;

        // Find and update the target field
        const updatedForm = node.body.form.map((f) =>
            f.id === id ? { ...f, [field]: value } : f
        );

        const updatedvariables = node.variables.map((v) => v.id === id ? { ...v, [field]: value } : v);
        // Update the node
        onChange({
            ...node,
            variables: updatedvariables,
        });
    };

    const objectToFormData = (obj: Record<string, any>): FormData => {
        const formData = new FormData();

        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                // Convert objects and arrays to JSON strings
                formData.append(key, JSON.stringify(value));
            } else {
                // Convert everything else to a string
                formData.append(key, String(value));
            }
        });

        return formData;
    };





    const rawBody = node.body?.raw || '{}';



    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const [localRaw, setLocalRaw] = useState(node.body.raw);

    // const handleRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = e.target.value;
    //     const cursorPosition = e.target.selectionStart;
    //     setLocalRaw(value);
    //     if (selectedNode) {
    //         onRawChange(value, selectedNode);
    //     }
    //     requestAnimationFrame(() => {
    //         textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    //     });
    // };

    const callOnRawChange = () => {
        if (selectedNode)
            onRawChange(localRaw as string, selectedNode);
    }



    return (
        selectedNode && (

            <>
                <div className=" flex flex-col gap-4 bg-white w-full">

                    {
                        showCreateTestApiModal && (<CreateTestApiModal setShowCreateTestApiModal={setShowCreateTestApiModal}
                            url={node.url}
                            method={node.type}
                            body={node.body.bodyFormat == "RAW" ? ((node.body?.raw && node.body?.raw?.length>0) ? JSON.parse(node.body?.raw as string) : "") :
                                (node.body?.form && objectToFormData((node.body?.form.reduce<Record<string, string>>((acc, { key, value }) => {
                                    acc[key] = value;
                                    return acc;
                                }, {}))))
                            }

                        />)
                    }


                    <NodeSettingsHeader
                        icon={svgs.http_request}
                        text={nodeContent.name || selectedNode.data.nodeName as string}
                        onChange={(e) => changeName(selectedNode, e.target.value)}
                    />

                    <div className="text-sm text-gray-600">
                        HTTP request initiates a get/post call to other systems using APIs
                    </div>

                    {/* Type Dropdown */}
                    <div>
                        <label className="block text-sm mb-1">Type</label>
                        {
                            <select
                                value={node.type}
                                onChange={(e) => onTypeChange(e.target.value as "POST" | "GET" | "PUT" | "DELETE", selectedNode)}
                                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                            </select>
                        }
                    </div>

                    {/* URL Input */}
                    <div className='w-full '>
                        <label className="block text-sm mb-1">URL</label>

                        <div className='bg-white relative  mb-2 flex-1 w-full '>
                            <TextInputVariable
                                value={node.url}
                                onChange={(value) => onURLChange(value, selectedNode)}
                                className='text-nowrap p-1'
                                placeholder='URL/Variable'
                            />
                        </div>

                        {/* <SyncedInput
                            initialValue={node.url}
                            onExternalChange={(value) => {
                                if (selectedNode) {
                                    onURLChange(value, selectedNode);
                                }

                            }}
                            className="flex-1 w-full  p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 "
                            placeholder="key"

                        /> */}


                    </div>

                    {/* Request Headers */}
                    <div className='w-full '>
                        <label className="block text-sm mb-1">Request Header</label>
                        <div className=" w-full  ">
                            {node?.headers?.length > 0 && (node.headers.map((header, index) => (


                                <div key={index} className="flex justify-between items-center gap-2   w-full ">

                                    <SyncedInput
                                        initialValue={header.key}
                                        onExternalChange={(key) => {
                                            if (selectedNode) {
                                                onHeaderKeyChange(index, key, selectedNode);
                                            }

                                        }}
                                        className=" p-2 border mb-2 w-36 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="key"

                                    />

                                    <div className='bg-white relative w-36 mb-2 '>
                                        <TextInputVariable
                                            value={header.value as string}
                                            onChange={(value) => onHeaderValueChange(index, value, selectedNode)}
                                            className='text-nowrap p-1'
                                            placeholder='Value/Variable'
                                        />
                                    </div>

                                    {/* <SyncedInput
                                        initialValue={header.value}

                                        onExternalChange={(value) => {
                                            if (selectedNode) {
                                                onHeaderValueChange(index, value, selectedNode);
                                            }
                                        }}
                                        placeholder="Value"
                                        className=" p-2 border mb-2 w-36 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    /> */}


                                    {
                                        node?.headers?.length !== 1 && (
                                            <button
                                                onClick={() => onRemoveHeader(index, selectedNode)}
                                                className="text-gray-500-500 text-sm hover:text-red-700"
                                            >
                                                <RiDeleteBin4Fill />

                                            </button>
                                        )
                                    }

                                </div>
                            )))}
                        </div>
                        <button
                            onClick={() => onAddHeader(selectedNode)}
                            className="mt-2 text-sm text-blue-600 flex items-center gap-1 hover:text-blue-700"
                        >
                            <span>+</span> Add Key
                        </button>
                    </div>

                    {/* Request Body */}
                    {(node.type === 'POST' || node.type === 'PUT') && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm">Request Body</label>
                                <div className="flex gap-1 bg-gray-100 rounded-md ">
                                    <button
                                        onClick={() => setBodyFormat('RAW', selectedNode)}
                                        className={`px-3 py-1 text-xs  ${(selectedNode.data.nodeContent as IHttpNodeContent).body.bodyFormat === 'RAW'
                                            ? 'bg-blue-700 text-white rounded-s-md'
                                            : 'text-gray-600'
                                            }`}
                                    >
                                        RAW
                                    </button>
                                    <button
                                        onClick={() => setBodyFormat('FORM', selectedNode)}
                                        className={`px-3 py-1 text-xs  ${(selectedNode.data.nodeContent as IHttpNodeContent).body.bodyFormat === 'FORM'
                                            ? 'bg-blue-700 text-white rounded-e-md'
                                            : 'text-gray-600'
                                            }`}
                                    >
                                        FORM
                                    </button>

                                </div>
                            </div>


                            {(selectedNode.data.nodeContent as IHttpNodeContent).body.bodyFormat === 'RAW' ? (

                                <TextEditorVariable
                                    value={node.body.raw as string}
                                    onChange={(value) => onRawChange(value, selectedNode)}
                                />
                                // <textarea
                                //     value={node.body.raw as string}
                                //     onChange={(e) => handleRawChange(e)}
                                //     className="w-full h-32 p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                // />

                            ) : (

                                <div className=" w-full">
                                    {(Array.isArray(node.body.form) && node.body.form.length > 0) && (node.body.form.map((form, index) => (
                                        <div key={form.id} className="flex gap-2 justify-between items-center ">

                                            <SyncedInput
                                                initialValue={form.key}
                                                onExternalChange={(value) => {
                                                    if (selectedNode) {
                                                        onBodyFieldKeyChange(index, value, selectedNode);
                                                    }
                                                }}
                                                placeholder="Value"
                                                className=" p-2 mb-2 border w-36 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />

                                            {form.type === 'text' ? (

                                                <div className='bg-white relative w-36 mb-2 '>
                                                    <TextInputVariable
                                                        value={form.value as string}
                                                        onChange={(value) => onBodyFieldValueChange(index, value, selectedNode)}
                                                        className='text-nowrap p-1'
                                                        placeholder='Value/Variable'
                                                    />
                                                </div>
                                                // <SyncedInput
                                                //     initialValue={form.value as string}
                                                //     onExternalChange={(value) => {
                                                //         if (selectedNode) {
                                                //             onBodyFieldValueChange(index, value, selectedNode);
                                                //         }
                                                //     }}
                                                //     placeholder="Value/Variable"
                                                //     className=" p-2 border mb-2 w-36 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                // />

                                            ) : (

                                                <div className='bg-white relative w-36 mb-2 '>
                                                    <TextInputVariable
                                                        value={form.value as string}
                                                        onChange={(value) => onBodyFieldValueChange(index, value, selectedNode)}
                                                        className='text-nowrap p-1'
                                                        placeholder='URL/Variable'
                                                    />
                                                </div>
                                                // <SyncedInput
                                                //     initialValue={form.value as string}
                                                //     onExternalChange={(value) => {
                                                //         if (selectedNode) {
                                                //             onBodyFieldValueChange(index, value, selectedNode);
                                                //         }
                                                //     }}
                                                //     placeholder="URL/Variable"
                                                //     className=" p-2 border mb-2 w-36 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                // />
                                            )}
                                            {
                                                node.body.form && node.body.form.length !== 1 && (

                                                    <button
                                                        onClick={() => onRemoveField(index, selectedNode)}
                                                        className="text-gray-500-500 text-sm hover:text-red-700"
                                                    >
                                                        <RiDeleteBin4Fill />

                                                    </button>
                                                )

                                            }

                                        </div>
                                    )))}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onAddField("text", selectedNode)}
                                            className="text-sm text-blue-600 flex items-center gap-1 hover:text-blue-700"
                                        >
                                            + Text
                                        </button>
                                        <button
                                            onClick={() => onAddField("file", selectedNode)}
                                            className="text-sm text-blue-600 flex items-center gap-1 hover:text-blue-700"
                                        >
                                            + File
                                        </button>
                                    </div>
                                </div>
                            )}


                        </div>

                    )}

                    {/* Test API Button */}
                    <button
                        onClick={() => {
                            try {
                                const parsedData = typeof rawBody === 'string' ? JSON.parse(rawBody) : {};
                                setParsedRawData(parsedData);
                            }
                            catch (error) {
                                console.error(error);
                            }
                            setShowCreateTestApiModal(true)
                        }}
                        className="w-full py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Test the API
                    </button>

                    {/* Save Response Section */}
                    <div>
                        <div className="text-sm text-gray-600 mb-2">
                            Save the responses received from this service call to these variables
                        </div>
                        <div className="text-xs text-gray-500 mb-4">
                            This variable can be referenced to anywhere in the flow to branch the conversation based on the type of response received from the service call.
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-sm">Object Path</div>
                                <div className="text-sm">Variables</div>
                            </div>
                            {Array.isArray(node.variables) && node.variables.map((variable, index) => (
                                <div key={variable.id} className="flex gap-2">

                                    <SyncedInput
                                        initialValue={variable.objectPath}
                                        onExternalChange={(value) => {
                                            if (selectedNode) {
                                                onVariableChange(index, 'objectPath', value, selectedNode);
                                            }
                                        }}
                                        placeholder="Enter Object Path"
                                        className="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />


                                    <div className='relative bg-white'>

                                        <VariablesDropdown
                                            onChange={(e) => onVariableChange(index, 'variable', e.target.value, selectedNode)}
                                            triggerName={variable.variable}
                                        />
                                    </div>



                                    {/* <select

                                        onChange={(e) => onVariableChange(index, 'variable', e.target.value, selectedNode)}

                                        value={variable.variable}
                                        className="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">

                                        <option value={'0'}>variable 0</option>
                                        <option value={'1'}>variable 1</option>
                                        <option value={'2'}>variable 2</option>
                                        <option value={'3'}>variable 3</option>

                                    </select> */}

                                    {
                                        node?.variables?.length !== 1 && (
                                            <button
                                                onClick={() => onRemoveVariable(index, selectedNode)}
                                                className="text-gray-500-500 text-sm hover:text-red-700"
                                            >
                                                <RiDeleteBin4Fill />
                                            </button>
                                        )
                                    }
                                </div>
                            ))}
                            <button
                                onClick={() => onAddVariable(selectedNode)}
                                className="text-sm text-blue-600 flex items-center gap-1 hover:text-blue-700">
                                <span>+</span> Add variable
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )


    );
}

export default HttpRequest;








