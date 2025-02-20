import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
    getLabels,
    createLabel as createLabelApi,
    getConversationLabels,
    addLabelToConversation as addLabelToConversationApi,
    deleteLabelFromConversation as deleteLabelFromConversationApi
} from "@/service/labelsServices";
import { useChatStore } from "@/stores/useChatStore";
import { useLabelsStore } from "@/stores/useLabelsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon, Tag, X } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    clientInformation: any
}
type Label = {
    _id: string;
    name: string;
};
export default function UserLabels({ clientInformation }: Props) {

    const selectedConversation = useChatStore((state) => state.selectedConversation);
    const queryClient = useQueryClient();
    const [openLabels, setOpenLabels] = useState(false);
    const [openAddLabel, setOpenAddLabel] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useOutsideClick(() => setOpenAddLabel(false));

    const labels = useLabelsStore((state) => state.labels);


    useEffect(() => {
        return () => {
            if (openAddLabel) {
                setOpenAddLabel(false);
            }
            setOpenLabels(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConversation])


    const { data: conversationLabels } = useQuery<Label[]>({
        queryKey: ["conversation-labels", selectedConversation?._id],
        queryFn: () => getConversationLabels(selectedConversation?._id),
        enabled: !!selectedConversation?._id
    })

    const { mutate: createLabel, isPending: isPendingCreate } = useMutation({
        mutationFn: createLabelApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            setOpenAddLabel(false);
            setSearchQuery("");
        },
        onError: (error: any) => {
            toast.error(error);
        },
    });
    const { mutate: addLabelToConversation, isPending: isPendingAdd } = useMutation({
        mutationFn: ({ conversationId, labelId }: { conversationId: string, labelId: string }) => addLabelToConversationApi(conversationId, labelId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversation-labels"] });
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            setOpenAddLabel(false);
        },
        onError: (error: any) => {
            toast.error(error);
        },
    });
    const { mutate: deleteLabelFromConversation, isPending: isPendingDelete } = useMutation({
        mutationFn: ({ conversationId, labelId }: { conversationId: string, labelId: string }) => deleteLabelFromConversationApi(conversationId, labelId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversation-labels"] });
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            setOpenAddLabel(false);
        },
        onError: (error: any) => {
            toast.error(error);
        },
    });

    // function handleClick() {
    //     setOpenAddLabel(!openAddLabel)
    //     inputRef.current?.focus();
    // }

    // ChatGPT Suggestion
    function handleClick() {
        setOpenAddLabel((prev) => {
            const isOpen = !prev;
            if (isOpen) inputRef.current?.focus();
            return isOpen;
        });
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenAddLabel(true);
        setSearchQuery(e.target.value);
    };
    function handleAddLabel(labelId: string) {
        addLabelToConversation({ conversationId: selectedConversation?._id, labelId });
    }
    function handleDeleteLabel(labelId: string) {
        deleteLabelFromConversation({ conversationId: selectedConversation?._id, labelId });
    }



    const filteredLabels: Label[] | undefined = labels?.filter(
        (item: Label) => !conversationLabels?.some((conversationLabel: Label) => conversationLabel._id === item._id)
    );
    const displayedLabels: Label[] | undefined = filteredLabels?.filter((label: Label) => label.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="border-parimary-50 border-b px-5 py-3">
            <div
                onClick={() => setOpenLabels(!openLabels)}
                className="flex items-center cursor-pointer justify-between py-2"
            >
                <div className="flex items-center gap-1 text-sm font-semibold uppercase text-[#3a3a3a]">
                    <span>labels</span>
                    <span>{conversationLabels?.length}</span>
                </div>
                <div>
                    <span>
                        <ChevronDownIcon className={`${openLabels && "rotate-180"} transition-all duration-300  h-4 w-4 text-secondary-50`} />
                    </span>
                </div>
            </div>
            {openLabels && (
                <div ref={containerRef} onClick={handleClick} className="relative flex flex-wrap gap-1 p-1 border rounded-lg hover:border-primary-500 focus-within:border-primary-500 border-primary-50">
                    {conversationLabels?.map((label: Label) => <div key={label._id} className="bg-[#f3f3f3] flex items-center justify-between gap-2 text-sm w-fit text-secondary-50 px-2 py-2 rounded-lg">
                        <span>
                            <Tag className="h-4 w-4" />
                        </span>
                        <span>{label.name}</span>
                        <span onClick={() => handleDeleteLabel(label._id)} className="cursor-pointer">
                            <X className="h-4 w-4" />
                        </span>
                    </div>)}
                    {(isPendingAdd || isPendingDelete || isPendingCreate) && <div className="flex items-center justify-center h-[36px] w-6">
                        <span className="h-4 w-4 block rounded-full border-2 border-primary-500 border-r-transparent animate-spin"></span>
                    </div>}
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="rounded-lg text-sm text-secondary-50 caret-inherit p-2 outline-none h-full inline-block"
                    />
                    {openAddLabel &&
                        <div className="absolute overflow-y-auto max-h-[300px] top-[120%] w-full py-1 bg-white rounded-lg border border-primary-50">
                            {searchQuery &&
                                <div onClick={() => createLabel(searchQuery)} className="text-sm p-3 text-[#3a3a3a] hover:bg-[#f3f3f3]">create "{searchQuery}"</div>}
                            {displayedLabels?.map((label: Label) => <div onClick={() => handleAddLabel(label._id)} key={label._id} className="text-sm p-3 text-[#3a3a3a] hover:bg-[#f3f3f3]">{label.name}</div>
                            ) ?? null}
                        </div>}
                </div>
            )}
        </div>
    )
}