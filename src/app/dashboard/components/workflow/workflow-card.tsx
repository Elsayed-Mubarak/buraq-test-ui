"use client"

import { Card } from '../ui/card';
import { LiaAngleDownSolid } from "react-icons/lia";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import useWorkflow from "./store/workflow";
import WorkFlowBotProviderIcon from "./WorkflowIconProvider";
import WorkflowCardMenu from "./WorkflowCardMenu";
import Link from "next/link";

function WorkflowCard({ workflow }: { workflow: any }) {
    const router = useRouter();

    return (
        <>
            {workflow.type === "inbound"
                ? <WorkFlowInboundCard workflow={workflow} />
                : <WorkFlowOutboundCard workflow={workflow} />
            }
        </>
    )
}


function WorkFlowInboundCard({ workflow }: { workflow: any }) {
    const router = useRouter();
    return (
        <Card
            className="px-6 py-6 border-2 rounded-2xl hover:ring-2 hover:ring-indigo-500 ring-transparent transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/botbuilder/workflows/${workflow.id}`)}
        >
            <div className="flex justify-between h-full">
                <div className="flex flex-col gap-1">
                    <h2 className="text-base font-semibold text-[#092445]">{workflow.title}</h2>
                    <p className="text-sm text-gray-500">Last deployed 6h ago</p>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <WorkFlowBotProviderIcon provider={workflow.channel} botType="inbound" /> {/* //TODO: Change this to the actual provider  in the workflow object */}
                    <WorkflowCardMenu type="inbound" workflow={workflow} />
                    <label
                        htmlFor={workflow.id}
                        className="switch cursor-pointer" >
                        <input
                            type="checkbox"
                            id={workflow.id}
                        />
                        <span className="slider round" />
                    </label>
                </div>
            </div>
        </Card>
    )
}


function WorkFlowOutboundCard({ workflow }: { workflow: any }) {
    const router = useRouter();
    const [viewReport, setViewReport] = useState(false);
    const [viewMore, setViewMore] = useState(false);
    return (
        <Card
            className="px-6 py-6 border-2 rounded-2xl hover:ring-2 hover:ring-indigo-500 ring-transparent transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/botbuilder/workflows/${workflow.id}`)}
        >
            <div className="flex justify-between h-full">
                <div className="flex flex-col">
                    <h2 className="text-base font-semibold text-[#092445]">{workflow.title}</h2>
                    {viewReport ? (
                        <div className={`flex flex-col gap-1 text-[13px] line-clamp-1 overflow-hidden transition-all ease-linear ${viewMore ? 'h-[46px]' : 'h-[20px]'}`}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex gap-0.5 items-center" onClick={e => e.stopPropagation()}>
                                <span>Totla: <Link href="#" className="text-blue-700 underline">416</Link></span>
                                <span className="border-s border-black inline-block px-1">Delivered: <Link href="#" className="text-blue-700 underline">416</Link></span>
                                <span className="border-s border-black inline-block px-1">Failed: <Link href="#" className="text-blue-700 underline">416</Link></span>
                                <span className="border-s border-black inline-block px-1">Replied: <Link href="#" className="text-blue-700 underline">416</Link></span>
                                <button className="ms-2 text-gray-500" onClick={() => setViewMore(!viewMore)}>
                                    <LiaAngleDownSolid className={`w-4 h-4 transition-all ease-linear duration-200 ${viewMore && 'rotate-180'}`} strokeWidth={'1px'} />
                                </button>
                            </div>
                            <div className="flex gap-0.5 items-center">
                                <span className="border-s border-black inline-block px-1">Sent: <Link href="#" className="text-blue-700 underline">416</Link></span>
                                <span className="border-s border-black inline-block px-1">Clicked: <Link href="#" className="text-blue-700 underline">416</Link></span>
                            </div>
                        </div>
                    ) : (
                        <span
                            className="text-sm text-blue-500 underline text-start"
                            onClick={(e) => {
                                setViewReport(true)
                                e.stopPropagation()
                            }}
                        >
                            View report
                        </span>
                    )}
                    {/* <p className="text-sm text-gray-500">Executed 6h ago</p> */}
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>
                            Last deployed 6h ago
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" style={{ transform: 'rotate(180deg)' }}><path d="M12 1a11 11 0 1 0 11 11A10.968 10.968 0 0 0 12 1zm-1.6 4.4h3.2c.3 0 .5.2.5.6v.1l-1 7.7a.536.536 0 0 1-.5.5h-1.2a.472.472 0 0 1-.5-.5L9.9 6a.5.5 0 0 1 .5-.6zM12 19.7a2.2 2.2 0 1 1 2.2-2.2 2.22 2.22 0 0 1-2.2 2.2z" transform="translate(-1 -1)" fill="#0F0F0F"></path></svg>
                    </div>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center relative">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.333 39.104" height="24" width="24"><g data-name="Group 6118" fill="#141414"><path data-name="Path 3123" d="M13.4 34.911c.917.188 1.766.358 2.613.535a15.28 15.28 0 0 0 17.173-9.467 1 1 0 0 1 1.169-.781c.821.057 1.648.014 2.609.014a18.566 18.566 0 0 1-9.678 11.854c-4.838 2.474-9.855 2.605-15.131.88A3.569 3.569 0 0 0 13.4 34.91"></path><path data-name="Path 3124" d="M7.281 5.442a3.478 3.478 0 0 0 1.694 2.9c-.626.609-1.258 1.144-1.8 1.76a15.413 15.413 0 0 0-2.02 17.455.826.826 0 0 1-.189 1.2c-.622.572-1.176 1.218-1.836 1.913A18.359 18.359 0 0 1 .119 18.257 18.579 18.579 0 0 1 7.281 5.442"></path><path data-name="Path 3125" d="M36.455 13.785a3.55 3.55 0 0 0-3.208.51 42.313 42.313 0 0 0-2.377-3.647 14.974 14.974 0 0 0-11.16-5.773.786.786 0 0 1-.864-.7c-.2-.865-.481-1.712-.761-2.687a18.909 18.909 0 0 1 18.37 12.297"></path><path data-name="Path 3126" d="M17.469 6.887c-.013.916-.577 1.385-1.393 1.19-2-.48-4-1.013-5.98-1.578a.981.981 0 0 1-.414-1.659q2.109-2.29 4.3-4.5c.621-.626 1.452-.344 1.738.569.485 1.55.926 3.116 1.382 4.676.145.5.279.993.367 1.305"></path><path data-name="Path 3127" d="M9.996 36.369c-.649-.173-1.49-.394-2.329-.621-1.18-.319-2.364-.627-3.537-.97a1.012 1.012 0 0 1-.5-1.761q2.118-2.186 4.306-4.3a.989.989 0 0 1 1.76.461q.836 2.92 1.574 5.867c.21.841-.262 1.369-1.277 1.327"></path><path data-name="Path 3128" d="M35.199 23.119c-.968 0-1.937.013-2.9 0-1.08-.017-1.511-.785-.976-1.726q1.364-2.4 2.741-4.786c.711-1.234 1.553-1.249 2.259-.036q1.37 2.353 2.725 4.715c.633 1.1.2 1.83-1.083 1.836h-2.762"></path><path data-name="Path 3129" d="M21.189 20.309v5.882c0 .235-.044.321-.3.315a63.644 63.644 0 0 0-2.51 0c-.241 0-.287-.073-.286-.3.008-2.537 0-5.073.012-7.61 0-.266-.081-.317-.325-.313-.856.014-1.711 0-2.567.01-.186 0-.237-.057-.234-.237.01-.567.009-1.133 0-1.7a.29.29 0 0 1 .191-.3c1.266-.665 2.575-1.24 3.855-1.877a.516.516 0 0 1 .234-.079c.586 0 1.172.007 1.758 0 .225 0 .169.149.17.266V20.307"></path></g></svg> */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.333 39.104" height="24" width="24"><g data-name="Group 6117" fill="#141414"><path data-name="Path 3116" d="M13.4 34.911c.917.188 1.766.358 2.613.535a15.28 15.28 0 0 0 17.173-9.467 1 1 0 0 1 1.169-.781c.821.057 1.648.014 2.609.014a18.566 18.566 0 0 1-9.678 11.854c-4.838 2.474-9.855 2.605-15.131.88A3.569 3.569 0 0 0 13.4 34.91"></path><path data-name="Path 3117" d="M7.281 5.442a3.478 3.478 0 0 0 1.694 2.9c-.626.609-1.258 1.144-1.8 1.76a15.413 15.413 0 0 0-2.02 17.455.826.826 0 0 1-.189 1.2c-.622.572-1.176 1.218-1.836 1.913A18.359 18.359 0 0 1 .119 18.257 18.579 18.579 0 0 1 7.281 5.442"></path><path data-name="Path 3118" d="M36.455 13.785a3.55 3.55 0 0 0-3.208.51 42.316 42.316 0 0 0-2.377-3.647 14.974 14.974 0 0 0-11.16-5.773.786.786 0 0 1-.864-.7c-.2-.865-.481-1.712-.761-2.687a18.909 18.909 0 0 1 18.37 12.297"></path><path data-name="Path 3119" d="M17.469 6.887c-.013.916-.577 1.385-1.393 1.19-2-.48-4-1.013-5.98-1.578a.981.981 0 0 1-.414-1.659q2.109-2.29 4.3-4.5c.621-.626 1.452-.344 1.738.569.485 1.55.926 3.116 1.382 4.676.145.5.279.993.367 1.305"></path><path data-name="Path 3120" d="M9.996 36.369c-.649-.173-1.49-.394-2.329-.621-1.18-.319-2.364-.627-3.538-.97a1.012 1.012 0 0 1-.5-1.761q2.118-2.186 4.306-4.3a.989.989 0 0 1 1.76.461q.836 2.92 1.574 5.867c.21.841-.262 1.369-1.277 1.327"></path><path data-name="Path 3121" d="M35.199 23.119c-.968 0-1.937.013-2.9 0-1.08-.017-1.511-.785-.976-1.726q1.364-2.4 2.741-4.786c.711-1.234 1.553-1.249 2.259-.036q1.37 2.353 2.725 4.715c.633 1.1.2 1.83-1.083 1.836h-2.762"></path></g></svg> */}

                        <WorkFlowBotProviderIcon provider={workflow.channel} botType="outbound" /> {/* //TODO: Change this to the actual provider  in the workflow object */}

                    </div>
                    <WorkflowCardMenu type="outbound" workflow={workflow} />
                    <label
                        htmlFor={workflow.id}
                        className="switch cursor-pointer" >
                        <input
                            type="checkbox"
                            id={workflow.id}
                        />
                        <span className="slider round" />
                    </label>
                </div>
            </div>
        </Card >
    )
}

export default WorkflowCard;