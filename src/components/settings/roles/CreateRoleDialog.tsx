"use client";
import ReusableAccordion from "@/components/shared/ReusableAccordion";
import ReusableSwitch from "@/components/shared/ReusableSwitch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { initialPermissions } from "@/constants/settings/permissions";
import useRolesStore from "@/stores/settings/useRoles.store";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const initialFormData = {
    name: "",
    description: "",
    permissions: structuredClone(initialPermissions),
};

export default function CreateRoleDialog() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(initialFormData);

    const { addRole } = useRolesStore();

    const resetForm = () => {
        setData({
            ...initialFormData,
            permissions: structuredClone(initialPermissions)
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setOpen(true);
            setLoading(true);
            await addRole(data);
            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error("Failed To Create Role");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleTogglePermission = (index: number, key: string, value: boolean) => {
        setData((prev) => {
            const updatedPermissions = [...prev.permissions]; const currentAccess = updatedPermissions[index].access;
            if (typeof currentAccess === "object" && currentAccess !== null) {
                updatedPermissions[index].access = { ...currentAccess, [key]: value };
            }
            return { ...prev, permissions: updatedPermissions };
        });
    };

    return (
        <Dialog open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) resetForm();
                setOpen(isOpen);
            }}
        >
            <DialogTrigger>
                <Button className="bg-primary-500 flex rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center">
                    Create Role
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[800px] h-full overflow-y-auto">
                <DialogHeader>
                    <div className="pb-5 border-b border-primary-50 capitalize text-xl font-semibold">Create Role</div>
                </DialogHeader>
                <form className="px-2" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="group pb-5 relative mb-2">
                        <label className="group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1" htmlFor="name">
                            Name
                        </label>
                        <Input
                            className="p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#E4E4E4] rest-input"
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    </div>
                    {/* Description Input */}
                    <div className="group pb-5 relative mb-2">
                        <label className="group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1" htmlFor="description">
                            Description
                        </label>
                        <Input
                            className="p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#E4E4E4] rest-input"
                            type="text"
                            id="description"
                            value={data.description}
                            onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    {data.permissions.map((permission, index) => (
                        <div key={index} className="border rounded-lg my-2">
                            <ReusableAccordion label={permission.resource}>
                                {typeof permission.access === "object" && permission.access !== null ? (
                                    Object.keys(permission.access).map((key) => (
                                        <div key={key} className="flex items-center justify-between mb-2">
                                            <p className="text-sm capitalize">{key}</p>
                                            <ReusableSwitch
                                                isChecked={Boolean(permission.access[key as keyof typeof permission.access])}
                                                setIsChecked={(val) => handleTogglePermission(index, key, val)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm">Full access</p>
                                        <ReusableSwitch
                                            isChecked={permission.access}
                                            setIsChecked={(val) => handleTogglePermission(index, "fullAccess", val)}
                                        />
                                    </div>
                                )}
                            </ReusableAccordion>
                        </div>
                    ))}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"} className="px-4 py-2">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="bg-primary-500 flex rounded-lg hover:bg-primary-600 transition-all duration-200 text-white px-5 py-2 items-center">
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}