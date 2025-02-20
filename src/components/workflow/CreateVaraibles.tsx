"use client";

import { ReactNode, useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5";
import { Label } from "../ui/label";
import { Textarea } from "@/app/dashboard/components/ui/textarea";
import CustomSelect from "./nodeSettings/CustomSelect";
import { Button } from "../ui/button";
import { IVariables, VariablesTypes } from "@/types/settings/variables";
import { InitialVariables } from "@/constants";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import { ContactVariablesIcon, ConversationVariablesIcon } from "@/constants/icons/vatiables";
import toast from "react-hot-toast";

function CreateVaraibles() {
    const [values, setValues] = useState<IVariables>(InitialVariables);
    const [open, setOpen] = useState<boolean>(false);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const { addVariables, getActiveVariables } = useVariablesStore();

    const handleOpenForm = (type: VariablesTypes) => {
        setOpenForm(true);
        setValues(prev => ({
            ...prev,
            type: type
        }))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await addVariables(values);
            await getActiveVariables();
            setOpen(false);
            setOpenForm(false);
            toast.success("Variable created successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                className="p-2 w-full flex items-center justify-center gap-1 text-blue-700 text-sm h-full"
                onClick={() => setOpen(true)}
            >
                <FiPlus className="h-4 w-4" />
                <span>
                    Create Variables
                </span>
            </button>

            {open && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center"
                    onClick={() => setOpen(false)}
                >

                    {!openForm && (
                        <div className="p-4 bg-white rounded-xl z-50 w-[600px]">
                            <div className="flex items-center justify-between border-b pb-3">
                                <p className="text-xl font-bold text-gray-600">What kind of variable do you want to create?</p>
                                <button className="flex items-center justify-center" onClick={() => setOpen(false)}>
                                    <IoCloseOutline className="w-6 h-6" />
                                </button>
                            </div>
                            <div
                                className="flex py-4 justify-center gap-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <VariableCard
                                    title="Contact"
                                    description="Contact variables persist across conversations, retaining values for future interactions"
                                    icon={ContactVariablesIcon}
                                    onClick={() => handleOpenForm("Contact")}
                                />
                                <VariableCard
                                    title="Conversation"
                                    description="Conversation variables are temporary & retain values only within the current conversation."
                                    icon={ConversationVariablesIcon}
                                    onClick={() => handleOpenForm("Conversation")}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {openForm && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center"
                    onClick={() => {
                        setOpenForm(false)
                        setOpen(false)
                    }}
                >
                    <div className="rounded-lg bg-white p-4 w-[345px]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between border-b pb-3">
                            <p className="text-xl font-bold text-gray-600">Create Variable</p>
                            <button className="flex items-center justify-center" onClick={() => {
                                setOpenForm(false);
                                setOpen(false)
                            }}>
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="pb-4 border-b">
                            <div className="my-4 flex flex-col gap-y-1">
                                <Label>Name</Label>
                                <input
                                    type="text"
                                    className="text-sm ring-0 ring-transparent outline-none focus:ring-0 focus:ring-transparent border focus:border-indigo-500 p-2 rounded h-[34px]"
                                    name="variableName"
                                    onChange={(e) => setValues(prev => ({
                                        ...prev,
                                        variableName: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="my-4">
                                <Label>Description</Label>
                                <Textarea
                                    className="text-sm ring-0 ring-transparent outline-none focus:ring-0 focus:ring-transparent focus:border-indigo-500"
                                    name="description"
                                    onChange={(e) => setValues(prev => ({
                                        ...prev,
                                        description: e.target.value
                                    }))}
                                />
                            </div>

                            <CustomSelect
                                data={[{ id: 'text', name: 'text', format: 'Text' }]}
                                onChange={(val) => setValues(prev => ({
                                    ...prev,
                                    format: val as string
                                }))}
                                triggerName="Select"
                                className="my-4"
                                footerMsg="Data will be stored in this variable only if it complies with the validation type"
                            />
                        </div>
                        <div className="flex justify-end p-3">
                            <Button
                                type="button"
                                variant={"ghost"}
                                className="bg-blue-700 text-white px-5 py-2 text-sm font-semibold"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


function VariableCard({ onClick, icon, title, description }: { onClick: (...props: any[]) => void, title: string, icon: ReactNode, description: string }) {
    const handleClick = () => {
        onClick?.();
    }

    return (
        <div
            className="border rounded-xl hover:border-indigo-500 cursor-pointer"
            onClick={handleClick}
        >
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center p-2 rounded-full bg-gray-300 w-[40px] h-[40px]">
                        {icon}
                    </div>
                    <p className="text-nodeSettings font-semibold">{title}</p>
                </div>
                <p className="text-sm font-semibold text-gray py-4 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}


export default CreateVaraibles