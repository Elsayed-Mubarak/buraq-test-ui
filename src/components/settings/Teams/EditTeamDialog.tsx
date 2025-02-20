"use client";
import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoMdClose } from "react-icons/io"
import useTeamStore from "@/stores/settings/useTeams.store"
import useTeammatesStore from "@/stores/settings/useTeamates.store"
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function EditTeamDialog({ id }: { id: string }) {
    const [teammates, setTeammates] = useState<any[]>([])
    const [inputValue, setInputValue] = useState("")
    const [filteredTeammates, setFilteredTeammates] = useState<any[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { getTeammates, teammates: allTeammates } = useTeammatesStore();
    const { editTeam, getDataById } = useTeamStore();

    useEffect(() => {
        getTeammates();
    }, [getTeammates]);


    useEffect(() => {
        const fetchById = async () => {
            try {
                const res = await getDataById(id);
                console.log(res);


                if (res) {
                    setData({
                        name: res.name || '',
                        image: res.image || null,
                        members: res.members || [],
                    });
                    setTeammates(res.members || []);
                }
            } catch (error) {
                console.error('Error fetching team data:', error);

            }
        }

        fetchById();
    }, [id, getDataById]);


    const [data, setData] = useState<{ name: string; image: File | null, members: any[] }>({
        name: "",
        image: null,
        members: [],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setInputValue(value);

        setFilteredTeammates(
            allTeammates.filter((item) =>
                item?.teammate?.firstName?.toLowerCase().includes(value.toLowerCase()) ||
                item?.teammate?.lastName?.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleSelectTeammate = (teammate: any) => {
        if (!teammates.some(t => t.teammate._id === teammate.teammate._id)) {
            setTeammates([...teammates, teammate]);
        }
        setInputValue(""); // Clear input field after selection
        setIsDropdownOpen(false); // Close dropdown
    };

    const handleRemoveTeammate = (teammate: any) => {
        // Remove teammate from the list
        setTeammates(teammates.filter((t) => t?.teammate?._id !== teammate?.teammate?._id));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setOpen(true);
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("image", data.image as File);

            teammates.forEach((member, index) => {
                formData.append(`members[${index}][teammate]`, member?.teammate?._id);
            });
            await editTeam(id, formData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to Edit");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <button
                    type="button"
                    className="text-[14px] font-light text-blue-500 hover:underline capitalize"
                >
                    edit
                </button>
            </DialogTrigger>
            <DialogOverlay className="bg-white bg-opacity-5" />
            <DialogContent className="rounded-xl w-[360px] p-0 gap-0">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <div className="py-5 px-6 border-b border-primary-50">Edit Team</div>
                    </DialogHeader>
                    <div className="py-5 px-6 border-b border-primary-50">
                        <div className="flex justify-center">
                            <Label htmlFor="profile-pic" className="block h-fit">
                                <div className="w-[200px] h-[200px] bg-gray-100 rounded-full flex items-center justify-center">
                                    <input
                                        id="profile-pic"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="appearance-none hidden"
                                        onChange={handleFileChange}
                                    />
                                    {data.image ? (
                                        <Image
                                            src={preview as string || data.image as any}
                                            width={200}
                                            height={200}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Upload Image
                                        </p>
                                    )}
                                </div>
                            </Label>
                        </div>
                        <div className="group pb-5 relative">
                            <label className="group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1" htmlFor="name">
                                Team Name
                            </label>
                            <input
                                className="p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#E4E4E4]"
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </div>
                        <div className="pb-5 relative">
                            <label className="text-sm text-secondary-50 block w-full mb-1" htmlFor="email">
                                Teammates
                            </label>
                            <div className="relative">
                                {/* Display selected teammates */}
                                <div className="flex flex-col gap-2 p-2 border border-[#E4E4E4] rounded-lg">
                                    {teammates.map((teammate) => (
                                        <span
                                            key={teammate?.teammate?._id}
                                            className="bg-gray-200 text-nodeSettings rounded-full px-2 py-1 flex items-center w-fit text-sm"
                                        >
                                            <span>{teammate?.teammate?.firstName} {teammate?.teammate?.lastName}</span>
                                            <IoMdClose
                                                className="w-4 h-4 cursor-pointer ml-2"
                                                onClick={() => handleRemoveTeammate(teammate)}
                                            />
                                        </span>
                                    ))}
                                    <textarea
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onClick={() => setIsDropdownOpen(true)}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                        className="flex-1 focus:outline-none h-[200px] resize-none overflow-y-auto"
                                        name="members"
                                    />
                                </div>
                                {isDropdownOpen && filteredTeammates.length > 0 && (
                                    <div className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto border border-[#E4E4E4] bg-white rounded-lg shadow-lg z-10">
                                        {filteredTeammates.map((teammate) => (
                                            <div
                                                key={teammate?.teammate?._id}
                                                onClick={() => handleSelectTeammate(teammate)}
                                                className="cursor-pointer p-2 hover:bg-gray-200"
                                            >
                                                {teammate?.teammate?.firstName} {teammate?.teammate?.lastName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="py-5 px-6 flex justify-end">
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
