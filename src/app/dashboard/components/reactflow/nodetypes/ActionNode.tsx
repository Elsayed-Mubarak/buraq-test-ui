import { svgs } from '../shared/SVG'
import { colors } from '../shared/Colors'

import { Handle, Position } from '@xyflow/react';
import { SuccessFailureNodesEnum } from '@/types/enums/SuccessFailureNodes';
import Image from 'next/image';
export default function ActionNode({ data, type }: any) {

    // Function to get the color based on the key
    function getColor(key: any): string | undefined {
        // Return the color if it exists in the colors object, otherwise return undefined
        return colors[key] || undefined;
    }

    // Function to get the color based on the key
    function getIcon(key: any): string | undefined {
        // Return the color if it exists in the colors object, otherwise return undefined
        return svgs[key] || undefined;
    }

    // if(!data?.nodeContent?.name) return null ;

    return (
        <div className="relative flex w-full  ">

            {/* Adjusted background strip */}
            <div className={`h-100 w-[4px] rounded-l-md bg-${getColor(type)}`}></div>

            {
                type == "trigger" && (
                    <div className=" nodrag absolute -top-9 -left-32 inline-block text-center font-light text-black">
                        <Image src="/start-here.svg" width={100} height={100} alt="Starting Here" />
                    </div>
                )
            }

            {/* Adjusted background strip */}
            <div className="bg-white w-full p-4 rounded-r-md">
                <div className="flex items-center">

                    <div className="text-2xl mr-2">{getIcon(type)}</div>

                    <p className="text-xs font-bold text-[#092445]">{data?.nodeContent?.name || data.label || data.nodeName}</p>
                </div>
                <p className={`text-xs font-bold text-[#808080] mt-1  text-start `}>{data.description}</p>

            </div>




            {

                Object.values(SuccessFailureNodesEnum).includes(type as SuccessFailureNodesEnum) && (
                    <>
                        <Handle
                            type="source"
                            id='success'
                            position={Position.Bottom}
                            style={{
                                left: "30%",
                                padding: '5px',
                                border: '5px solid white',
                                boxShadow: '2 2 2 2 ',
                                background: "green",
                            }}
                        />

                        <Handle
                            type="source"
                            id='failure'
                            position={Position.Bottom}
                            style={{
                                left: "70%",
                                padding: '5px',
                                border: '5px solid white',
                                boxShadow: '2 2 2 2 ',
                                background: "red",
                            }}
                        />
                    </>
                )
            }


        </div>
    )
}