"use client";
import toast from "react-hot-toast";
import ChatBox from "../../components/reactflow/test-page/ChatBox";

export default function Page() {
  // Function to copy the current URL
  const handleCopyLink = () => {
    const currentUrl = window.location.href; // Get the current URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full p-5">
      {/* Main Content */}
      <div className="hidden md:flex flex-col items-center justify-center min-h-screen px-6 bg-white text-center md:w-2/3">
        {/* Header with Logo */}
        <header className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
            <img src="../../../icon.png" alt="logo" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-700">Buraq</h1>
        </header>

        {/* Title Section */}
        <main className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            You are having a conversation with{" "}
            <span className="font-semibold">"Website chatbot"</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Want to create your own?{" "}
            <a
              href="https://app.buraq.ai/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Get started
            </a>
          </p>
        </main>

        {/* Share Section */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Share this bot</span>
          <button
            onClick={handleCopyLink}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300"
            title="Copy link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 8h2a2 2 0 012 2v4m-6-4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ChatBox */}
      <div className="h-[85vh] w-full md:w-[30%] sticky">
        <ChatBox />
      </div>
    </div>
  );
}
