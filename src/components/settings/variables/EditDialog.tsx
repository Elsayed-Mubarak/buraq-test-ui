"use client";

import { useEffect, useState } from "react"
import { IVariables, VariableFormat } from "@/types/settings/variables";
import { InitialVariables } from "@/constants";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/app/dashboard/components/ui/textarea";
import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function EditVariableDialog({ id }: { id: string }) {
    const [values, setValues] = useState<IVariables>(InitialVariables);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const { editVariable, getVariableById } = useVariablesStore();

    useEffect(() => {
        const fetchVariableData = async () => {
            const data = await getVariableById(id);
            console.log(data)
            setValues({
                variableName: data.variableName,
                format: data.format,
                _id: data._id,
                type: data.type,
                description: data.description
            })
        }


        fetchVariableData();
    }, [id, getVariableById])


    const handleSubmit = async () => {
        try {
            setLoading(true)
            await editVariable(id, values);
            setOpenForm(false);
            toast.success("Variable has been edited successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    const formatArray = Object.entries(VariableFormat).map(([key, value]) => ({
        id: key,
        value: value,
        format: key,
        name: value,
    }));

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="text-[14px] font-light text-blue-500 hover:underline capitalize"
                >
                    edit
                </button>
            </DialogTrigger>
            <DialogContent className="w-[360px] px-0">
                <DialogHeader className="border-b pb-4 px-4">
                    <DialogTitle className="text-xl font-bold text-gray-600">Create Variable</DialogTitle>
                </DialogHeader>
                <div className="p-4 pt-2 border-b">
                    <div className="my-4 flex flex-col gap-y-1">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            disabled
                            className="text-sm disabled:bg-gray-200"
                            name="variableName"
                            onChange={(e) =>
                                setValues((prev) => ({
                                    ...prev,
                                    variableName: e.target.value,
                                }))
                            }
                            value={values.variableName}
                        />
                    </div>
                    <div className="my-4">
                        <Label>Description</Label>
                        <Textarea
                            className="text-sm focus:border-indigo-500 rest-input"
                            name="description"
                            onChange={(e) =>
                                setValues((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            value={values.description}
                        />
                    </div>

                    <CustomSelect
                        data={formatArray}
                        onChange={(val) =>
                            setValues((prev) => ({
                                ...prev,
                                format: val as string,
                            }))
                        }
                        triggerName={values.format || "Select"}
                        className="my-4"
                        footerMsg="Data will be stored in this variable only if it complies with the validation type"
                    />
                </div>
                <DialogFooter className="flex justify-end px-4">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className="bg-blue-700 text-white px-6 py-2 text-sm font-semibold"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Editing..." : "Edit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}


export default EditVariableDialog