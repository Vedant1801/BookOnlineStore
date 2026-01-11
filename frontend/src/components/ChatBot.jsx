import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // messages can include { sender, text, action? }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // push user message
    const userMsg = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      // If server returns non-200, handle gracefully
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", res.status, errorText);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Server error, please try again." },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // backend may return { reply, action } where action can be { type: 'navigate', target: '/books?category=history' }
      const botMsg = { sender: "bot", text: data.reply || "Sorry, no reply.", action: data.action || null };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error, please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // helper to render a bot message including an optional action button
  function BotMessage({ msg }) {
    return (
      <div className="flex flex-col">
        <div className="px-3 py-2 rounded-xl text-sm bg-gray-100 text-gray-800 max-w-[18rem] break-words">
          {msg.text}
        </div>

        {msg.action && msg.action.type === "navigate" && msg.action.target && (
          <div className="mt-2">
            <button
              onClick={() => navigate(msg.action.target)}
              className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600"
            >
              Open {msg.action.target}
            </button>
          </div>
        )}

        {/* other action types can be added here (e.g., filter, openModal) */}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border p-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-600 text-lg">📚 BookBot</h3>
            <X
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto max-h-64 border rounded-lg p-2"
          >
            {messages.length === 0 && (
              <div className="text-gray-400 text-sm">Ask me about books, pages, availability...</div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-1 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "user" ? (
                  <div className="px-3 py-2 rounded-xl text-sm bg-blue-500 text-white max-w-[18rem] break-words">
                    {msg.text}
                  </div>
                ) : (
                  <BotMessage msg={msg} />
                )}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm text-center">Thinking...</div>
            )}
          </div>

          <div className="flex mt-2">
            <input
              type="text"
              className="flex-1 border rounded-l-xl p-2 text-sm focus:outline-none"
              placeholder="Ask about books..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-500 text-white px-3 rounded-r-xl"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <MessageCircle />
        </button>
      )}
    </div>
  );
}
