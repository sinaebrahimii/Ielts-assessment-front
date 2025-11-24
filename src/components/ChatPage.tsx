import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSend = async (prompt: string) => {
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: prompt,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const payload = { prompt: newUserMessage.text };
    console.log("User prompt:", prompt);

    try {
      setLoading(true); // Set loading before fetch
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result);
      const botResponseText = data.result;
      console.log("Bot response:", botResponseText);

      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: "متأسفیم، خطایی در پردازش درخواست شما رخ داد.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false); // Ensure loading is reset in all cases
    }
  };

  return (
    <div
      className="flex flex-col w-10/12 h-screen mx-auto"
      style={{ direction: "rtl", fontFamily: "Arial, sans-serif" }}
    >
      {/* Chat messages area */}
      <div className="flex-1 flex-col space-y-4 overflow-y-auto p-4 w-full px-3.5 mx-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            پیام‌های چت در اینجا نمایش داده می‌شوند...
          </p>
        ) : (
          messages.map((message) => (
            <ChatBubble
              sender={message.sender}
              id={message.id}
              text={message.text}
              key={message.id}
            />
          ))
        )}
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <BeatLoader color="#3b82f6" size={15} />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Input at the bottom */}
      <div className="pt-2 pb-5 bg-gray-200">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
