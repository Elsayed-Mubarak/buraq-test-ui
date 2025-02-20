import React from "react";
import { FiPlus } from "react-icons/fi";
import { svgs } from "../../shared/SVG";

interface NodePopUpProps {
    showFailurePopup: boolean;
    showSuccessPopup: boolean;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    filteredItems: {
        label: string
    }[];
    handleAddNode: (nodeName: string) => void;
    showPopup: boolean;
    workflow: any;
}


const NodePopUp: React.FC<NodePopUpProps> = ({
    showFailurePopup,
    showSuccessPopup,
    searchTerm,
    setSearchTerm,
    filteredItems,
    handleAddNode,
    showPopup,
    workflow
}) => {

    return (

        <div
            onClick={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
            className={`absolute top-full ${showFailurePopup && "left-3/4"} ${showSuccessPopup && "left-1/4"}  ${showPopup && "left-1/2"}     left-1/2  translate-x-[-50%]  z-10 p-4 bg-white shadow-lg rounded-lg border mt-4 w-80`}>

            <>
                {/* Search Input */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border-[1px] border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-700 hover:ring-blue-700 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M4.75 11.25a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        />
                    </svg>
                </div>

                {/* List Items */}
                <ul
                    className="space-y-4 max-h-52 overflow-y-auto"
                    onWheel={(e) => {
                        e.stopPropagation();
                        const target = e.currentTarget;
                        target.scrollTop += e.deltaY;
                    }}
                    onTouchMove={(e) => {
                        e.stopPropagation();
                        const target = e.currentTarget;
                        const touch = e.touches[0];
                        target.scrollTop += touch.clientY;
                    }}
                    onScroll={(e) => e.stopPropagation()}
                >
                    {filteredItems.map((item, index) => (
                        <li key={index} className="flex items-center space-x-6 cursor-pointer " onClick={() => handleAddNode(item.label)}>
                            {/* put the svgs here ya man  */}
                            <div className='w-7 flex justify-center items-center text-center' >{item.label === "message" && workflow.type === "outbound" ? svgs['whatsapp'] : svgs[item.label]}</div>
                            {/* el label ya 3mna  */}
                            <span className={`${item.label === "javascript" && "flex justify-between items-center"} text-sm font-semibold text-[#092445] border-b-black border-b-[1px] w-full pb-2 hover:text-blue-700`}>
                                {item.label}
                                {
                                    item.label === "javascript" && (
                                        <div className="relative text-xs  text-gray-400">
                                            <svg
                                                width="21px"
                                                height="22px"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{ height: '22px', width: '22px' }}
                                            >
                                                <path
                                                    d="M15.8333 8.33333H16.6667C17.1269 8.33333 17.5 8.70641 17.5 9.16666V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333H3.33333C2.8731 18.3333 2.5 17.9602 2.5 17.5V9.16666C2.5 8.70641 2.8731 8.33333 3.33333 8.33333H4.16667V7.5C4.16667 4.27834 6.77834 1.66666 10 1.66666C13.2217 1.66666 15.8333 4.27834 15.8333 7.5V8.33333ZM14.1667 8.33333V7.5C14.1667 5.19881 12.3012 3.33333 10 3.33333C7.69882 3.33333 5.83333 5.19881 5.83333 7.5V8.33333H14.1667ZM9.16667 11.6667V15H10.8333V11.6667H9.16667Z"
                                                    fill="#f1b000"
                                                />
                                            </svg>
                                        </div>
                                    )
                                }
                            </span>

                        </li>
                    ))}
                </ul>
            </>

        </div>
    );
};

export default React.memo(NodePopUp);
