import useCreateTemplateStore from '@/stores/useCreateTemplate';
import React, { useState } from 'react'

type Props = {
}

export default function TemplateFooter({ }: Props) {
    const {
        footerObject,
        changeFooterText,
    } = useCreateTemplateStore();
    const [footerText, setFooterText] = useState("")

    function handleChangeText(newValue: string) {
        changeFooterText(newValue);
        setFooterText(newValue);
    }
    return (
        <div className='py-5 border-b border-[#cdcdcd]'>
            <div className='text-lg text-secondary-50 font-semibold'>Footer (Optional)</div>
            <div className='w-[297px] mt-1 mb-3 text-sm text-[#808080]'>
                Add a short line of text to the bottom of your message template.
            </div>
            <textarea value={footerObject.value} onChange={(e) => handleChangeText(e.target.value)} maxLength={60} className='h-[60px] block w-full focus:outline-none resize-none py-2 px-3 text-sm mb-2 text-secondary-50 border border-primary-50 rounded-lg' placeholder='You text here'>

            </textarea>
            <div className='flex items-center justify-between text-[#808080]'>
                <div className='text-[11px]'>Footer character limit is 60 characters</div>
                <span className='text-[13px]'>{footerText.length}</span>
            </div>
        </div>
    )
}