import React,{useState} from 'react'

function ChatProcess() {
    const[message, setMessage] = useState("");
    const[chatHistory, setChatHistory] = useState([]);
    const[loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if(!message.trim()) return;

        const token = localStorage.getItem("token");
        console.log(token);

        const userMessage = {sender: "user", text: message};
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try{
            const response = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                 credentials: "include",
                headers: {
                    "Content-Type": "application/json",
     },
                body: JSON.stringify({
                    message: userMessage.text
                })
            });

            if(!response.ok){
                throw new Error("Failed to get AI response");
            }

            const aiText = await response.text();

            const aiMessage = {sender: "ai", text: aiText};
            setChatHistory((prev) => [...prev, aiMessage]);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    };

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl flex flex-col h-[600px]">

    {/* Header */}
    <div className="bg-indigo-600 text-white text-xl font-semibold p-4 rounded-t-2xl">
      AI Chat
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`flex ${
            chat.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow ${
              chat.sender === "user"
                ? "bg-indigo-500 text-white rounded-br-none"
                : "bg-white text-gray-800 border rounded-bl-none"
            }`}
          >
            {chat.text}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-white border px-4 py-2 rounded-2xl text-sm shadow">
            AI is typing...
          </div>
        </div>
      )}
    </div>

    {/* Input Section */}
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={message}
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={sendMessage}
        className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition duration-200"
      >
        Send
      </button>
    </div>

  </div>
</div>
  );
};

export default ChatProcess;