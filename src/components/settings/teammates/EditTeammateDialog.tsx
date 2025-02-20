import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog";
import useTeammatesStore from "@/stores/settings/useTeamates.store";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import useRolesStore from "@/stores/settings/useRoles.store";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function EditTeammateDialog({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({
        teammateId: "",
        name: "",
        email: "",
        role: {},
        newRoleId: "",
    });
    const [open, setOpen] = useState(false);
    const { editTeammate } = useTeammatesStore();
    const { roles, getAllRoles } = useRolesStore();

    useEffect(() => {
        getAllRoles();
    }, [getAllRoles]);

    const getTeammateData = useCallback(async () => {
        try {
            const res = await axiosInstance.get(`/api/teammates/${id}`);
            if (!res.data) throw new Error("No Teammate found with this ID");

            setData({
                teammateId: res.data.teammate?._id || "Unknown",
                name: res.data.teammate?.userName || "Unknown",
                email: res.data.teammate?.email || "N/A",
                role: res.data?.role || {},
                newRoleId: res.data?.role?._id || "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch teammate data");
        }
    }, [id]);

    const handleRoleChange = (newRoleId: string) => {
        setData((prevData: any) => ({
            ...prevData,
            newRoleId,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setOpen(true)
            setLoading(true);
            await editTeammate(data.teammateId, data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to edit teammate");
        } finally {
            setLoading(false);
            setOpen(false)
        }
    };

    const handleOpen = () => {
        getTeammateData();
        setOpen(prev => !prev);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger>
                <button className="text-[14px] font-light text-blue-500 hover:underline capitalize">
                    Edit
                </button>
            </DialogTrigger>
            <DialogOverlay className="bg-white bg-opacity-5" />
            <DialogContent className="rounded-xl w-[360px] p-0 gap-0">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <div className="py-5 px-6 border-b border-primary-50">Edit Teammate</div>
                    </DialogHeader>
                    <div className="p-5">
                        <div className="group pb-5 relative">
                            <label htmlFor="name" className="text-sm text-secondary-50 block w-full mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                disabled
                                value={data.name}
                                className="p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#E4E4E4] disabled:bg-gray-200"
                            />
                        </div>
                        <div className="group pb-5 relative">
                            <label htmlFor="email" className="text-sm text-secondary-50 block w-full mb-1">
                                Email Address
                            </label>
                            <input
                                type="text"
                                id="email"
                                disabled
                                name="email"
                                value={data.email}
                                className="p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#E4E4E4] disabled:bg-gray-200"
                            />
                        </div>

                        <Select value={data.newRoleId} onValueChange={handleRoleChange}>
                            <SelectTrigger className="capitalize">
                                {roles.find((role) => role._id === data.newRoleId)?.name || "Select a Role"}
                            </SelectTrigger>
                            <SelectContent className="rest-input bg-white">
                                {roles.map((item: any) => (
                                    <SelectItem value={item._id} key={item._id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="py-5 px-6 flex justify-end gap-3 items-center">
                        <DialogClose className="border border-gray-300 text-sm text-gray-500 px-5 py-2 rounded-lg">
                            Cancel
                        </DialogClose>
                        <Button
                            disabled={loading}
                            className="bg-primary-500 flex rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center"
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
