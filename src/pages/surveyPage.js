import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://whatsapp-quiz-bot-jqik.onrender.com/v1/api/survey/home_security/respond";

export default function WhatsAppQuiz() {
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: 1, type: "question", text: "Enter your phone number", inputType: "tel", name: "phone", raw: null },
  ]);
  const [input, setInput] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Helper to send user answer and fetch next question
  const sendAnswer = async (answerText) => {
    if (loading) return;
    setLoading(true);

    const lastQuestion = messages.filter((m) => m.type === "question").slice(-1)[0];
    if (!lastQuestion) return;

    // Add user answer bubble
    setMessages((prev) => [...prev, { id: Date.now(), type: "answer", text: answerText }]);

    // Save phone if this is phone question
    if (lastQuestion.name === "phone" && !phone) setPhone(answerText);

    const payload = {
      phone: phone || answerText,
      question_text: lastQuestion.text,
      text: answerText,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.message) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, type: "info", text: "✅ Quiz completed, thank you!" },
        ]);
        setLoading(false);
        return;
      }

      // Data.message is next question object
      const nextQ = data.message;

      let questionText = "";
      let inputType = "text";
      let name = "";
      let raw = null;

      if (typeof nextQ === "string") {
        questionText = nextQ;
        name = "next";
      } else if (typeof nextQ === "object") {
        questionText = nextQ.title || nextQ.text || "";
        inputType = nextQ.type || "text";
        name = nextQ.name || nextQ._meta || "next";
        raw = nextQ; // Save raw question data for special types like radiogroup
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, type: "question", text: questionText, inputType, name, raw },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 3, type: "info", text: "Server error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending free text input answer
  const onSendText = () => {
    if (!input.trim()) return;
    sendAnswer(input.trim());
    setInput("");
  };

  // Handle Enter key for text input
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendText();
    }
  };

  // Render input area depending on last question type
  const lastQuestion = messages.filter((m) => m.type === "question").slice(-1)[0];

  return (
    <div className="wa-card-container" style={{ maxWidth: 600, margin: "auto" }}>
      <div className="wa-card" style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
        {/* Header */}
        <div className="wa-header" style={{ padding: 10, borderBottom: "1px solid #ddd", backgroundColor: "#ededed" }}>
          <div style={{ fontWeight: "bold" }}>{phone || "Phone number"}</div>
          <div style={{ fontSize: 12, color: "#666" }}>last seen recently</div>
        </div>

        {/* Chat window */}
        <div
          className="wa-chat-window"
          ref={scrollRef}
          style={{
            flex: 1,
            padding: 10,
            overflowY: "auto",
            backgroundColor: "#fafafa",
            borderBottom: "1px solid #ddd",
          }}
        >
          {messages.map(({ id, type, text }) => {
            if (type === "question") {
              return (
                <div
                  key={id}
                  className="wa-message wa-message-left"
                  style={{
                    maxWidth: "70%",
                    backgroundColor: "#e5e5ea",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    margin: "10px 0",
                    alignSelf: "flex-start",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {text}
                </div>
              );
            }
            if (type === "answer") {
              return (
                <div
                  key={id}
                  className="wa-message wa-message-right"
                  style={{
                    maxWidth: "70%",
                    backgroundColor: "#0b93f6",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    margin: "10px 0",
                    alignSelf: "flex-end",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {text}
                </div>
              );
            }
            if (type === "info") {
              return (
                <div
                  key={id}
                  className="wa-message wa-message-info"
                  style={{
                    maxWidth: "70%",
                    backgroundColor: "#d1d1d1",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    margin: "10px auto",
                    textAlign: "center",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {text}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Input area */}
        <div
          className="wa-input-container"
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #ddd",
            backgroundColor: "white",
          }}
        >
          {/* If no more questions or loading */}
          {!lastQuestion ? (
            <div style={{ textAlign: "center", color: "#666" }}>
              Quiz completed or no question to answer.
            </div>
          ) : lastQuestion.inputType === "radiogroup" && lastQuestion.raw ? (
            // Render radiogroup choices as buttons
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {lastQuestion.raw.choices.map((choice) => (
                <button
                  key={choice}
                  style={{
                    flex: "1 1 auto",
                    padding: "10px",
                    borderRadius: 20,
                    border: "1px solid #0b93f6",
                    backgroundColor: "#fff",
                    color: "#0b93f6",
                    cursor: loading ? "default" : "pointer",
                  }}
                  onClick={() => !loading && sendAnswer(choice)}
                  disabled={loading}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            // Render normal text input
            <div style={{ display: "flex" }}>
              <input
                type={lastQuestion.inputType || "text"}
                className="wa-input"
                style={{
                  flex: 1,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 20,
                  border: "1px solid #ccc",
                  outline: "none",
                  marginRight: 10,
                }}
                placeholder="Type your answer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
              />
              <button
                className="wa-submit-btn"
                style={{
                  padding: "0 16px",
                  borderRadius: 20,
                  backgroundColor: "#0b93f6",
                  color: "white",
                  border: "none",
                  cursor: loading ? "default" : "pointer",
                }}
                onClick={onSendText}
                disabled={loading || !input.trim()}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
