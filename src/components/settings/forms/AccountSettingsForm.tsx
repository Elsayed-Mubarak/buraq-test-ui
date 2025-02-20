"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import CopyText from "@/components/workflow/nodeSettings/CopyText";
import { useAccountSettingsStore } from "@/stores/settings/useAccountSettings.store";
import { Currency, IAccountSettings } from "@/types/account-settings";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { RiLoader3Line } from "react-icons/ri";

function AccountSettingsForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [preview, setPreview] = useState<string | null>(null);
    const [imgLoading, setImgLoading] = useState(false);

    const {
        editiData,
        formState,
        getData,
        deleteAccountImage,
        editAccountSettingsImage
    } = useAccountSettingsStore();

    const [data, setData] = useState<IAccountSettings>({
        _id: "",
        name: '',
        businessValue: 0,
        enable2FA: false,
        hourlyCost: 0,
        currency: Currency.USD,
        timezone: '',
        profilePicture: "",
        token: ""
    });


    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setPreview(URL.createObjectURL(file));
    //         setData((prev) => ({
    //             ...prev,
    //             profilePicture: file,
    //         }));
    //     }
    // };


    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);

            const response = await editiData(data);

            if (response.status === 200) {
                const _data = await getData();
                setData(_data);
                toast.success("Account Successfully updated");
            }
        } catch (error) {
            toast.error(formState.message as string);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                setPreview(URL.createObjectURL(file));
                setImgLoading(true);

                const formData = new FormData();
                formData.append("file", file);

                await editAccountSettingsImage(formData);
                await getData();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setImgLoading(false);
        }
    };

    const deleteImage = async (e: any) => {
        try {
            setImgLoading(true)
            e.stopPropagation();
            const res = await deleteAccountImage();
            if (res.status === 200) {
                console.log(res)
                await getData();
            }
        } catch (error) {
            toast.error("Failed to delete The Image")
        } finally {
            setImgLoading(false)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
        }
        fetchData();
    }, [getData])


    return (
        <div className="flex gap-4 w-full max-w-2xl">
            {/* <div>
                <Label htmlFor="profile-pic" className="block h-fit">
                    <div className="w-[200px] h-[200px] bg-gray-100 rounded-full flex items-center justify-center">
                        <input
                            id="profile-pic"
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            className="appearance-none hidden"
                            onChange={handleFileChange}
                        />
                        {data.profilePicture && (
                            <Image
                                src={preview || data.profilePicture}
                                width={200}
                                height={200}
                                alt="Profile Preview"
                                className="w-full h-full object-cover rounded-full"
                            />
                        )}
                    </div >
                </Label >
            </div > */}

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
                        {data.profilePicture || preview ? (
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
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-[320px] flex-1 px-2"
            >
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="email"
                    >
                        Account Name
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4]'
                        type="text"
                        name="name"
                        value={data.name}

                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                name: e.target.value as string,
                            }))
                        }
                        id="name"
                    />
                    {formState?.errors?.["name"]?.[0] && (
                        <p className="text-sm text-red-500">{formState?.errors?.["name"]?.[0]}</p>
                    )}
                </div>
                <div className='group pb-5 relative'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="timezone"
                    >
                        Time Zone
                    </label>
                    <Select

                        value={data.timezone}
                        onValueChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                timezone: val as string
                            }))
                        }
                        name="timezone"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-white h-[200px] p-0 overflow-auto">
                            <SelectItem className="py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="est">Eastern Standard Time (EST)</SelectItem>
                            <SelectItem className=" py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="cst">Central Standard Time (CST)</SelectItem>
                            <SelectItem className=" py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="mst">Mountain Standard Time (MST)</SelectItem>
                            <SelectItem className=" py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="pst">Pacific Standard Time (PST)</SelectItem>
                            <SelectItem className=" py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="akst">Alaska Standard Time (AKST)</SelectItem>
                            <SelectItem className=" py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="hst">Hawaii Standard Time (HST)</SelectItem>
                        </SelectContent>
                    </Select>
                    {formState?.errors?.["timezone"]?.[0] && (
                        <p className="text-sm text-red-500">{formState?.errors?.["timezone"]?.[0]}</p>
                    )}
                </div>
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="currency"
                    >
                        Currency
                    </label>
                    <Select

                        value={data.currency}
                        onValueChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                currency: val as Currency
                            }))
                        }
                        name="currency"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-white h-[200px] p-0 overflow-auto">
                            {Object.entries(Currency).map(([key, value]) => (
                                <SelectItem
                                    key={key}
                                    className="py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]"
                                    value={value}
                                >
                                    {value}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                    {formState?.errors?.["currency"]?.[0] && (
                        <p className="text-sm text-red-500">{formState?.errors?.["currency"]?.[0]}</p>
                    )}
                </div>
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="businessValue"
                    >
                        Business Value ($)
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4]'
                        type="number"

                        min={1}
                        id="businessValue"
                        value={data.businessValue}
                        name="businessValue"
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                businessValue: Number(e.target.value),
                            }))
                        }
                    />
                    {formState?.errors?.["businessValue"]?.[0] && (
                        <p className="text-sm text-red-500">{formState?.errors?.["businessValue"]?.[0]}</p>
                    )}
                </div>
                <div className='group pb-5'>
                    <label
                        className='group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1'
                        htmlFor="hourlyCost"
                    >
                        Hourly Cost ($)
                    </label>
                    <input
                        className='p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4]'
                        type="number"
                        min={1}

                        id="hourlyCost"
                        name="hourlyCost"
                        value={data.hourlyCost}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                hourlyCost: Number(e.target.value),
                            }))
                        }
                    />
                    {formState?.errors?.["hourlyCost"]?.[0] && (
                        <p className="text-sm text-red-500">{formState?.errors?.["hourlyCost"]?.[0]}</p>
                    )}
                </div>

                <div className='pb-5'>
                    <label className=' text-sm text-secondary-50 block w-full mb-1'>Token</label>
                    <CopyText text={data.token} />
                </div>
                <div className=' pb-5 relative'>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm text-[#3a3a3a]">Enable 2FA</div>
                        <Switch
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-[#CDCDCD]"
                            checked={data.enable2FA}
                            onCheckedChange={(val) =>
                                setData((prev) => ({
                                    ...prev,
                                    enable2FA: val
                                }))
                            }
                            name="enable2FA"
                        />
                    </div>
                    <p className="text-sm text-[#808080] text-nowrap">This will require the user to configure a 2FA on an authenticator app</p>
                </div>
                <Button
                    className="bg-primary-500 flex rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center w-fit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </form>
        </div >
    )
}

export default AccountSettingsForm