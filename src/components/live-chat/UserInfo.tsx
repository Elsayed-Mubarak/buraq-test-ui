"use client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  InboxIcon,
  EllipsisHorizontalCircleIcon,
  Squares2X2Icon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  updateClient as updateClientApi,
  blockContact as blockContactApi,
  unblockContact as unblockContactApi,
  getClientInfoByConversationId
  // getBlockedContacts as getBlockedContactsApi,
} from "@/service/clientServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "@/stores/useChatStore";
import { ChevronDown, UserRoundMinus } from "lucide-react";
import UserNotes from "./UserNotes";
import UserLabels from "./UserLabels";
import UserRelatedConversations from "./UserRelatedConversations";

type Props = {
  openInfo: boolean;
  setOpenInfo: (value: boolean) => void;
};
export default function UserInfo({ openInfo, setOpenInfo }: Props) {
  const contactInfo = useChatStore((state: any) => state.contactInfo);
  const { selectedConversation } = useChatStore();
  const queryClient = useQueryClient();

  const [openUserInfo, setOpenUserInfo] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditPhone, setOpenEditPhone] = useState(false);
  const [openEditContactCreated, setOpenEditContactCreated] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientcreateContactBy, setClientcreateContactBy] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");


  const { data: clientInformation } = useQuery({
    queryKey: ["clientInformation", selectedConversation._id],
    queryFn: () => getClientInfoByConversationId(selectedConversation?._id),
    enabled: !!selectedConversation?._id,
  });

  const { mutate: updateClient } = useMutation({
    mutationFn: updateClientApi,
    onSuccess: () => {
      setOpenEditName(false);
      setOpenEditPhone(false);
      setOpenEditEmail(false);
      setOpenEditContactCreated(false);
      queryClient.invalidateQueries({ queryKey: ["clientInformation"] });
    },
    onError: (err) => console.log(err),
  });

  function updateClientInfo(data: any) {
    if (!data) return;
    updateClient({ clientId: clientInformation?._id, ...data });
  }

  async function handleBlockContact() {
    if (!contactInfo?._id) {
      toast.error("Contact ID is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await blockContactApi({
        clientId: contactInfo._id,
      });
      toast.success(response.message || "Contact blocked successfully!");
      setIsBlocked(true); // Update the UI state
    } catch (error: any) {
      toast.error(error.message || "Failed to block contact.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnblockContact() {
    if (!contactInfo?._id) {
      toast.error("Contact ID is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await unblockContactApi({ clientId: contactInfo._id });
      toast.success(response.message || "Contact unblocked successfully!");
      setIsBlocked(false); // Update the UI state
    } catch (error: any) {
      toast.error(error.message || "Failed to unblock contact.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className={`transition-all duration-200 ${openInfo ? "right-0" : "right-[-357px]"} border-l border-primary-50 absolute top-0  z-[10] bg-white h-full w-[357px] scrollbar-thumb-rounded-full  select-none overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-primary-50`}>
      {openInfo && <div className="h-[60px] p-5 flex justify-end 2xl:hidden border-b border-primary-50">
        <UserRoundMinus onClick={() => setOpenInfo(false)} className="text-secondary-50 cursor-pointer" />
      </div>}
      <div className="border-parimary-50 cursor-pointer border-b">
        <div className="flex items-center justify-between p-5">
          <div
            onClick={() => setOpenUserInfo(!openUserInfo)}
            className="flex-1 text-sm font-semibold uppercase text-[#3a3a3a]"
          >
            user information
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOpenUserInfo(true);
                setEditMode(!editMode);
              }}
              className="text-sm font-semibold text-primary-600"
            >
              {editMode ? "Save" : "Edit"}
            </button>
            <span onClick={() => setOpenUserInfo(!openUserInfo)}>
              <ChevronDown className={`${openUserInfo ? "rotate-180" : ""} transition-all duration-300 h-4 w-4 text-secondary-50`} />
            </span>
          </div>
        </div>
        <div className="bg-white-500 flex items-center gap-2 p-2 rounded-md">
          {isBlocked ? (
            <button
              onClick={handleUnblockContact}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Unblocking..." : "Unblock"}
            </button>
          ) : (
            <>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (Optional)"
                className="border p-1 text-sm rounded w-36" /* Adjusted input width */
              />
              <button
                onClick={handleBlockContact}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Blocking..." : "Block"}
              </button>
            </>
          )}
        </div>

        {openUserInfo && (
          <div className="overflow-hidden px-2 transition-all duration-200">
            <div className="group grid h-[36px] grid-cols-[30px_100px_1fr_30px] items-center rounded px-5 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <UserIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Name</div>
              {!openEditName ? (
                <>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.name}
                  </div>
                  {editMode ? (
                    <span
                      onClick={() => setOpenEditName(true)}
                      className="text-black hover:text-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="hidden group-hover:block">
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    </span>
                  )}
                </>
              ) : (
                <div className="col-span-2 flex h-[34px] items-center rounded-md border border-[#808080] pr-1">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="h-full w-full border-none bg-transparent px-0 py-0 pl-1 font-semibold text-secondary-50 outline-none focus:ring-0"
                  />
                  <span
                    onClick={() => {
                      updateClientInfo({ name: clientName });
                    }}
                    className="text-primary-500"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </span>
                </div>
              )}
            </div>
            <div className="group grid h-[36px] grid-cols-[30px_100px_1fr_30px] items-center rounded px-5 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <EnvelopeIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Email</div>
              {!openEditEmail ? (
                <>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.email || ""}
                  </div>
                  {editMode ? (
                    <span
                      onClick={() => setOpenEditEmail(true)}
                      className="text-black hover:text-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="hidden group-hover:block">
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    </span>
                  )}
                </>
              ) : (
                <div className="col-span-2 flex h-[34px] items-center rounded-md border border-[#808080] pr-1">
                  <input
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    type="text"
                    className="h-full w-full border-none bg-transparent px-0 py-0 pl-1 font-semibold text-secondary-50 outline-none focus:ring-0"
                  />
                  <span
                    onClick={() => {
                      updateClientInfo({ email: clientEmail });
                    }}
                    className="text-primary-500"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </span>
                </div>
              )}
            </div>
            <div className="group grid h-[36px] grid-cols-[30px_100px_1fr_30px] items-center rounded px-5 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <PhoneIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Phone</div>
              {!openEditPhone ? (
                <>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.phone}
                  </div>
                  {editMode ? (
                    <span
                      onClick={() => setOpenEditPhone(true)}
                      className="text-black hover:text-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="hidden group-hover:block">
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    </span>
                  )}
                </>
              ) : (
                <div className="col-span-2 flex h-[34px] items-center rounded-md border border-[#808080] pr-1">
                  <input
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    type="text"
                    className="h-full w-full border-none bg-transparent px-0 py-0 pl-1 font-semibold text-secondary-50 outline-none focus:ring-0"
                  />
                  <span
                    onClick={() => {
                      updateClientInfo({ phone: clientPhone });
                    }}
                    className="text-primary-500"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </span>
                </div>
              )}
            </div>
            <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <LinkIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Page url</div>
              <div className="font-semibold text-secondary-50">
                {contactInfo?.pageUrl}
              </div>
              <span className="hidden group-hover:block">
                {!editMode && (
                  <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                )}
              </span>
            </div>
            <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <InboxIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Channel</div>
              <div className="font-semibold text-secondary-50">
                {clientInformation?.channel}
              </div>
              <span className="hidden group-hover:block">
                {!editMode && (
                  <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                )}
              </span>
            </div>
            <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <EllipsisHorizontalCircleIcon className="h-4 w-4" />
              </span>
              <div className="font-semibold">Bot</div>
              <div className="font-semibold text-secondary-50">
                Agent initiated
              </div>
              <span className="hidden group-hover:block">
                {!editMode && (
                  <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                )}
              </span>
            </div>
            <div className="group grid h-[36px] grid-cols-[30px_100px_1fr_30px] items-center rounded px-5 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
              <span>
                <Squares2X2Icon className="h-4 w-4" />
              </span>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                Contact created by
              </div>
              {!openEditContactCreated ? (
                <>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.contactCreatedBy}
                  </div>
                  {editMode ? (
                    <span
                      onClick={() => setOpenEditContactCreated(true)}
                      className="text-black hover:text-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="hidden group-hover:block">
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    </span>
                  )}
                </>
              ) : (
                <div className="col-span-2 flex h-[34px] items-center rounded-md border border-[#808080] pr-1">
                  <input
                    value={clientcreateContactBy}
                    onChange={(e) => setClientcreateContactBy(e.target.value)}
                    type="text"
                    className="h-full w-full border-none bg-transparent px-0 py-0 pl-1 font-semibold text-secondary-50 outline-none focus:ring-0"
                  />
                  <span
                    onClick={() => {
                      updateClientInfo({
                        contactCreatedBy: clientcreateContactBy,
                      });
                    }}
                    className="text-primary-500"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </span>
                </div>
              )}
            </div>

            {showMore && (
              <>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    City
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.city}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    State
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {contactInfo?.state}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    Zip Code
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.zipCode}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    Country code
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.countryCode}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    IP address
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.ipAddress}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    Time zone
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.timeZone}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    Borwser
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.browser}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    Borwser language
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.browserLanguage}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
                <div className="group grid grid-cols-[30px_100px_1fr_30px] rounded px-5 py-2 text-sm text-[#6d6d6d] hover:bg-[#f3f3f3]">
                  <span>
                    <Squares2X2Icon className="h-4 w-4" />
                  </span>
                  <div className="overflow-hidden text-nowrap font-semibold">
                    OS
                  </div>
                  <div className="font-semibold text-secondary-50">
                    {clientInformation?.os}
                  </div>
                  <span className="hidden group-hover:block">
                    {!editMode && (
                      <ClipboardDocumentIcon className="h-4 w-4 text-primary-500" />
                    )}
                  </span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-primary-500">
              <span className="text-xl">+</span>
              <button>Add detail</button>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-black">
              {showMore ? (
                <span>
                  <ChevronUpIcon className="h-4 w-4" />
                </span>
              ) : (
                <span>
                  <ChevronDownIcon className="h-4 w-4" />
                </span>
              )}
              <button onClick={() => setShowMore(!showMore)}>
                Show {showMore ? "less" : "more"}
              </button>
            </div>
          </div>
        )}
      </div>
      <UserNotes clientInformation={clientInformation} />
      <UserLabels clientInformation={clientInformation} />
      <UserRelatedConversations clientInformation={clientInformation} />
    </div>
  );
}
