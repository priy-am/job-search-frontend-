"use client";

import { useState } from "react";
import Image from "next/image";

export default function ChatBot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm your assistant. Ask me anything!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const askBot = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuery("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/bot`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }
    );

    const data = await res.json();
    console.log(data)
    const botReply = { role: "bot", content: data.message };
    setMessages((prev) => [...prev, botReply]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6  px-3 pt-4 rounded-3xl  shadow-lg z-50  transition"
      >
        <Image src={"/chatbot.svg"} alt="Bot" width={45} height={45} />
      </button>

      {showChat && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[90vw] sm:w-96 max-h-[80vh] bg-white border rounded-xl shadow-xl z-[9999] flex flex-col p-3">
          {/* Header */}
          <div className="bg-[#3c65f5] text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
            <h2 className="text-lg font-semibold">Ask the Bot</h2>
            <button onClick={() => setShowChat(false)} className="text-xl">
              ×
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] w-fit  p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-[#dceafaf0] text-right self-end ml-auto"
                    : "bg-orange-100 text-left"
                }`}
              >
                <span className="block text-sm text-gray-800 whitespace-pre-wrap">
                  {msg.content}
                </span>
              </div>
            ))}

            {loading && (
              <div className="bg-orange-100 p-3 pr-4 rounded-lg max-w-[80%] w-fit text-left">
                {/* <span className="text-sm text-gray-500 italic">
                  Bot is typing...
                </span> */}
                <div className="flex space-x-1 ml-2">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`dot bg-gray-400 w-2 h-2 rounded-full animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex mt-4 gap-2">
            <input
              type="text"
              placeholder="Ask about any job related query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askBot()}
              className="flex-1 p-2 border rounded text-sm"
            />

            <button
              onClick={askBot}
              className="bg-[#3c65f5] text-white px-3 py-2 rounded text-sm"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
