import React, { useState, useRef, useEffect } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface SendWatsappMessageComponentProps {
  handleGetEventData?: (key: string, value: any) => void;
}

const SendWatsappMessageComponent: React.FC<SendWatsappMessageComponentProps> = ({
  handleGetEventData,
}) => {
  const [message, setMessage] = useState<string>("");
  const [strippedMessage, setStrippedMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  // const quillRef = useRef<ReactQuill>(null);

  // Remove <p> tags when message changes
  useEffect(() => {
    const cleanedMessage = message.replace(/<\/?p>/g, ""); // Strip <p> and </p> tags
    setStrippedMessage(cleanedMessage);

    // Optionally pass cleaned message to the parent component if needed
    if (handleGetEventData) {
      handleGetEventData("body", cleanedMessage);
    }
  }, [message]);

  // Handle emoji selection from emoji picker
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
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h4 className="text-md font-semibold mb-2">Write a message</h4>
      
      <label className="block text-sm font-bold text-gray-700 mb-1">
        Send a message to
      </label>
      <input
        type="text"
        name="to"
        placeholder="Enter phone number"
        onChange={(event) =>
          handleGetEventData && handleGetEventData(event.target.name, event.target.value)
        }
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Quill editor */}
      {/* <ReactQuill
        ref={quillRef}
        value={message}
        onChange={setMessage}
        modules={modules}
        theme="snow"
        placeholder="Write your message here..."
      /> */}

      {/* Emoji picker button */}
      {/* <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="bg-gray-200 hover:bg-gray-300 p-1 rounded mt-4"
      >
        😊 Emoji
      </button> */}

      {/* Conditional Emoji picker rendering */}
      {/* {showEmojiPicker && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} emojiStyle={"native"} width="100%" />
        </div>
      )} */}
    </div>
  );
};

export default SendWatsappMessageComponent;
