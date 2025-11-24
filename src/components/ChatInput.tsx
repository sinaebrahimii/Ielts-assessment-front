import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (prompt: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSend(prompt.trim());
      setPrompt("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border rounded-xl px-2 py-2 shadow-md bg-white w-full mx-auto mb-3"
    >
      <textarea
        dir="rtl"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="پیام خود را بنویسید ...."
        className="flex-1 px-3  py-2 text-lg focus:outline-none text-slate-600 resize-none h-24"
      />
      <button
        type="submit"
        className="ml-2 p-3 rounded-full text-white bg-blue-600 hover:bg-blue-900 transition"
        aria-label="Send"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
