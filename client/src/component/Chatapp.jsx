import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatapp.css";

function Chatapp() {
const [question, setQuestion] = useState("");
const [data, setData] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


if (!question.trim()) return;

try {
  setLoading(true);

  const res = await axios.post("http://localhost:8000/ask", {
    question,
  });

  console.log(res.data);

  if (res.data.success) {
    setData(res.data.output);
  }
} catch (error) {
  console.error("Error:", error);
  setData("Failed to get response from server.");
} finally {
  setLoading(false);
}


};

return ( <div className="chat-container"> <h1 className="chat-title">Gemini AI Chat Bot</h1>


  <div className="chat-grid">
    <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        className="chat-textarea"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button type="submit" className="chat-button">
        {loading ? "Generating..." : "Create Content"}
      </button>
    </form>

    <div className="chat-response">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  </div>
</div>


);
}

export default Chatapp;
