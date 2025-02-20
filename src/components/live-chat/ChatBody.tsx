"use client";
import {
  BookmarkIcon,
  UserCircleIcon,
  XMarkIcon,

} from "@heroicons/react/24/solid";
import { Check, CheckCheck, CircleAlert, List, Phone, SquareArrowOutUpRight, Undo } from "lucide-react";
import { timeElapsed } from "@/utils/timeElapsed";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "@/components/live-chat/Button";
import { useChatStore } from "@/stores/useChatStore";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getFullName } from "@/utils/getFullName";
import ToolTip from "../shared/ToolTip";
import { useAuthStore } from "@/stores/useAuthStore";
/* eslint-disable @next/next/no-img-element */
const formatTextRespectNewLine = (text: any) => {
  return text.split("\n").map((line: any, index: any) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const renderIcon = (type: string) => {
  switch (type) {
    case "QUICK_REPLY":
      return <Undo className="h-4 w-4" />;
    case "URL":
      return <SquareArrowOutUpRight className="h-4 w-4" />;
    case "PHONE_NUMBER":
      return <Phone className="h-4 w-4" />;
    default:
      return null;
  }
};

type Props = {
  addSavedReply: (title: string, message: string) => void;
};
export default function ChatBody({ addSavedReply: addSavedReply }: Props) {
  const authUser = useAuthStore((state) => state.authUser);
  const { activeconversations, selectedConversation } = useChatStore();

  const [replyMessageTitle, setReplyMessageTitle] = useState("");
  const [replyMessageText, setReplyMessageText] = useState("");

  const [openCreateReplyTitleModel, setOpenCreateReplyTitleModel] =
    useState(false);
  const creatReplyTitleModelRef = useOutsideClick(() =>
    setOpenCreateReplyTitleModel(false),
  );

  const scrollRef: any = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeconversations, selectedConversation]);

  return (
    <div
      className="scrollbar-thumb-rounded-full overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-primary-50"
      ref={scrollRef}
    >
      {openCreateReplyTitleModel && (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.1)]">
          <div
            ref={creatReplyTitleModelRef}
            className="w-[350px] rounded-xl bg-white shadow-md"
          >
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
              <div className="text-xl font-semibold text-[#3a3a3a]">
                Create Saved Reply
              </div>
              <span
                onClick={() => setOpenCreateReplyTitleModel(false)}
                className="cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6 text-[#808080]" />
              </span>
            </div>
            <div className="border-b border-primary-50 px-6 py-5">
              <div className="group mb-5">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="title"
                >
                  Name
                </label>
                <input
                  placeholder="Title..."
                  type="text"
                  value={replyMessageTitle}
                  onChange={(e) => setReplyMessageTitle(e.target.value)}
                  className="block w-full border border-primary-50 p-[10px]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-5">
              <Button
                onClick={() => {
                  addSavedReply(
                    replyMessageTitle,
                    replyMessageText,
                  );
                  setOpenCreateReplyTitleModel(false);
                }}
                type={!replyMessageTitle ? "disable" : ""}
              >
                <span>Create</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-end gap-2 px-4 pb-6">
        {selectedConversation?.messages?.map((msg: any, index: any) =>
          msg.from !== selectedConversation.participants.from ? (
            <Fragment key={`${msg._id}-${index}`}>
              {msg.type === "system" ? <div className=" relative w-full h-[30px] flex items-center justify-center my-3">
                <div className="absolute z-10 top-[50%] translate-y-[-50%] w-full h-[1px] bg-[#e4e4e4]"></div>
                <div className="w-fit z-30 bg-[#e9e9fd] text-primary-500 text-[10px] py-[2px] px-[10px] rounded-md">
                  {msg.to === authUser._id
                    ? `You ${msg.content} Yourself`
                    : msg.from === authUser._id
                      ? `You ${msg.content} ${msg.from === msg.to ? "yourself" : getFullName(msg.to)}`
                      : `${getFullName(msg.from)} ${msg.content} ${msg.from === msg.to ? "themselfs" : getFullName(msg.to)}`}
                  {" "}&#9679;{" "}{timeElapsed(msg.updatedAt)}
                </div>
              </div> :
                <div key={index} className="flex w-full items-end gap-1 self-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f3f3] text-sm font-semibold text-[#808080]">
                    AM
                  </div>

                  <div className="w-fit max-w-[75%] rounded-xl rounded-bl-none bg-[#f3f3f3] p-3 text-sm text-[#3a3a3a]">
                    {msg.type === "text" && <div>{msg.content}</div>}
                    {msg.type === "image" && (
                      <div className="relative">
                        <img
                          src={msg.attachmentUrl}
                          alt="Image message"
                          className="object-cover max-w-full h-auto"
                        />
                      </div>
                    )}
                    {msg.type === "sticker" && (
                      <div className="relative">
                        <Image
                          width={200}
                          height={200}
                          src={msg.attachmentUrl}
                          alt="Image message"
                        />
                      </div>
                    )}

                    {msg.type === "document" && (
                      <div>
                        <a
                          href={msg.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {msg.content}
                        </a>
                      </div>
                    )}

                    {msg.type === "video" && (
                      <div>
                        <video controls className="max-w-[450px] h-auto">
                          <source src={msg.attachmentUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {msg.type === "voice" && (
                      <div>
                        <audio controls>
                          <source src={msg.attachmentUrl} type="audio/mpeg" />
                          <source src={msg.attachmentUrl} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    <div className="text-right text-[10px]">
                      {timeElapsed(msg?.updatedAt)}
                    </div>
                  </div>
                </div>}
            </Fragment>
          ) : (
            <div key={`${msg._id}-${index}`} className="group flex items-end justify-end gap-1">
              <div className="relative max-w-[75%] text-wrap break-words rounded-xl rounded-bl-none bg-primary-100 p-3 text-sm text-[#3a3a3a]">
                {msg.type === "template" && <div className="bg-white pt-5 px-2 rounded-lg">
                  <div className="mb-2">
                    {msg.content?.components?.map((component: any) =>
                      <>
                        {component.type === "HEADER" && component.format === "TEXT" && <div className="text-black text-wrap p-1 break-words text-[12px] font-black">{component.text}</div>}
                        {component.type === "HEADER" && component.format === "IMAGE" && <div className="p-1">
                          <img className="block w-full h-auto rounded-[3px]" src={component?.example?.header_handle[0]} alt="image" />
                        </div>}
                        {component.type === "HEADER" && component.format === "DOCUMENT" && <div className="p-1 text-xs bg-[#f7f7f7] w-full">
                          {component?.example?.header_handle[0]}
                        </div>}
                        {component.type === "HEADER" && component.format === "VIDEO" && <div className="p-1">
                          <video controls>
                            <source src={component?.example?.header_handle[0]} type="video/mp4" />
                            <source src={component?.example?.header_handle[0]} type="video/webm" />
                            <source src={component?.example?.header_handle[0]} type="video/ogg" />
                          </video>
                        </div>}
                      </>
                    )}
                  </div>
                  <p className="mb-2">
                    {msg.content?.components?.map((component: any) =>
                      component?.type === "BODY" ? formatTextRespectNewLine(component?.text) : null
                    )}
                  </p>
                  <p className="mb-2">
                    {msg.content?.components?.map((component: any) =>
                      component?.type === "FOOTER" ? component?.text : null
                    )}
                  </p>
                  <div className="flex flex-col gap-1">
                    {msg.content?.components?.map((component: any) =>
                      component?.type === "BUTTONS" ? component.buttons.map((btn: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 justify-center cursor-pointer text-[#219bc0] test-sm border-t border-[#f3f3f3] text-xs py-[6px]">
                          <span>
                            {renderIcon(btn.type)}
                          </span>
                          <span>{btn.text}</span>
                        </div>
                      )) : null
                    )}

                  </div>
                </div>}
                {msg.type === "text" && <div>{msg.content}</div>}
                {msg.type === "image" && (
                  <div className="relative">
                    <img
                      src={msg.attachmentUrl}
                      alt="Image message"
                      className="object-cover max-w-full h-auto"
                    />
                  </div>
                )}
                {msg.type === "sticker" && (
                  <div className="relative">
                    <Image
                      width={200}
                      height={200}
                      src={msg.attachmentUrl}
                      alt="Image message"
                    />
                  </div>
                )}

                {msg.type === "document" && (
                  <div>
                    <a
                      href={msg.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {msg.content}
                    </a>
                  </div>
                )}

                {msg.type === "video" && (
                  <div>
                    <video controls width={350} height={250}>
                      <source src={msg.attachmentUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {msg.type === "audio" && (
                  <div>
                    <audio controls>
                      <source src={msg.attachmentUrl} type="audio/mpeg" />
                      <source src={msg.attachmentUrl} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {msg.type === "interactive" && (
                  <div>
                    <div className="flex flex-col gap-1">
                      {msg.content.type === "list" && <span>{msg.content.action.button}</span>}
                      <span>{msg.content?.header?.text}</span>
                      <span>{msg.content?.body?.text}</span>
                      <span>{msg.content?.footer?.text}</span>
                    </div>
                    <div className="my-3">
                      {
                        msg.content.type === "button" && <div className="flex items-center gap-2">
                          {msg.content?.action?.buttons?.map((btn: any, index: any) => (
                            <button key={index} className="py-2 px-3 bg-white rounded-md min-w-[120px]">{btn.reply.title}</button>
                          ))}
                        </div>
                      }
                      {
                        msg.content.type === "list" &&
                        msg.content?.action?.sections?.map((btn: any, sectionIndex: number) => (
                          <div key={sectionIndex}>
                            <div>{btn.title}</div>
                            {btn.rows.map((item: any, rowIndex: number) => (
                              <div key={`${sectionIndex}-${rowIndex}`}>
                                <p className="text-[12px]">{item.title}</p>
                                <p className="text-[12px]">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        ))
                      }

                    </div>
                  </div>
                )}
                <div className="flex items-center gap-1 text-left text-[10px]">
                  <span>
                    {msg.status === "sent" && <Check className="h-4 w-4" />}
                    {msg.status === "accepted" && <CheckCheck className="h-4 w-4" />}
                    {msg.status === "received" && <CheckCheck className="h-4 w-4" />}
                    {msg.status === "delivered" && <CheckCheck className="h-4 w-4" />}
                    {msg.status === "read" && <CheckCheck className="h-4 w-4 text-[#53bdeb]" />}
                    {msg.status === "failed" &&
                      <ToolTip title="failed">
                        <CircleAlert className="h-4 w-4 text-[#f00]" />
                      </ToolTip>
                    }
                  </span>
                  <span>{timeElapsed(msg?.updatedAt)}</span>
                </div>
                <div
                  onClick={() => {
                    setReplyMessageText(msg.content);
                    setOpenCreateReplyTitleModel(true);
                  }}
                  className={`absolute left-[-30px] top-[50%] hidden translate-y-[-50%] group-hover:block`}
                >
                  <BookmarkIcon
                    stroke="#092445"
                    strokeWidth={2}
                    className="h-4 w-4 cursor-pointer text-transparent"
                  />
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-[#808080] ">
                <UserCircleIcon className="h-8 w-8 text-[#e2e2e2]" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

