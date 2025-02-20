import React from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import { IoPlayOutline } from "react-icons/io5";
import { NodeToolbar, Position, useReactFlow } from '@xyflow/react';

interface NodeToolbarContentProps {
    id: string;
    isHovered: boolean
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    onMouseEnter: (...props: any) => void,
    onMouseLeave: (...props: any) => void,
    isToolbarHovered: boolean,
}

const NodeToolbarContent: React.FC<NodeToolbarContentProps> = ({ id, onDuplicate, onDelete, isHovered, isToolbarHovered, onMouseEnter, onMouseLeave }) => {

    return (

        <NodeToolbar position={Position.Right} isVisible={isHovered || isToolbarHovered} >
            {
                <div className="flex flex-col gap-1.5 border bg-white border-gray-300 p-1 mb-1.5 h-full">
                    <button className="w-6 h-6 flex items-center justify-center z-20">
                        <IoPlayOutline className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(id)
                        }}>
                        <IoCopyOutline className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                        }}
                    >
                        <HiOutlineTrash className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            }

        </NodeToolbar>

    );
};

export default React.memo(NodeToolbarContent);
