"use client"
import { getOutgoers, Handle, NodeToolbar, Position, useReactFlow } from '@xyflow/react';
import useFlowStore from '../../reactflowstate/store';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ActionNode from '../ActionNode';
import OptionNode from '../OptionNode';
import { items, outboundItems } from "../../shared/Items";
import NodeToolbarContent from './NodeToolbarContent';
import AddButtons from './AddButtons';
import { SuccessFailureNodesEnum } from '@/types/enums/SuccessFailureNodes';
import NodePopup from './NodePopup';

interface CustomNodeProps {
    data: {
        icon: string;
        label: string;
        title: string;
        description: string;
        deletable?: boolean;
        onDelete?: () => void;
        isLastOne?: boolean;
        nodeName: string;
    };
    type?: string;
    id: string;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, type, id }) => {



    const { removeNode, duplicateNode, addNode, saveWorkflow, nodes, edges, connecting, redHilighted, highLightedNode, workflow, isFlowEnterd, partialNodes } = useFlowStore((state) => state);

    const reactFlowInstance = useReactFlow()

    const [removeSuccessPlus, setRemoveSuccessPlus] = useState(false)
    const [removeFailurePlus, setRemoveFailurePlus] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const [isToolbarHovered, setIsToolbarHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailurePopup, setShowFailurePopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const handleRemoveNode = useCallback((id: string) => {
        removeNode(id);
    }, [nodes, edges])

    // Determine if the node's handles have outgoers
    const outGoers = useMemo(() => {
        const currentNode = reactFlowInstance.getNode(id);
        if (currentNode) {
            if (Object.values(SuccessFailureNodesEnum).includes(currentNode.type as SuccessFailureNodesEnum)) {
                const successOutgoers = edges.some(edge => edge.source === id && edge.sourceHandle === 'success');
                const failureOutgoers = edges.some(edge => edge.source === id && edge.sourceHandle === 'failure');
                return {
                    success: !successOutgoers,
                    failure: !failureOutgoers,
                };
            }
            let outGoers;
            if (isFlowEnterd) {
                outGoers = getOutgoers(currentNode, partialNodes, edges);
            } else {
                outGoers = getOutgoers(currentNode, nodes, edges);
            }
            if (outGoers.length === 0) {
                return true;
            }

            return false
        }
    }, [edges, nodes, reactFlowInstance, id]);

    const renderNodeContent = () => {
        switch (type) {
            case "Option":
                return <OptionNode data={data} />;
            default:
                return <ActionNode data={data} type={type} />;
        }
    };


    const handleAddNode = (newNode: string) => {
        const lastNode = reactFlowInstance.getNode(id)

        if (showFailurePopup || showSuccessPopup) {
            addNode(newNode, lastNode, showFailurePopup ? "failure" : "success");
        }
        else {
            addNode(newNode, lastNode);
        }
        setShowPopup(false)
        setShowFailurePopup(false)
        setShowSuccessPopup(false)
        saveWorkflow()
    }

    const filteredItems = (workflow.type === 'inbound' ? items : outboundItems).filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMouseEnter = () => {
        setTimeout(() => {
            setIsHovered(true);
            setIsToolbarHovered(true);
        }, 100);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsHovered(false);
        }, 500);
    };
    const handleMouseEnterToolbar = () => {
        setTimeout(() => {
            setIsToolbarHovered(true);
        }, 100);
    };

    const handleMouseLeaveToolbar = () => {
        setIsToolbarHovered(false);
    };


    return (
        <>
            <div className={` relative flex rounded-md 
            ${connecting && isHovered
                    ? "layered-wave" // Hover effect during connecting
                    : isHovered
                        ? "hover:shadow-xl" // Normal hover effect
                        : ""
                }  shadow-md  ${type != "Option" ? "w-[230px]" : ""}
                ${redHilighted && (highLightedNode === id) && ('highlighted')}
                `

            }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            // onBlur={()=>setShowPopup(false)}

            >
                {renderNodeContent()}

                {/* {isInNodesWithNoTarget && !removePlus && type !== "jump" && ( */}
                {outGoers && type !== "jump" && (

                    <AddButtons
                        type={type}
                        outGoers={outGoers}
                        removeFailurePlus={removeFailurePlus}
                        removeSuccessPlus={removeSuccessPlus}
                        setShowSuccessPopup={setShowSuccessPopup}
                        setShowFailurePopup={setShowFailurePopup}
                        setShowPopup={setShowPopup}
                        showSuccessPopup={showSuccessPopup}
                        showFailurePopup={showFailurePopup}
                        showPopup={showPopup}
                    />
                )
                }

                {(showPopup || showSuccessPopup || showFailurePopup) && (

                    <NodePopup
                        workflow={workflow}
                        showFailurePopup={showFailurePopup}
                        showSuccessPopup={showFailurePopup}
                        handleAddNode={handleAddNode}
                        searchTerm={searchTerm}
                        showPopup={showPopup}
                        filteredItems={filteredItems}
                        setSearchTerm={setSearchTerm}

                    />
                )}

                {
                    type !== "Option" && (
                        <NodeToolbarContent
                            isHovered={isHovered}
                            onMouseEnter={handleMouseEnterToolbar}
                            onMouseLeave={handleMouseLeaveToolbar}
                            id={id}
                            isToolbarHovered={isToolbarHovered}
                            onDuplicate={duplicateNode}
                            onDelete={handleRemoveNode}
                        />
                    )
                }



            </div>


            {
                type !== "trigger" && (<Handle
                    type="target"
                    position={Position.Top}
                    style={{
                        background: '#afb2b3',
                        padding: '5px',
                        border: '5px solid white',
                        boxShadow: '2 2 2 2 ',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.padding = '10px';
                        target.style.transition = '0.3s';

                    }}
                    onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.padding = '5px';
                    }}
                />)
            }


            {
                type !== 'jump'
                && !Object
                    .values(SuccessFailureNodesEnum)
                    .includes(type as SuccessFailureNodesEnum)
                && (

                    <Handle
                        type="source"
                        position={Position.Bottom}
                        style={{
                            background: '#afb2b3',
                            padding: '5px',
                            border: '5px solid white',
                            boxShadow: '2 2 2 2 ',
                            cursor: 'default',
                        }}

                    />

                )
            }

        </>

    );
};

export default React.memo(CustomNode);







