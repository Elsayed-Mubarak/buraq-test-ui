"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import useProfileStore from "@/stores/settings/useProfile.store";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Skeleton } from "@/app/dashboard/components/ui/skeleton";
import { IoCloseOutline } from "react-icons/io5";
import { RiLoader3Line } from "react-icons/ri";


function ProfileSettingsForm() {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);

    const [data, setData] = useState({
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
    });

    const [preview, setPreview] = useState<string | null>(null);

    const {
        data: profileData,
        getProfileData,
        editProfileSettings,
        editProfileSettingsImage,
        deleteProfileImage
    } = useProfileStore();

    useEffect(() => {
        getProfileData();
        setData({
            _id: profileData._id,
            email: profileData.email,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            profilePicture: profileData.profilePicture
        })
    }, [getProfileData, profileData._id, profileData.email, profileData.firstName, profileData.lastName, profileData.profilePicture])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                setPreview(URL.createObjectURL(file));
                setImgLoading(true);

                const formData = new FormData();
                formData.append("file", file);

                await editProfileSettingsImage(formData);
                await getProfileData();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setImgLoading(false);
        }
    };

    const deleteImage = async (e: any) => {
        try {
            e.stopPropagation();
            const res = await deleteProfileImage();
            if (res.status === 200) {
                console.log(res)
                await getProfileData();
            }
        } catch (error) {
            toast.error("Failed to delete The Image")
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            await editProfileSettings(data);
        } catch (error: any) {
            toast.error("Failed to update");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div
            className='grid grid-cols-[200px_290px] gap-7 pt-12'
        >
            <div className="relative h-fit hover:bg-opacity-45">
                <Label
                    htmlFor="profile-pic"
                    className="block h-fit cursor-pointer"
                >
                    <div className="w-[200px] h-[200px] bg-gray-100 rounded-full flex items-center justify-center">
                        <input
                            id="profile-pic"
                            type="file"
                            name="file"
                            accept="image/*"
                            className="appearance-none hidden"
                            onChange={handleFileChange}
                        />
                        {data.profilePicture ? (
                            <>
                                <Image
                                    src={preview || data.profilePicture as string}
                                    width={200}
                                    height={200}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 w-6 h-6 flex items-center justify-center rounded-full"
                                    onClick={(e) => deleteImage(e)}
                                >
                                    {imgLoading ? <RiLoader3Line className="animate-spin h-5 w-5 text-white" /> : <IoCloseOutline className="h-5 w-5 text-white" />}
                                </button>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">Upload a profile pic</p>
                        )}
                    </div >
                </Label >
            </div >

            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="email"
                    >
                        Email Address
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4] outline-none focus:outline-none'
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                email: e.target.value as string,
                            }))
                        }
                    />
                </div>
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="first-name"
                    >
                        First Name
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4] outline-none focus:outline-none'
                        type="text"
                        id="first-name"
                        value={data.firstName}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                firstName: e.target.value as string,
                            }))
                        }
                    />
                </div>
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="last-name"
                    >
                        Last Name
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4] outline-none focus:outline-none'
                        type="text"
                        id="last-name"
                        value={data.lastName}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                lastName: e.target.value as string,
                            }))
                        }
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-500 flex mt-5 rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center w-fit"
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    )
}

export default ProfileSettingsForm