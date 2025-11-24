import React from "react";
interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
}
const ChatBubble: React.FC<ChatMessage> = ({ id, text, sender }) => {
  return (
    <div
      key={id}
      dir="rtl"
      className={`mb-2 ${sender === "user" ? "justify-start" : "justify-end"}`}
    >
      <span
        dir="rtl"
        className={`inline-block p-2 rounded-lg whitespace-pre-wrap   ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default ChatBubble;
