import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { IHttpNodeContent } from '../../../types/workflows/nodes/http.content';

interface HttpNodeProps {
    data: {
        content: IHttpNodeContent;
    };
    selected: boolean;
}

function HttpNode({ data, selected }: HttpNodeProps) {
    const { content } = data;

    return (
        <div className={`relative bg-white rounded-md shadow-md ${selected ? 'ring-1 ring-gray-300' : ''
            }`}>
            {/* Purple left border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l-md"></div>

            <div className="p-3">
                {/* Top handle */}
                <Handle
                    type="target"
                    position={Position.Top}
                    className="w-2 h-2 !bg-gray-400"
                />

                {/* Header with icon and name */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="text-purple-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
                            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="font-medium">{content.name || 'HTTP request'}</span>
                </div>

                {/* Success/Failure section */}
                <div className="flex items-center justify-between mt-2">
                    {/* Success button and handle */}
                    <div className="relative">
                        <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                            <span className="font-bold">+</span>
                            <span className="text-sm">Success</span>
                        </button>
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="success"
                            className="w-0 h-0"
                        />
                    </div>

                    {/* Failure button and handle */}
                    <div className="relative">
                        <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            <span className="font-bold">−</span>
                        </button>
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="failure"
                            className="w-0 h-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(HttpNode);
