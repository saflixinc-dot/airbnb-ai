
"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply || "");
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#111",
        padding: "24px 16px",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        {/* HERO */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 42, fontWeight: 700 }}>
            Saflix AI
          </h1>

          <p style={{ fontSize: 20, color: "#555", marginTop: 10 }}>
            AI replies for Airbnb hosts. Save hours every day.
          </p>
        </div>

        {/* INPUT */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste guest message here..."
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 16,
            marginBottom: 16,
          }}
        />

        {/* BUTTON */}
        <button
          onClick={generateReply}
          style={{
            padding: "12px 20px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {loading ? "Generating..." : "Generate Reply"}
        </button>

        {/* OUTPUT */}
        <div
          style={{
            marginTop: 30,
            padding: 16,
            borderRadius: 12,
            border: "1px solid #eee",
            background: "#fafafa",
            minHeight: 120,
            whiteSpace: "pre-wrap",
          }}
        >
          {reply || "Your reply will appear here"}
        </div>
      </div>
    </main>
  );
}
