import { getClientConversations } from '@/service/clientServices';
import { useChatStore } from '@/stores/useChatStore';
import { timeElapsed } from '@/utils/timeElapsed';
import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link';
import { useEffect, useState } from 'react'

type Props = {
    clientInformation: any
}

export default function UserRelatedConversations({ clientInformation }: Props) {
    const selectedConversation = useChatStore((state) => state.selectedConversation)
    const [openRelated, setOpenRelated] = useState(false);

    useEffect(() => {
        return () => setOpenRelated(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConversation])
    const { data: relatedConversations } = useQuery({
        queryKey: ["relatedConversations"],
        queryFn: () => getClientConversations(clientInformation?._id),
        enabled: !!clientInformation?._id
    })

    return (
        <div className="px-5 py-2">
            <div onClick={() => setOpenRelated(!openRelated)} className="flex cursor-pointer py-3 items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-semibold uppercase text-[#3a3a3a]">
                    <span>related conversation</span>
                    <span>{relatedConversations?.length}</span>
                </div>
                <div>
                    <span>
                        <ChevronDownIcon className={`${openRelated ? "rotate-180" : ""} transition-all duration-300 h-4 w-4 text-secondary-50`} />
                    </span>
                </div>
            </div>
            {openRelated &&
                <div className='overflow-y-auto h-auto'>
                    {relatedConversations?.map((conversation: any) => <Link key={conversation._id} target='_blank' href={`/dashboard/live-chat/conversations/${conversation._id}`} className='block border-b border-[#f3f3f3]'>
                        <div className='grid grid-cols-[36px_1fr] gap-3 min-h-[88px] bg-white cursor-pointer py-3 px-4 transition-all duration-300 hover:bg-[#f3f3f3]'>
                            <div>
                                <div className='flex items-center justify-center w-9 h-9 border border-[#e4e4e4] text-sm text-[#808080] rounded-full p-[2px] bg-white'>AM</div>
                            </div>
                            <div className='w-full'>
                                <div className='flex items-center justify-between'>
                                    {
                                        conversation?.status === "opened" ? <div className='font-medium text-sm text-secondary-50'>Ongoing Conversation</div> : <div className='font-medium text-sm text-secondary-50'>Closed By System</div>
                                    }
                                    <span className='text-[11px] text-[#808080]'>{timeElapsed(conversation?.updatedAt)}</span>
                                </div>
                                <div className='text-[13px] text-[#6d6d6d]'>{`${conversation?.assignedTo?.firstName} ${conversation?.assignedTo?.lastName}`}</div>
                                <div className='text-[11px] text-[#6d6d6d] w-[220px] truncate'>last message</div>
                            </div>
                        </div>
                    </Link>)}
                </div>}
        </div>
    )
}