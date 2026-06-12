import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatapp.css";
import bgImage from "../assets/Swaminarayan-Bhagwan.jpg";

function Chatapp() {
const [question, setQuestion] = useState("");
const [data, setData] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


if (!question.trim()) return;

try {
  setLoading(true);

  const res = await axios.post("https://shikshapatri-ai-server.onrender.com/ask", {
    question,
  });

  if (res.data.success) {
    setData(res.data.output);
  } else {
    setData("No response received.");
  }
} catch (error) {
  console.error(error);
  setData("Failed to connect to server.");
} finally {
  setLoading(false);
}


};

return (
<div
className="chat-container"
style={{
backgroundImage: `url(${bgImage})`,
}}
> <div className="overlay"></div>


  <h1 className="chat-title">📖 Shikshapatri AI</h1>

  <div className="chat-grid">
    <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        className="chat-textarea"
        placeholder="Shu puchvu che?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button type="submit" className="chat-button">
        {loading ? "Generating..." : "Ask"}
      </button>
    </form>

    <div className="chat-response">
      {loading ? (
        <h3>Generating Response...</h3>
      ) : (
        <ReactMarkdown>{data}</ReactMarkdown>
      )}
    </div>
  </div>
</div>


);
}

export default Chatapp;
