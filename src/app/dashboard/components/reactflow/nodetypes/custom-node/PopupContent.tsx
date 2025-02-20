import React, { useState } from 'react';
import { svgs } from "../../shared/SVG";

interface PopupContentProps {
    items: { label: string }[];
    onAddNode: (newNode: string) => void;
}

const PopupContent: React.FC<PopupContentProps> = ({ items, onAddNode }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="absolute top-full left-1/2 translate-x-[-50%] z-10 p-4 bg-white shadow-lg rounded-lg border mt-4 w-80">
            <input
                type="text"
                placeholder="Search"
                className="w-full border-gray-300 rounded-md pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-4 max-h-40 overflow-y-auto">
                {filteredItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-6 cursor-pointer" onClick={() => onAddNode(item.label)}>
                        <div>{svgs[item.label]}</div>
                        <span className="text-sm font-semibold">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopupContent;
