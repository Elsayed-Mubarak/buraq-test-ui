import { CheckIcon, ChevronDown, Pencil, Trash2 } from "lucide-react"
import {
    addClientNote,
    getClientNotes,
    deleteClientNote,
    updateClientNote,

} from "@/service/notesServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/stores/useChatStore";

type Props = {
    clientInformation: any
}

// const testNotes = [
//     { _id: 1, content: "Hello" },
//     { _id: 2, content: "this is a note" },
//     { _id: 3, content: "test note" },
// ]

export default function UserNotes({ clientInformation }: Props) {
    const queryClient = useQueryClient();
    const selectedConversation = useChatStore((state) => state.selectedConversation);
    const [openNotes, setOpenNotes] = useState(false);
    const [noteContent, setNoteContent] = useState("");
    const [openAddNote, setOpenAddNote] = useState(false);
    const [noteEditId, setNoteEditId] = useState<string | null>(null);
    const [noteEditContent, setNoteEditContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (noteEditId && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            );
        }
    }, [noteEditId]);

    useEffect(() => {
        return () => {
            if (openAddNote) {
                setNoteContent("");
                setOpenAddNote(false);
            }
            setOpenNotes(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConversation])
    const { data: notes } = useQuery({
        queryKey: ["notes", clientInformation],
        queryFn: () => getClientNotes(clientInformation?._id),
        enabled: !!clientInformation,
    });

    const { mutate: createNote, isPending: addNotePending } = useMutation({
        mutationFn: addClientNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setOpenAddNote(false);
            setNoteContent("");
        },
        onError: (err) => console.log(err),
    });
    const { mutate: deleteNote } = useMutation({
        mutationFn: deleteClientNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: (err) => console.log(err),
    });
    const { mutate: updateNote } = useMutation({
        mutationFn: updateClientNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: (err) => console.log(err),
    });
    function addNote() {
        if (!noteContent) return;
        createNote({ clientId: clientInformation?._id, content: noteContent });
    }

    function handleOpenUpdateNote(id: string, content: string) {
        setNoteEditId(id);
        setNoteEditContent(content);
    }

    function handleUpdateNote() {
        if (!noteEditContent) return;
        updateNote({
            noteId: noteEditId!,
            content: noteEditContent,
        });
        setNoteEditId(null);
    }

    return (
        <div className="border-parimary-50 border-b py-3 px-5">
            <div
                onClick={() => setOpenNotes(!openNotes)}
                className="py-2 cursor-pointer flex items-center justify-between"
            >
                <div className="flex items-center gap-1 text-sm font-semibold uppercase text-[#3a3a3a]">
                    <span>notes</span>
                    <span>{notes && notes?.length || 0}</span>
                </div>
                <div>
                    <span>
                        <ChevronDown className={`${openNotes && "rotate-180"} transition-all duration-300 h-4 w-4 text-secondary-50`} />
                    </span>
                </div>
            </div>
            {openNotes && (
                <div className="mt-2">
                    {notes?.length > 0 ?
                        notes?.map((note: any) => (
                            <div key={note._id} className="group mb-3 bg-[#fffaeb] rounded-lg border border-transparent transition-all duration-300 hover:border-[#fedf89] p-3 ">
                                {noteEditId === note._id ?
                                    <textarea
                                        ref={textareaRef}
                                        value={noteEditContent}
                                        onChange={(e) => setNoteEditContent(e.target.value)}
                                        className="block overflow-hidden text-secondary-50 text-sm border-0 outline-none h-5 w-full bg-transparent resize-none"
                                    ></textarea>
                                    : <p className="block text-sm text-secondary-50 overflow-hidden border-0 outline-none h-5 w-full bg-transparent "
                                    >{note.content}</p>}
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[11px]">now</span>
                                    {noteEditId === note._id ? <div onClick={handleUpdateNote} className="cursor-pointer">
                                        <CheckIcon className="h-4 w-4" />
                                    </div> : <div className="flex items-center gap-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                                        <span onClick={
                                            () => handleOpenUpdateNote(note._id, note.content)}
                                            className="cursor-pointer">
                                            <Pencil className="h-4 w-4 hover:text-secondary-50" />
                                        </span>
                                        <span onClick={() => deleteNote(note._id)} className="cursor-pointer">
                                            <Trash2 className="h-4 w-4 hover:text-[#f00] " />
                                        </span>
                                    </div>}
                                </div>
                            </div>
                        )) : <div className={`${openAddNote && "hidden"} text-sm text-[#0f0f0f]`}>No notes created yet!</div>}
                    {openAddNote && <div className="mb-3 bg-[#fffaeb] rounded-lg border border-[#fedf89] p-3 ">
                        <textarea
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            className="block overflow-hidden border-0 outline-none h-5 w-full bg-transparent resize-none"
                        ></textarea>
                        <div className="flex items-center justify-end mt-2">
                            {addNotePending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-primary-500"></span> :
                                <span onClick={addNote} className="cursor-pointer">
                                    <CheckIcon className="h-4 w-4" />
                                </span>}
                        </div>
                    </div>}
                    <button
                        onClick={() => setOpenAddNote(true)}
                        className={`${openAddNote && !noteContent && "cursor-not-allowed"} text-primary-500 block pt-3 pe-3 text-sm`}
                    >
                        + Add note
                    </button>
                </div>
            )}
        </div>
    )
}