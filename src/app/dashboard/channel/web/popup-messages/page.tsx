"use client"
import { useState } from "react"
import AddPopupMessageModal from "@/components/channel/web/popupMessages/AddPopupMessageModal"
import ReusableButton from "@/components/shared/ReusableButton"
import PopupMessageTable from "@/components/channel/web/popupMessages/PopupMessageTable"


export default function PopupMessagesPage() {
    const [openAddPopupMessageModal, setOpenAddPopupMessageModal] = useState(false)
    const [popupMessagesCount, setPopupMessagesCount] = useState(0)
    return (
        <div className="pt-3 px-12">
            <AddPopupMessageModal isOpen={openAddPopupMessageModal} setIsOpen={setOpenAddPopupMessageModal} />
            <div>
                <div className="text-secondary-50 font-semibold font-barlow text-2xl">Pop-up Messages</div>
                <p className="max-w-[576px] text-[#808080] text-sm pt-3">Pop-up messages help drive user attention & increase engagement with the bot on your website. Configure page-wise contextual pop-up messages for your bot below.</p>
            </div>
            <div className="pt-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm text-secondary-50">
                        <span>{popupMessagesCount}</span>
                        <span>Pop-up Message</span>
                    </div>
                    <ReusableButton onClick={() => setOpenAddPopupMessageModal(true)}>Add Messages</ReusableButton>
                </div>
                <PopupMessageTable setPopupMessagesCount={setPopupMessagesCount} />
            </div>
        </div>
    )
}