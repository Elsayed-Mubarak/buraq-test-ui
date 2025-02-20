"use client"
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

interface SendEmailComponentProps {
  handleGetEventData: (key: string, value: any) => void;
}

const SendEmailComponent: React.FC<SendEmailComponentProps> = ({
  handleGetEventData,
}) => {
  const [message, setMessage] = useState<string>("");

  // Send the body message without <p> tags whenever it changes
  useEffect(() => {
    const strippedMessage = message.replace(/<\/?p>/g, ""); // Remove <p> and </p> tags
    handleGetEventData("body", strippedMessage);
  }, [message]);
  

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  // const quillRef = useRef<ReactQuill>(null);

  // const handleEmojiClick = (emojiData: EmojiClickData) => {
  //   const editor = quillRef.current?.getEditor();
  //   if (editor) {
  //     const cursorPosition = editor.getSelection()?.index || 0;
  //     editor.insertText(cursorPosition, emojiData.emoji);
  //     setShowEmojiPicker(false);
  //   }
  // };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <div className="w-80 bg-white p-6 shadow-lg flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Send an email</h2>

      <label className="block text-sm font-bold text-gray-700 mb-1">
        Send an email to
      </label>
      <input
        type="email"
        name="email"
        placeholder="name@example.com"
        onChange={(event) =>
          handleGetEventData(event.target.name, event.target.value)
        }
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-sm font-bold text-gray-700 mb-1">
        Subject
      </label>
      <input
        type="text"
        name="subject"
        placeholder="Lead generated via Buraq"
        onChange={(event) =>
          handleGetEventData(event.target.name, event.target.value)
        }
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-sm font-bold text-gray-700 mb-1">Body</label>
      {/* <ReactQuill
        ref={quillRef}
        value={message}
        onChange={setMessage}
        modules={modules}
        theme="snow"
        placeholder="Write your message here ..."
      /> */}
{/* 
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="bg-gray-200 hover:bg-gray-300 p-1 rounded mt-4"
      >
        😊 Emoji
      </button> */}

      {/* {showEmojiPicker && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} emojiStyle="native" />
        </div>
      )} */}
    </div>
  );
};

export default SendEmailComponent;
