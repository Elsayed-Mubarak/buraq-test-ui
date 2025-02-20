"use client";
import { v4 as uuidv4 } from "uuid"
import WebSocketSingleton from "@/service/socket";
import dynamic from "next/dynamic";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import Button from "./Button";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteSavedReply as deleteSavedReplyApi,
  editSavedReply as editSavedReplyApi,
} from "@/service/savedReplies";
import toast from "react-hot-toast";
import { useChatStore } from "@/stores/useChatStore";
import {
  Bookmark,
  FilePlus,
  Images,
  Mic,
  Paperclip,
  Pencil,
  Smile,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import JoinConversation from "@/components/live-chat/JoinConversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { deleteFile, uploadFile, uploadAudio } from "@/service/fileServices";
import ToolTip from "../shared/ToolTip";

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};

type Props = {
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
  savedReplies: any[];
  addSavedReply: any;
  setSavedReplySearchQuery: React.Dispatch<React.SetStateAction<string>>;
  savedReplySearchQuery: string;
};
export default function ChatControls({
  messageContent,
  setMessageContent,
  savedReplies,
  addSavedReply,
  setSavedReplySearchQuery,
  savedReplySearchQuery,
}: Props) {
  const selectedConversation = useChatStore((state) => state.selectedConversation);
  const businessPhoneNumber = useChatStore((state) => state.businessPhoneNumber);
  const authUser = useAuthStore((state) => state.authUser);
  const queryClient = useQueryClient();

  // saved reply
  const [openSavedReplies, setOpenSavedReplies] = useState(false);
  const [openCreateReplyModel, setOpenCreateReplyModel] = useState(false);
  const [openEditReplyModel, setOpenEditReplyModel] = useState(false);
  const [openDeletReplyModel, setOpenDeletReplyModel] = useState(false);
  const [replyTitle, setReplyTitle] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyEditTitle, setReplyEditTitle] = useState("");
  const [replyEditText, setReplyEditText] = useState("");
  const [replyDeletedId, setReplyDeletedId] = useState(null);
  const [replyEditId, setReplyEditId] = useState(null);

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const textareaRef: any | null = useRef(null);

  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLink, setAudioLink] = useState({ url: "", name: "" });
  const [audioLoading, setAudioLoading] = useState(false);
  const [time, setTime] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [file, setFile] = useState<any | null>(null);
  const [fileLink, setFileLink] = useState({ url: "", name: "" });
  const [fileLoading, setFileLoading] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileType, setFileType] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openSavedRef = useOutsideClick(() => setOpenSavedReplies(false));
  const closeEmojiPickerRef = useOutsideClick(() => setOpenEmojiPicker(false));
  const creatReplyModelRef = useOutsideClick(() =>
    setOpenCreateReplyModel(false),
  );
  const editReplyModelRef = useOutsideClick(() => setOpenEditReplyModel(false));
  const deletReplyModelRef = useOutsideClick(() =>
    setOpenDeletReplyModel(false),
  );

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  // Function to start recording
  const startRecording = async () => {
    try {
      setRecording(prev => !prev);
      setTime(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = []; // Clear previous audio chunks

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url); // This will trigger useEffect for uploading
        setTime(0);
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error starting recording:", error);
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();
    setRecording(false);
    setTime(0);
  };

  const uploadAudioFile = async (url: string) => {
    setAudioLoading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const responseData = await uploadAudio(blob);
      setAudioLink(responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setAudioLoading(false);
    }
  };
  // Upload audio after URL is set
  useEffect(() => {
    if (audioUrl) {
      uploadAudioFile(audioUrl);
    }
  }, [audioUrl]);

  const deleteAudio = () => {
    setAudioUrl(null);
    audioChunks.current = [];
    setRecording(false);
    setTime(0);
  };

  async function deleteAudioFromServer() {
    try {
      const response = await deleteFile(audioLink?.url);
      setAudioUrl(null);
      setAudioLink({ url: "", name: "" });
      audioChunks.current = [];
      setRecording(false);
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const { mutate: deleteSavedReply } = useMutation({
    mutationFn: deleteSavedReplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-replies"] });
      toast.success("Save reply deleted successfully");
      setOpenDeletReplyModel(false);
    },
    onError: (err) => toast.error(err.message),
  });
  const { mutate: editSavedReply } = useMutation({
    mutationFn: editSavedReplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-replies"] });
      toast.success("Edit reply deleted successfully");
      setOpenEditReplyModel(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSelectEmoji = (emojiObje: any) => {
    setMessageContent((prev) => prev + emojiObje.emoji);
    setOpenEmojiPicker(false);
  };
  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type.split("/")[0] === "application" ? "document" : selectedFile.type.split("/")[0])
      if (selectedFile.size >= 5000000) {
        setFileSizeError(true);
        return
      }
      try {
        setFileLoading(true);
        const response = await uploadFile(selectedFile);
        setFileLink(response);
      } catch (error) {
        console.log(error)
      } finally {
        setFileLoading(false);
      }
    }
  };
  async function handleDeleteFile() {
    if (!fileLink.url || !file) {
      setFile(null);
      setFileSizeError(false);
      setFileType('')
      if (fileInputRef.current) fileInputRef.current.value = "";
      return
    }
    try {
      const response = await deleteFile(fileLink?.url);
      setFile(null);
      setFileLink({ url: "", name: "" });
      setFileSizeError(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return response
    } catch (error) {
      console.log(error)
    }
  }
  function handleSendTextMessage() {
    if (!messageContent) return;
    const messageData = {
      type: "text",
      id: "msg_" + uuidv4() + `_${Date.now()}`,
      content: messageContent,
      conversationId: selectedConversation?._id,
      to: selectedConversation.participants.to,
      from: selectedConversation.participants.from,
      status: "sent",
      updatedAt: new Date().toISOString(),
    }
    WebSocketSingleton.sendTextMessage(messageData);
    setMessageContent("");
  }

  function handleSendFileMessage() {
    if (fileLink.url) {
      const messageData = {
        type: fileType,
        id: "msg_" + uuidv4() + `_${Date.now()}`,
        content: messageContent || "",
        conversationId: selectedConversation?._id,
        to: selectedConversation.participants.to,
        from: selectedConversation.participants.from,
        status: "sent",
        updatedAt: new Date().toISOString(),
        file: fileLink.url,
        fileName: fileLink.name
      }
      WebSocketSingleton.sendFileMessage(messageData);
      setMessageContent("");
      setFile(null);
      setFileLink({ url: "", name: "" });
      setFileSizeError(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    if (audioLink.url) {
      const messageData = {
        type: "audio",
        id: "msg_" + uuidv4() + `_${Date.now()}`,
        content: "",
        conversationId: selectedConversation?._id,
        to: selectedConversation.participants.to,
        from: selectedConversation.participants.from,
        status: "sent",
        updatedAt: new Date().toISOString(),
        file: audioLink.url,
        fileName: "recording"
      }
      WebSocketSingleton.sendFileMessage(messageData);
      setAudioLink({ url: "", name: "" })
    }
  }

  function handleSendMessage() {
    if (fileLink?.url?.length > 0 || audioLink?.url?.length > 0) {
      if (messageContent.trim().length > 0) {
        handleSendTextMessage()
      }
      handleSendFileMessage()
    } else {
      handleSendTextMessage()
    }
  }
  useEffect(() => {
    const textarea: any = textareaRef.current;
    const handleInput = () => {
      if (!textarea) return
      textarea.style.height = "auto";
      textarea.style.height = `${textarea?.scrollHeight}px`;
    };
    textarea?.addEventListener("input", handleInput);
    handleInput();
    return () => {
      textarea?.removeEventListener("input", handleInput);
    };
  }, [messageContent]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    } else if (event.key === "Enter" && event.shiftKey) {
      setMessageContent((prev) => prev + "\n");
    }
  };
  const assignerUser = selectedConversation?.assignedTo?._id;
  return (
    <div
      className="border-t border-primary-50 p-2"
    >
      {openDeletReplyModel && (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.1)]">
          <div
            ref={deletReplyModelRef}
            className="w-[350px] rounded-xl bg-white shadow-md"
          >
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
              <div className="text-xl font-semibold text-[#3a3a3a]">
                Delete Saved Reply
              </div>
              <span
                onClick={() => setOpenDeletReplyModel(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-[#808080]" />
              </span>
            </div>
            <div className="border-b border-primary-50 px-6 py-5">
              <p className="text-[13px] font-semibold text-[#808080]">
                Are you sure you want to delete reply titled "
                <span>test test</span>"
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-5">
              <button
                className="rounded-lg border border-[#cdcdcd] px-5 py-2 text-sm font-semibold text-secondary-50 hover:bg-[#f4f4f4]"
                onClick={() => {
                  setOpenDeletReplyModel(false);
                }}
              >
                <span>Cancel</span>
              </button>
              <button
                className="rounded-lg border border-[#cdcdcd] bg-[#f00] px-5 py-2 text-sm font-semibold text-white hover:bg-[#eb0000]"
                onClick={(e: any) => {
                  e.preventDefault();
                  deleteSavedReply(replyDeletedId || "");
                }}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {openCreateReplyModel && (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.1)]">
          <div
            ref={creatReplyModelRef}
            className="w-[350px] rounded-xl bg-white shadow-md"
          >
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
              <div className="text-xl font-semibold text-[#3a3a3a]">
                Create Saved Reply
              </div>
              <span
                onClick={() => setOpenCreateReplyModel(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-[#808080]" />
              </span>
            </div>
            <div className="border-b border-primary-50 px-6 py-5">
              <div className="group mb-5">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  value={replyTitle}
                  onChange={(e) => setReplyTitle(e.target.value)}
                  className="block w-full border border-primary-50 p-[10px]"
                />
              </div>
              <div className="group">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="reply"
                >
                  Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="block h-[130px] w-full resize-none border border-primary-50 p-[10px]"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-5">
              <Button
                onClick={() => {
                  addSavedReply(replyTitle, replyText);
                  setReplyTitle("");
                  setReplyText("");
                  setOpenCreateReplyModel(false);
                }}
                type={!replyTitle || !replyText ? "disable" : ""}
              >
                <span>Create</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {openEditReplyModel && (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.1)]">
          <div
            ref={editReplyModelRef}
            className="w-[350px] rounded-xl bg-white shadow-md"
          >
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
              <div className="text-xl font-semibold text-[#3a3a3a]">
                Edit Saved Reply
              </div>
              <span
                onClick={() => setOpenEditReplyModel(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-[#808080]" />
              </span>
            </div>
            <div className="border-b border-primary-50 px-6 py-5">
              <div className="group mb-5">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  value={replyEditTitle}
                  onChange={(e) => setReplyEditTitle(e.target.value)}
                  className="block w-full border border-primary-50 p-[10px]"
                />
              </div>
              <div className="group">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="reply"
                >
                  Reply
                </label>
                <textarea
                  value={replyEditText}
                  onChange={(e) => setReplyEditText(e.target.value)}
                  className="block h-[130px] w-full resize-none border border-primary-50 p-[10px]"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-5">
              <Button
                onClick={(e: any) => {
                  editSavedReply({
                    id: replyEditId || "",
                    title: replyEditTitle,
                    reply: replyEditText,
                  });
                  e.preventDefault();
                }}
                type={!replyEditTitle || !replyEditText ? "disable" : ""}
              >
                <span>Update</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedConversation?.status !== "closed" && <>

        {assignerUser === authUser?._id ? <>
          {!recording && !audioLink?.url && !audioLoading && <div className="mb-2">
            <textarea
              ref={textareaRef}
              value={messageContent}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your message..."
              className="w-full resize-none overflow-hidden border-0 px-3 py-2 text-sm text-secondary-50 outline-0 focus:ring-0"
            ></textarea>
          </div>}

          {file && (
            <div className={`flex h-[60px] w-[240px] items-center gap-1 overflow-hidden rounded-lg   p-2 ${fileSizeError ? "bg-[#c44e47] text-white" : "bg-[#f3f3f3] text-[#3a3a3a]"}`}>
              <div className="w-[90%] font-semibold ">
                <div className="truncate text-sm flex items-center justify-between">
                  <span>{file?.name}</span>
                  {fileSizeError && <span>File too large</span>}
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span>
                    {file?.size > 1024 * 1000
                      ? `${(file?.size / (1024 * 1024)).toFixed(1)} MB`
                      : `${(file?.size / 1024).toFixed(0)} KB`}
                  </span>
                  <div className="flex items-center gap-1">
                    {fileSizeError ? <span>Upload file less than 5MB</span> :
                      <>
                        <svg
                          aria-hidden="true"
                          data-prefix="fas"
                          data-icon="check-circle"
                          className="prefix__svg-inline--fa prefix__fa-check-circle prefix__fa-w-16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={{
                            display: "block",
                            width: "13px",
                            height: "13px",
                          }}
                        >
                          <path
                            fill="#13be66"
                            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                          ></path>
                        </svg>
                        <span>Upload{fileLoading ? "ing..." : " completed"}</span>
                      </>}
                  </div>
                </div>
              </div>
              <button onClick={handleDeleteFile}>
                <Trash2 className="h-4 w-4 cursor-pointer hover:text-[#f00]" />
              </button>
            </div>
          )}
          {recording && (
            <div className="flex items-center gap-[10px] w-[300px] bg-[#f3f4f6] rounded-lg h-[60px] py-2 px-4 mx-4">
              <span
                className="w-4 h-4 bg-[#f00] cursor-pointer rounded"
                onClick={stopRecording}
              ></span>
              <span className="w-[45px] text-[#707070] text-sm">
                {formatTime(time)}
              </span>
              <div className="w-[150px] h-[30px] flex items-center">
                <span>recording...</span>
              </div>
              <span
                onClick={deleteAudio}
                className="w-6 text-[#808080] hover:text-[#f00] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </span>
            </div>
          )}
          {
            audioLoading && <div className="flex items-center gap-1 w-[300px] bg-[#f3f4f6] rounded-lg h-[60px] py-2 px-4 mx-4">
              <span className="w-4 h-4 animate-spin border-[2px] border-primary-500 border-t-transparent rounded-full"></span>
              <div>........................</div>
            </div>
          }
          {
            (audioLink.url && !audioLoading) && <div className="flex items-center gap-1 w-[300px] bg-[#f3f4f6] rounded-lg h-[60px] py-2 px-4 mx-4">
              <audio controls className="flex-1">
                <source src={audioLink.url} type="audio/mpeg" />
                <source src={audioLink.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <span onClick={deleteAudioFromServer} className="w-6">
                <Trash2 className="w-4 h-4 text-[#808080] hover:text-[#f00] cursor-pointer" />
              </span>
            </div>
          }

          <div className="relative  flex items-center justify-between p-4">
            {openEmojiPicker && (
              <div
                ref={closeEmojiPickerRef}
                className="absolute bottom-[50px] left-0"
              >
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={handleSelectEmoji}
                  autoFocusSearch={true}
                  // Theme="light"
                  width={290}
                  height={300}
                  searchDisabled={false}
                  previewConfig={{ showPreview: false }}
                  skinTonesDisabled={true}
                // categories={[
                //   "smileys_people"
                //   "animals_nature"
                //   "food_drink"
                //   "travel_places"
                //   "activities"
                //   "objects"
                //   "symbols"
                //   "flags"
                // ]}
                />
              </div>
            )}
            <div className="flex items-center">
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50 ${openSavedReplies ? "bg-[#f3f3f3] text-secondary-50" : ""}`}
              >
                {openSavedReplies && (
                  <div
                    ref={openSavedRef}
                    className="absolute bottom-[30px] left-0 w-[250px] rounded-md border border-primary-50 bg-white text-secondary-50 shadow-md"
                  >
                    <div className="border-b border-primary-50 px-4 py-3">
                      <input
                        value={savedReplySearchQuery}
                        onChange={(e) => setSavedReplySearchQuery(e.target.value)}
                        className="inline-block w-full rounded-md border-2 border-primary-500 p-2 text-sm"
                        type="text"
                        placeholder="Search..."
                      />
                    </div>
                    <div className="h-[180px] overflow-auto border-b border-primary-50 py-2 scrollbar-thin scrollbar-track-white scrollbar-thumb-primary-50">
                      {savedReplies.map((reply) => (
                        <div
                          className="cursor-pointer px-4 py-2 hover:bg-[#f3f3f3]"
                          key={reply._id}
                        >
                          <div className="flex items-center justify-between">
                            <p
                              onClick={() => {
                                setMessageContent(reply.reply);
                                setOpenSavedReplies(false);
                              }}
                              className="flex-1"
                            >
                              {reply.title}
                            </p>
                            <div className="flex items-center gap-2 px-2 py-1 text-[#808080]">
                              <span
                                onClick={() => {
                                  setOpenEditReplyModel(true);
                                  setOpenSavedReplies(false);
                                  setReplyEditText(reply.reply);
                                  setReplyEditTitle(reply.title);
                                  setReplyEditId(reply._id);
                                }}
                                className="hover:text-secondary-50"
                              >
                                <Pencil className="h-4 w-4" />
                              </span>
                              <span
                                onClick={() => {
                                  setOpenDeletReplyModel(true);
                                  setOpenSavedReplies(false);
                                  setReplyDeletedId(reply._id);
                                }}
                                className="hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              setMessageContent(reply.reply);
                              setOpenSavedReplies(false);
                            }}
                            className="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {reply.reply}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2">
                      <button
                        onClick={() => {
                          setOpenCreateReplyModel(true);
                          setOpenSavedReplies(false);
                        }}
                        className="text-sm font-semibold text-primary-500"
                      >
                        + Create saved reply
                      </button>
                    </div>
                  </div>
                )}
                <ToolTip title="Saved Replies">
                  <Bookmark
                    onClick={() => setOpenSavedReplies(!openSavedReplies)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </ToolTip>
              </div>
              <label
                id="fileUpload"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50"
              >
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="*/*"
                  ref={fileInputRef}
                />
                <ToolTip title="Attatchment">
                  <Paperclip className="h-4 w-4" />
                </ToolTip>
              </label>
              <span
                onClick={() => setOpenEmojiPicker((prev) => !prev)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50"
              >
                <ToolTip title="Emojis">
                  <Smile className="h-4 w-4" />
                </ToolTip>
              </span>
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50">
                <ToolTip title="Calender">
                  <Images className="h-4 w-4" />
                </ToolTip>
              </span>
              <span onClick={() => startRecording()} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50">
                <ToolTip title="Voice note">
                  <Mic className="h-4 w-4" />
                </ToolTip>
              </span>
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50">
                <FilePlus className="h-4 w-4" />
              </span>
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#808080] transition-all duration-200 hover:bg-[#f3f3f3] hover:text-secondary-50">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <div>
              <Button onClick={(e: any) => {
                e.preventDefault();
                handleSendMessage();
              }}>
                <span>Send</span>
              </Button>
            </div>
          </div>
        </> : <JoinConversation />}
      </>}
    </div>
  );
}
