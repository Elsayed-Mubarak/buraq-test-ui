"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useRolesStore from "@/stores/settings/useRoles.store";
import useTeammatesStore from "@/stores/settings/useTeamates.store";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateTeamDialog() {
    const [data, setData] = useState({
        to: "",
        role: "admin",
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const {
        inviteTeammate
    } = useTeammatesStore();
    const {
        getAllRoles,
        roles
    } = useRolesStore();

    useEffect(() => {
        getAllRoles();
    }, [getAllRoles])

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setOpen(true)
            setLoading(true)
            await inviteTeammate(data);
        } catch (error) {
            toast.error("Failed to Send")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="bg-primary-500 flex  rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center">Add Teammates</Button>
            </DialogTrigger>
            <DialogOverlay className="bg-white bg-opacity-5" />
            <DialogContent className="rounded-xl w-[360px] p-0 gap-0">
                <DialogHeader>
                    <div className="py-5 px-6 border-b border-primary-50">Add Teammate</div>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-5 px-6 border-b border-primary-50">
                        <div className='group pb-5 relative mb-2'>
                            <label className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1' htmlFor="email">Email Address</label>
                            <input
                                className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4]'
                                type="email"
                                id="email"
                                onChange={(e) => setData(prev => ({
                                    ...prev,
                                    to: e.target.value
                                }))}
                            />
                        </div>
                        <label className='text-sm text-secondary-50 block w-full mb-1' htmlFor="">Role</label>
                        <Select
                            onValueChange={(val) => setData(prev => ({
                                ...prev,
                                role: val
                            }))}
                        >
                            <SelectTrigger className="w-full">
                                {data?.role || "Select Role"}
                            </SelectTrigger>
                            <SelectContent className="bg-white p-0 ">
                                <SelectGroup>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role._id}
                                            className="py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]"
                                            value={role?.name}
                                        >
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="py-5 px-6 flex justify-end">
                        <Button variant={"outline"} className="bg-primary-500 flex  rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center">Cancel</Button>
                        <Button
                            className="bg-primary-500 flex  rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Add Teammate"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}