import useFlowStore from "../../reactflowstate/store";
import useHumanStore from "@/stores/nodes/useHuman.store";
import { Label } from "../../../ui/label";
import { Rule } from "@/types/workflows/nodes/human.content";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Input } from "../../../ui/input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select";
import { useEffect, useState } from "react";
import useTeammatesStore from "@/stores/settings/useTeamates.store";
import UserIcon from "@/constants/icons/userIcon";
import Image from "next/image";

export function RuleCard({ index, rule }: { index: number, rule: Rule }) {
    const { visibleRuleId, setVisibleRuleId } = useHumanStore();

    return (
        <div
            key={rule.id || index}
            className={`${visibleRuleId !== null ? "invisible" : "visible"} relative`}
        >
            <div
                className="mb-2 flex cursor-pointer items-center justify-between rounded-md text-sm bg-gray-100 p-3 text-nodeSettings"
                onClick={() => setVisibleRuleId(rule.id)}
            >
                Rule {index + 1}
                <LiaAngleRightSolid />
            </div>
        </div>
    )
}

export function RuleContent({ rule }: { rule: Rule }) {
    const [type, setType] = useState<"teammates" | "team">('teammates');

    const {
        setVisibleRuleId,
        onChangeData
    } = useHumanStore();

    const {
        closePopup,
        selectedNode
    } = useFlowStore();

    const {
        teammates,
        getTeammates
    } = useTeammatesStore();

    useEffect(() => {
        getTeammates();
    }, [getTeammates])

    if (!selectedNode) return null;

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 py-4">
            <div className="mb-6 flex justify-between">
                <button
                    className="flex items-center justify-center gap-4"
                    onClick={() => setVisibleRuleId(null)}
                >
                    <FaArrowLeftLong />
                    <span className="font-semibold">Talk to human</span>
                </button>

                <button onClick={closePopup}>
                    <RiCloseLargeLine className="w-4 h-4" />
                </button>
            </div>
            <div className="mb-4">
                <Label htmlFor="rule-name" className="text-nodeSettings font-light text-sm">Rule Name</Label>
                <Input
                    value={rule.name}
                    onChange={(e) => onChangeData(selectedNode, rule.id, {
                        name: e.target.value
                    })}
                    id="rule-name"
                    className="rounded-md ring-0 ring-transparent outline-none !py-0 h-[33px] hover:border-indigo-500"
                />
            </div>

            <div className="mb-4">
                <Label className="text-nodeSettings font-light text-sm">Assign to</Label>
                <Select
                    value={rule.assignTo.id}
                    onValueChange={(val) => onChangeData(selectedNode, rule.id, {
                        assignTo: {
                            ...rule.assignTo,
                            id: val || "",
                            name : teammates.find((item) => item._id === rule.assignTo.id)?.teammate?.name

                        }
                    })}
                >
                    <SelectTrigger className="ring-0 ring-transparent outline-none hover:border-indigo-500">
                        <div className="flex items-center gap-4">
                            {teammates.find((item) => item._id === rule.assignTo.id)?.teammate?.profilePicture
                                ? <Image
                                    src={teammates.find((item) => item._id === rule.assignTo.id)?.teammate?.profilePicture as string}
                                    alt=""
                                    width={24}
                                    height={24}
                                />
                                : <UserIcon />
                            }
                            <p>
                                {teammates.find((item) => item._id === rule.assignTo.id)?.teammate?.userName || "None"}
                            </p>
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <div className="flex justify-between">
                            <button className={`text-center w-full text-sm hover:bg-indigo-100 p-2 rounded-b-none ${type === "teammates" && 'text-indigo-500 border-b-2 border-indigo-500'}`} onClick={() => setType("teammates")}>Teammates</button>
                            <button className={`text-center w-full text-sm hover:bg-indigo-100 p-2 rounded-b-none ${type === "team" && 'text-indigo-500 border-b-2 border-indigo-500'}`} onClick={() => setType("team")}>Team</button>
                        </div>
                        {type === "team" ? (
                            <SelectItem disabled value="no">No Teams Found</SelectItem>
                        ) : (
                            teammates.map((item, index) => (
                                <SelectItem
                                    key={item._id || index}
                                    value={item._id}
                                >
                                    <div className="flex items-center gap-4">
                                        {item?.teammate?.profilePicture
                                            ? (
                                                <Image
                                                    src={item?.teammate?.profilePicture as string}
                                                    alt="img"
                                                    width={24}
                                                    height={24}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <UserIcon />
                                            )
                                        }
                                        <p>{item?.teammate?.userName}</p>
                                    </div>
                                </SelectItem>
                            ))
                        )}

                    </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                    Conversation will be assigned to the team/teammate in a round-robin manner.
                </p>
            </div>

            <div>
                <Label htmlFor="wait-time" className="text-nodeSettings font-light text-sm">Wait time (in seconds)</Label>
                <Input
                    value={rule.waittingTime}
                    onChange={(e) => onChangeData(selectedNode, rule.id, {
                        waittingTime: Number(e.target.value)
                    })}
                    type="number"
                    id="wait-time"
                    className="rounded-md ring-0 ring-transparent outline-none !py-0 h-[33px] focus:outline-none border-gray-300 hover:border-indigo-500"
                />
            </div>

        </div>
    )
}


