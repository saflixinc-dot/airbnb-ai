"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const quickPrompts = [
    { label: "Availability", text: "Hi, is it available?" },
    { label: "Late checkout", text: "Hi Yonghao, yes i want to check out at 1 pm Thanks!" },
    { label: "Parking", text: "Is parking included?" },
    { label: "Price negotiation", text: "Can you do $1800 instead of $2100?" },
    { label: "Short stay", text: "Can I stay for 2 weeks?" },
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
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to copy reply.");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f8",
        color: "#111827",
        padding: "24px 16px 40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            marginBottom: 12,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Airbnb AI Assistant
        </h1>

        <p
          style={{
            color: "#4b5563",
            fontSize: "18px",
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          Paste a guest message below and generate a professional reply in your
          hosting style.
        </p>

        <div style={{ marginBottom: 22 }}>
          <h3
            style={{
              marginBottom: 12,
              fontSize: 24,
              color: "#111827",
            }}
          >
            Quick Tests
          </h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setInput(item.text);
                  setCopied(false);
                  setError("");
                }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#111827",
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
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
              padding: 16,
              borderRadius: 16,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#111827",
              fontSize: 18,
              lineHeight: 1.5,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <button
            onClick={generateReply}
            disabled={loading}
            style={{
              padding: "14px 20px",
              borderRadius: 12,
              border: "none",
              backgroundColor: loading ? "#9ca3af" : "#111827",
              color: "#ffffff",
              fontSize: 17,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              minWidth: 180,
            }}
          >
            {loading ? "Generating..." : "Generate Reply"}
          </button>

          <button
            onClick={copyReply}
            disabled={!reply}
            style={{
              padding: "14px 20px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              backgroundColor: !reply ? "#e5e7eb" : "#ffffff",
              color: "#111827",
              fontSize: 17,
              fontWeight: 600,
              cursor: !reply ? "not-allowed" : "pointer",
              minWidth: 160,
            }}
          >
            {copied ? "Copied!" : "Copy Reply"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginBottom: 20,
              padding: "12px 14px",
              borderRadius: 12,
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              fontSize: 16,
            }}
          >
            {error}
          </div>
        )}

        <div>
          <h3
            style={{
              marginBottom: 12,
              fontSize: 24,
              color: "#111827",
            }}
          >
            Reply
          </h3>

          <div
            style={{
              minHeight: 180,
              padding: 18,
              borderRadius: 16,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#111827",
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
              fontSize: 18,
              boxSizing: "border-box",
            }}
          >
            {reply || "Your generated reply will appear here."}
          </div>
        </div>
      </div>
    </main>
  );

