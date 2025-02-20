import { ReactNode, useEffect } from "react";
import useFlowStore from "../reactflowstate/store";
import NodeContentTemplate from "./node-content-template";

function NodeSettingsBar() {
    const { closePopup } = useFlowStore((state) => state);

    // Close the sidebar when the component is unmounted
    useEffect(() => {
        return () => {
            closePopup();
        };
    }, [closePopup]);


    return (
        <NodeSettingsWrapper>
            <NodeSettingsContainer />
        </NodeSettingsWrapper>
    )
}

function NodeSettingsWrapper({ children }: { children: ReactNode }) {
    const { selectedNode, closePopup } = useFlowStore((state) => state);
    return (
        <div
            className={`absolute h-[calc(100%-50px)] top-[50px] left-0 right-0 bottom-0 flex justify-center items-center z-30 transition-all ease-linear duration-200
            ${selectedNode ? 'visible opacity-100' : 'invisible opacity-0'}`}
            onClick={closePopup}
        >
            {children}
        </div>
    )
}


function NodeSettingsContainer() {
    const { selectedNode } = useFlowStore((state) => state);


    return (
        <div
            className={`bg-white absolute top-0 h-full w-[375px] px-8 py-8 overflow-y-auto border-s border-gray-200
                ${selectedNode ? 'right-0' : '-right-[30vw]'} transition-all ease-linear duration-200`}
            onClick={(e) => e.stopPropagation()}
        >
            <NodeContentTemplate />
        </div>
    )
}


export default NodeSettingsBar