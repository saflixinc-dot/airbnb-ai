"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const quickPrompts = [
    { label: "Availability", text: "Hi, is it available?" },
    {
      label: "Late checkout",
      text: "Hi Yonghao, yes i want to check out at 1 pm Thanks!",
    },
    { label: "Parking", text: "Is parking included?" },
    {
      label: "Price negotiation",
      text: "Can you do $1800 instead of $2100?",
    },
    { label: "Short stay", text: "Can I stay for 2 weeks?" },
  ];

  useEffect(() => {
    const unlocked = localStorage.getItem("airbnb_ai_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const unlockApp = async () => {
    setPasswordError("");

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!res.ok) {
        setPasswordError("Wrong password.");
        return;
      }

      localStorage.setItem("airbnb_ai_unlocked", "true");
      setIsUnlocked(true);
      setPasswordInput("");
    } catch (err) {
      console.error(err);
      setPasswordError("Unable to verify password.");
    }
  };

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

  const logout = () => {
    localStorage.removeItem("airbnb_ai_unlocked");
    setIsUnlocked(false);
    setReply("");
    setInput("");
    setCopied(false);
    setError("");
  };

  if (!isUnlocked) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f7f8",
          color: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: 30,
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Airbnb AI Assistant
          </h1>

          <p
            style={{
              color: "#4b5563",
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Enter password to continue.
          </p>

          <input
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setPasswordError("");
            }}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              fontSize: 16,
              boxSizing: "border-box",
              marginBottom: 14,
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") unlockApp();
            }}
          />

          <button
            onClick={unlockApp}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: 12,
              border: "none",
              backgroundColor: "#111827",
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Enter
          </button>

          {passwordError && (
            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                borderRadius: 12,
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
                fontSize: 15,
              }}
            >
              {passwordError}
            </div>
          )}
        </div>
      </main>
    );
  }

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
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              margin: 0,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Airbnb AI Assistant
          </h1>

          <button
            onClick={logout}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#111827",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Lock
          </button>
        </div>

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

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
}

