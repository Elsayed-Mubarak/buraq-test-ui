import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const LiveChatSidebar = () => {
  const [openLabel, setOpenLabel] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [labels, setLabels] = useState([]);
  const [views, setViews] = useState([]);
  const [label, setLabel] = useState("");
  const [view, setView] = useState("");

  const postData = async (data, url) => {
    if (data) {
      try {
        await axios.post(url, { name: data });
      } catch (error) {
        console.error("Error posting name:", error);
      }
    } else {
      console.warn("No name available to post");
    }
    getData();
  };

  function getData() {
    const fetchData = async (url, setterFunc) => {
      try {
        const response = await axios.get(url, setterFunc);
        setterFunc(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("http://localhost:8000/api/get-views", setViews);
    fetchData("http://localhost:8000/api/get-labels", setLabels);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <nav className="px-2">
        <h2 className="text-xl font-semibold p-4 text-[#092455]">Live Chat</h2>

        <Link href="/live-chat/you">
          <div className="text-sm flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer">
            <span>You</span>
            <span>0</span>
          </div>
        </Link>
        <Link href="/live-chat/assigned">
          <div className="text-sm mb-1 flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer">
            <span>Assigned</span>
            <span>0</span>
          </div>
        </Link>
        <div className="text-sm mb-1 flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer">
          <span>Unassigned</span>
          <span>0</span>
        </div>
        <div className="text-sm mb-1 flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer">
          <span>Closed</span>
          <span>0</span>
        </div>
        <div className="text-sm mb-1 flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer">
          <span>SLA Breached</span>
          <span>0</span>
        </div>
        <div className="mt-4">
          {/* New Views and Labels Section */}
          <button
            onClick={() => setOpenViews(!openViews)}
            className="text-[13px] font-semibold w-full mb-1 flex items-center justify-between py-2 px-5 rounded-md cursor-pointer"
          >
            <span>VIEWS</span>
            <span>{openViews ? "+" : "-"}</span>
          </button>
          {openViews && (
            <>
              {views.map((view) => (
                <div
                  key={view._id}
                  className="text-sm flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {view.name}
                </div>
              ))}
              <input
                className="border border-[#e4e4e4] rounded py-1 px-2 ml-2 my-1"
                type="text"
                value={view}
                onChange={(e) => setView(e.target.value)}
              />
              <button
                className="text-blue-600 ml-2"
                onClick={() => {
                  setView("");
                  postData(view, "http://localhost:8000/api/add-view");
                }}
              >
                + add view
              </button>
            </>
          )}

          <button
            onClick={() => setOpenLabel(!openLabel)}
            className="text-[13px] font-semibold w-full mb-1 flex items-center justify-between py-2 px-5 rounded-md cursor-pointer"
          >
            <span>LABELS</span>
            <span>{openLabel ? "+" : "-"}</span>
          </button>
          {openLabel && (
            <>
              {labels.map((label) => (
                <div
                  key={label._id}
                  className="text-sm flex items-center justify-between py-2 px-5 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {label.name}
                </div>
              ))}
              <input
                className="border border-[#e4e4e4] rounded py-1 px-2 ml-2 my-1"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <button
                className="text-blue-600 ml-2"
                onClick={() => {
                  postData(label, "http://localhost:8000/api/add-label");
                  setLabel("");
                }}
              >
                + add label
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="p-4">
        <Link
          href={"/livechatsidebar/new"}
          className="bg-blue-600 text-white rounded p-2 w-full flex items-center"
        >
          <span className="mr-2">+</span> Add a New Conversation
        </Link>
      </div>

      {/* Start Conversation Modal */}
      {/* <StartConversationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStartConversation={handleStartConversation}
      /> */}
    </div>
  );
};

export default LiveChatSidebar;
