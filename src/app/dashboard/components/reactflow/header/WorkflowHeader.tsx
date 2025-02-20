"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { useReactFlow } from "@xyflow/react";


interface WorkflowHeaderProps {
  saving: boolean;
  errors: any;
}

function WorkflowHeader({ saving, errors }: WorkflowHeaderProps) {

  const reactFlowInstance = useReactFlow();



  const router = useRouter();

  const {setRedHilghted} = useFlowStore()


  const [isBubbling, setIsBubbling] = useState(false);

  const [openErrorlist, setOpenErrorList] = useState<boolean>(false);




  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenError = (e: React.MouseEvent) => {

    e.stopPropagation();
    setOpenErrorList((prev) => !prev);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Close dropdown only if the next focused element is outside the dropdown
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setOpenErrorList(false);
    }
  };



  const handleSelectError = (e: React.MouseEvent, nodeId: string) => {
    const nodePositon = reactFlowInstance.getNode(nodeId)?.position;
    console.log(nodePositon)
    e.stopPropagation();
    setOpenErrorList(false);
    if (nodePositon) {
      reactFlowInstance.setCenter(nodePositon.x + 110 , nodePositon.y, { zoom: 1.5 });
    }
    setRedHilghted(nodeId)
    
  }



  const openChatBox = (): void => {
    const newWin = window.open(
      `http://localhost:3000/dashboard/botbuilder/bot-preview`,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );

    // if (newWin) {
    //   newWin.focus();
    //   setNewWindow(newWin);
    // } else {
    //   alert("Failed to open a new window. Please disable pop-up blockers.");
    // }

  };

  // const handleBotNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     setBotName(e.target.value);
  //     const res = await axiosInstance.patch(`/bot/workflow/${workflowId}`, {
  //       title: e.target.value,
  //     })
  //     if (!res.data) return;

  //   } catch (error) {
  //     console.error("Failed to update bot name:", error);
  //     // toast.error("Failed to update bot name");
  //   }
  // }

  // useEffect(() => {
  //   if (newWindow) {
  //     const cleanup = () => setNewWindow(null);
  //     newWindow.addEventListener("beforeunload", cleanup);
  //     return () => {
  //       newWindow.removeEventListener("beforeunload", cleanup);
  //       newWindow.close();
  //     };
  //   }
  // }, [newWindow]);

  return (
    <div className="w-[96%] fixed z-50  flex items-center justify-between px-2  py-2  border-gray-300 bg-white">
      {/* Back Button */}
      <div className="flex items-center space-x-2 ">
        <button className="text-black hover:text-blue-500 focus:outline-non e flex items-center gap-2" onClick={() => router.back()}>
          {/* Back Arrow Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17 10a1 1 0 01-1 1H7.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L7.414 9H16a1 1 0 011 1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-800">Back</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-xs font-semibold text-gray-800 text-center">
        <input
          type="text"
          className="border-0 text-center focus:border-b-2 focus:border-black focus:outline-none focus:ring-0 transition duration-300 ease-in-out p-2"
          placeholder="botName"
          // value={botName}
          // onChange={(e) => handleBotNameChange(e)}
          required={true}
        />

      </div>




      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4 ">



        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          {errors && errors.length > 0 && (
            <div
              ref={dropdownRef}
              onBlur={handleBlur}
              tabIndex={-1} // Make the container focusable
              className="relative"
            >
              {/* Error Button */}
              <button
                onClick={(e) => handleOpenError(e)}
                className={`px-4 py-2 text-sm font-light text-[#ff0000] bg-[#ffd6d6] rounded-lg transition-transform duration-300 ease-in-out ${isBubbling ? "scale-110 shadow-lg bg-[#ff9999]" : ""
                  }`}
                aria-expanded={openErrorlist}
              >
                {errors.length} errors
              </button>

              {/* Dropdown */}
              {openErrorlist && (
                <ul
                  className="absolute top-[100%] right-0 w-52 p-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto"
                  role="menu"
                >
                  {errors.map((error: any, index: number) => (
                    <li
                      key={index}
                      onClick={(e) => handleSelectError(e, error.node)}
                      className="rounded-lg cursor-pointer hover:bg-gray-100 p-2"
                      title={error.message}
                    >
                      <h4 className="text-md text-[#142d4d]">{error.nodeName}</h4>
                      <h6 className="text-xs font-normal text-[#808080] truncate">{error.message}</h6>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>



        {/* Saved Status */}
        <div className="flex items-center space-x-1">
          {
            saving ? (<>
              <span className="text-sm text-gray-500 ">Saving...</span>
            </>) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414 0L9 11.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>

                <span className="text-sm text-gray-600">Saved</span>
              </>
            )
          }

        </div>




        {/* Test Button */}
        <button onClick={openChatBox} className="px-4 py-2 text-xs font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50">
          Test this bot
        </button>

        {/* Deploy Button */}
        <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Deploy
        </button>
      </div>
    </div>
  );
}

export default React.memo(WorkflowHeader);
