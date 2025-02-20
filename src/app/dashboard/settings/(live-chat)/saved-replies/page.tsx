"use client"
import SavedRepliesTable from "@/components/settings/saved-replies/SavedRepliesTable"

type Props = {}

export default function Page({ }: Props) {
    return (
        <div className="py-4 px-12">
            <div className="mb-8" >
                <div className="text-2xl font-semibold text-secondary-50 font-barlow mb-3">Saved Replies</div>
                <p className="text-[#808080] text-[13px] max-w-[586px]">Create and use pre-written responses, enabling faster and more efficient customer interactions.</p>
            </div>
            <SavedRepliesTable />
        </div>
    )
}

