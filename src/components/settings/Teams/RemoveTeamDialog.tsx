"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useTeamStore from "@/stores/settings/useTeams.store"
import { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveTeamDialog({ id, name }: { id: string, name: string }) {
    const [loading, setLoading] = useState(false);
    const {
        deleteTeam,
    } = useTeamStore();

    const handleDeletebyId = async (id: string) => {
        try {
            setLoading(true)
            await deleteTeam(id);
            toast.success("Team removed successfully");
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button
                    type="button"
                    className="text-[14px] font-light text-blue-500 hover:underline capitalize"
                >
                    Remove
                </button>
            </DialogTrigger>
            <DialogOverlay className="bg-white bg-opacity-5" />
            <DialogContent className="rounded-xl w-[600px] p-0 gap-0">
                <DialogHeader className="py-5 px-6 border-b border-primary-50">
                    <p className="text-lg font-semibold">
                        Remove Team
                    </p>
                </DialogHeader>
                <div className="p-6">
                    Are you sure you want to remove the team {name}?
                </div>
                <div className="py-5 px-6 flex justify-end border-t gap-3">
                    <DialogClose
                        type="button"
                        className="px-4 py-2 border font-medium rounded-md"
                    >
                        Cancel
                    </DialogClose>
                    <DialogClose>
                        <button
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md"
                            onClick={() => handleDeletebyId(id)} // Trigger delete
                            disabled={loading}
                        >
                            Remove
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
