"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const quickPrompts = [
    {
      label: "Availability",
      text: "Hi, is it available?",
    },
    {
      label: "Late checkout",
      text: "Hi Yonghao, yes i want to check out at 1 pm Thanks!",
    },
    {
      label: "Parking",
      text: "Is parking included?",
    },
    {
      label: "Price negotiation",
      text: "Can you do $1800 instead of $2100?",
    },
    {
      label: "Short stay",
      text: "Can I stay for 2 weeks?",
    },
  ];

  const generateReply = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate reply.");
      }

      const data = await res.json();
      setReply(data.reply || "");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating the reply.");
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to copy reply.");
    }
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
        Airbnb AI Assistant
      </h1>

      <p style={{ color: "#555", marginBottom: "24px" }}>
        Paste a guest message below and generate a professional reply in your
        hosting style.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>Quick Tests</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {quickPrompts.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setInput(item.text);
                setCopied(false);
                setError("");
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#f7f7f7",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          rows={8}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCopied(false);
            setError("");
          }}
          placeholder="Paste guest message here..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={generateReply}
          disabled={loading}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "none",
            background: loading ? "#999" : "#111",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Reply"}
        </button>

        <button
          onClick={copyReply}
          disabled={!reply}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: !reply ? "#f3f3f3" : "#fff",
            color: "#111",
            cursor: !reply ? "not-allowed" : "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy Reply"}
        </button>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 14px",
            borderRadius: "8px",
            background: "#fff3f3",
            color: "#b00020",
            border: "1px solid #f1b5b5",
          }}
        >
          {error}
        </div>
      )}

      <div>
        <h3 style={{ marginBottom: "10px" }}>Reply</h3>
        <div
          style={{
            minHeight: "160px",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            background: "#fafafa",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {reply || "Your generated reply will appear here."}
        </div>
      </div>
    </main>
  );
}


