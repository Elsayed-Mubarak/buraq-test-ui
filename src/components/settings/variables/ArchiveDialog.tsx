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
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ArchiveDialog({ id, name }: { id: string, name: string }) {
    const [loading, setLoading] = useState(false);
    const {
        archiveVariable
    } = useVariablesStore();

    const handleArchiveById = async (id: string) => {
        try {
            setLoading(true)
            await archiveVariable(id);
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
                    Archive
                </button>
            </DialogTrigger>
            <DialogOverlay className="bg-white bg-opacity-5" />
            <DialogContent className="rounded-xl w-[600px] p-0 gap-0">
                <DialogHeader className="py-5 px-6 border-b border-primary-50">
                    <p className="text-lg font-semibold">
                        Archive Variable
                    </p>
                </DialogHeader>
                <div className="p-6 text-sm">
                    Are you sure you want to archive the variable "{name}"?
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
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md capitalize"
                            onClick={() => handleArchiveById(id)}
                            disabled={loading}
                        >
                            Archive
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
