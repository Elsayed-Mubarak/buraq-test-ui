"use client"
import React, { useState } from "react";

const ChatBox = () => {

// Initialize audio for sending and receiving messages
const sendSound = new Audio("./alternate_notification_sound.wav");
const receiveSound = new Audio("/sounds/receive.mp3");

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric",
});

const [messages, setMessages] = useState([
{
sender: "bot",
content: `Hi there! 👋
Welcome to ACME's Pizza 🍕, the finest pizza maker in India!

I'm Specter, and I'll help you with your pizza queries.
Before we get going I'd love to know your name?`,
},
]);
const [userInput, setUserInput] = useState("");

// Handle input change
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    };

    // Handle sending a message
    const sendMessage = () => {
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user's message to the messages list
    setMessages((prevMessages) => [
    ...prevMessages,
    { sender: "user", content: userInput },
    ]);

  

    sendSound.play();
    // Clear the input field
    setUserInput("");

    // Simulate bot's response (You can replace this logic with API calls)
    setTimeout(() => {
    const botReply = {
    sender: "bot",
    content: "That's great! Let me know how I can help you today. 😊",
    };
    setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 500); // Simulate a delay for the bot's reply
    };

    return (
    <div className="chatbox-container h-full  flex flex-col justify-between shadow-lg rounded-lg  max-w-md mx-auto">
        {/* Header */}
        <div className="chatbox-header bg-blue-600  p-4 rounded-lg  flex items-center space-x-3">
            <div className="bot-avatar bg-blue-300 border-2 border-white p-2  w-11 h-11 rounded-full">

                <img src="../../../../icon.png" width={99} alt="" />
            </div>
            <div className="bot-title text-white">
                <h3 className="text-lg font-light">Untitled Bot</h3>
            </div>
        </div>

        <div className="relative flex items-center my-4 px-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-xs">
                {formattedDate}
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>



        {/* Chat Messages */}
        <div className="chatbox-messages  flex-1  p-4 rounded-b-lg max-h-96 overflow-y-auto">
            {/* Render messages */}
            {messages.map((message, index) => (
            <div key={index} className={`message flex items-start space-x-2 mb-4 ${ message.sender==="user"
                ? "justify-end" : "" }`}>
                {/* Bot avatar for bot messages */}
                {message.sender === "bot" && (
                <div className=" w-[25px] h-[25px]">
                    <img src="../../../../icon.png" className="w-full" alt="" />
                </div>
                )}
                <div className={`message-content p-3 rounded-md text-sm shadow-sm ${ message.sender==="bot"
                    ? "bg-white text-gray-800" : "bg-blue-600 text-white" }`}>
                    {message.content}
                </div>
            </div>
            ))}
        </div>

        {/* Chat Input (Footer) */}
        <div className="chatbox-footer   rounded-b-lg">
            {/* Input Section */}
            <div className="flex items-center space-x-2 border-0  rounded-b-lg  py-2 px-2 bg-gray-100 shadow-sm">
                <input type="text" placeholder="Send a message" value={userInput} onChange={handleInputChange}
                    onKeyPress={(event)=> {
                if (event.key === "Enter") {
                sendMessage();
                }
                }}
                className="flex-1 bg-inherit border-1 border-gray-200 rounded-lg focus:ring-0text-sm outline-none
                placeholder-gray-400 hover:border-blue-700"
                />
                <button className="emoji-button text-gray-500 hover:text-gray-700">
                    😊
                </button>
                <button onClick={sendMessage} className="send-button -rotate-45 text-gray-600 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.5 21l19-9-19-9v7l14 2-14 2z" />
                    </svg>
                </button>
            </div>

            {/* Branding Section with Wave Animation */}
            <div style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#888",
          marginTop: "8px",
          padding : "8px",
        }}>
                {" "}
                <span style={{ color: "#007BFF", fontWeight: "400" , letterSpacing : "2px"}}>
                    {"⚡ by Buraq AI".split("").map((char, index) => (
                    <span key={index} style={{
                display: "inline-block",
                animation: `wave 1.2s infinite`,
                animationDelay: `${index * 0.1}s`,
              }}>
                        {char}
                    </span>
                    ))}
                </span>
            </div>

            {/* Define @keyframes in a <style>
                tag */
                }

                <style> {
                    ` @keyframes wave {

                        0%,
                        60%,
                        100% {
                            transform: translateY(0);
                        }

                        30% {
                            transform: translateY(-5px);
                        }
                    }

                    `
                }
            </style>
        </div>

    </div>
    );
    };

    export default ChatBox;