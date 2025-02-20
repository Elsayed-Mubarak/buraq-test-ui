"use client";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import useAddSalesForceStore from "@/stores/nodes/useAddSalesForce.store";
import { ISalesforce } from "@/types/workflows/nodes/salesforce";
import { on } from "events";
import React, { useState } from "react";

interface AddSalesAccountForceProps {
    nodeContent: ISalesforce;
    open: boolean;
    onClose: () => void;
}

const AddSalesAccountForce: React.FC<AddSalesAccountForceProps> = ({ nodeContent, open, onClose }) => {
    const { onChangeData } = useAddSalesForceStore();
    const { selectedNode, saveWorkflow } = useFlowStore();

    // const isButtonDisabled = !nodeContent.accountName || !nodeContent.organizationId;
    const isButtonDisabled = false;
    if (!selectedNode) return null;

    if (!open) return null; // Don't render if modal is closed

    const handleAddAccount = () => { console.log(nodeContent.accountName, nodeContent.organizationId); saveWorkflow(); onClose(); }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
                {/* Modal Content */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Add account</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={onClose} // Close modal
                        >
                            ✕
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Account Name
                            </label>
                            <input
                                value={nodeContent.accountName || ""}
                                onChange={(e) => onChangeData(selectedNode, { accountName: e.target.value })}
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Organization ID
                            </label>
                            <input
                                value={nodeContent.organizationId || ""}
                                onChange={(e) => onChangeData(selectedNode, { organizationId: e.target.value })}
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            className={`px-4 py-2 rounded-md ${isButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                            disabled={isButtonDisabled}
                            onClick={handleAddAccount}

                        >
                            Add account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSalesAccountForce;
