"use client";

import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

const mockData = [
    { _id: 1, name: "John Doe", email: "Xk3Y8@example.com", profilePicture: "/" },
    { _id: 2, name: "John Doe", email: "Xk3Y8@example.com", profilePicture: "/" },
    { _id: 3, name: "John Doe", email: "Xk3Y8@example.com", profilePicture: "/" },
]



const InstagramPage = () => {
    const [accounts, setAccounts] = useState([]);

    const [popupLink, setPopupLink] = useState("");
    const handleButtonClick = async () => {
        try {
            const response = await axiosInstance.post("/insta/connect"); // Replace with your API endpoint
            console.log("response:", response)
            const data = response.data;
            if (data?.authUrl) {
                setPopupLink(data.authUrl);
                const popup = window.open(data.authUrl, "InstagramConnectPopup", "width=600,height=600");
                if (popup) popup.focus();
            } else { console.error("No link received from API."); }
        }
        catch (error) { console.error("Failed to fetch Instagram link:", error); }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await axiosInstance.get('/insta/connected-accounts');
                setAccounts(data.connectedAccounts || []);
            } catch (error) {
                console.error('Failed to fetch connected accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div className='py-4 px-14'>
            <div>
                <div className='mb-[6px] text-secondary-50 font-semibold text-2xl font-barlow'>Instagram Configuration</div>
                <p className='max-w-[456px] text-[13px] text-[#808080]'>Connect and authorize your Instagram account, to add a chatbot to your Instagram.</p>
            </div>
            <div className='pt-7'>
                <button onClick={handleButtonClick} className='flex gap-2 w-fit items-center h-[36px] px-5 text-sm rounded-lg border border-[#CDCDCD] transition-all duration-200 hover:bg-[#F3F3F3]'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18px" height="18px"><linearGradient id="a" x1="1.464" x2="14.536" y1="14.536" y2="1.464" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFC107"></stop><stop offset="0.507" stopColor="#F44336"></stop><stop offset="0.99" stopColor="#9C27B0"></stop></linearGradient><path fill="url(#a)" d="M11 0H5a5 5 0 00-5 5v6a5 5 0 005 5h6a5 5 0 005-5V5a5 5 0 00-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"></path><linearGradient id="b" x1="5.172" x2="10.828" y1="10.828" y2="5.172" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFC107"></stop><stop offset="0.507" stopColor="#F44336"></stop><stop offset="0.99" stopColor="#9C27B0"></stop></linearGradient><path fill="url(#b)" d="M8 4a4 4 0 100 8 4 4 0 000-8zm0 6.5A2.503 2.503 0 015.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path><linearGradient id="c" x1="11.923" x2="12.677" y1="4.077" y2="3.323" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFC107"></stop><stop offset="0.507" stopColor="#F44336"></stop><stop offset="0.99" stopColor="#9C27B0"></stop></linearGradient><circle cx="12.3" cy="3.7" r="0.533" fill="url(#c)"></circle></svg>
                    </span>
                    <span className='text-secondary-50'>Connect to instagram</span>
                </button>
            </div>
            <div className='max-w-[545px] pt-12 pb-8'>
                <div className='text-[#808080] mb-1 text-sm'>Connected accounts</div>
                <div className='flex flex-col gap-4'>
                    {accounts?.map((account: any) => <div key={account?._id} className='group flex items-center justify-between gap-4'>
                        <div className='w-[513px] flex items-center p-2 border-2 border-[#E4E4E4] rounded-lg transition-all duration-200 hover:border-primary-500'>
                            <div className='flex items-center gap-4'>
                                <div className='w-[56px] h-[56px] rounded-full bg-slate-100'>
                                    <Image src={account?.profilePicture} alt="" width={56} height={56} />
                                </div>
                                <div className='text-sm text-secondary-50'>{account?.name}</div>
                            </div>
                        </div>
                        <div className='opacity-0 hover:opacity-100 group-hover:opacity-100 w-5 flex items-center justify-center'>
                            <span >
                                <Trash2 size={18} className='cursor-pointer text-[#808080] hover:text-[#f00]' />
                            </span>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default InstagramPage;
