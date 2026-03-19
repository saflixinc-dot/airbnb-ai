"use client";

import { useState } from "react";

export default function HomePage() {
  const [listing, setListing] = useState("North York Basement");
  const [tone, setTone] = useState("friendly");
  const [guestMessage, setGuestMessage] = useState(`Hi Yonghao,
Thanks for the information. I’ll be visiting from Orlando, Florida with my mom. We’re looking forward to the stay and appreciate the clarification about the camera. Please let me know if there’s anything else you need from us before check-in.

Thanks!`);
  const [reply, setReply] = useState(`Hi,

Thanks for your message! Everything is all set for your stay. There’s nothing else needed from you at the moment.

I’ll send the check-in instructions shortly before your arrival. Safe travels from Orlando, and I look forward to hosting you and your mom!

Best,
Yonghao`);
  const [intent, setIntent] = useState("camera_confirmation");
  const [riskLevel, setRiskLevel] = useState("low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReply() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: guestMessage,
          listing,
          tone,
        }),
      });

if (!res.ok) {
  const errorData = await res.json().catch(() => null);
  console.error("API error response:", errorData);
  throw new Error(errorData?.error || "Failed to generate reply.");
}

      const data = await res.json();

      setReply(data.reply || "");
      setIntent(data.intent || "general");
      setRiskLevel(data.riskLevel || "low");
    } catch (err) {
      console.error(err);
  setError(err instanceof Error ? err.message : "Something went wrong while generating the reply.");
   
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setGuestMessage("");
    setReply("");
    setIntent("");
    setRiskLevel("");
    setError("");
  }

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(reply);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Airbnb AI Host Assistant
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Generate guest replies quickly for your Airbnb listing.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="listing"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Listing
              </label>
              <select
                id="listing"
                value={listing}
                onChange={(e) => setListing(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
              >
                <option value="North York Basement">North York Basement</option>
                <option value="Upstairs Rooms">Upstairs Rooms</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="tone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Tone
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="firm">Firm</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="guestMessage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Guest Message
            </label>
            <textarea
              id="guestMessage"
              rows={8}
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
              placeholder="Paste the guest message here..."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={generateReply}
              disabled={loading || !guestMessage.trim()}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate Reply"}
            </button>

            <button
              onClick={clearForm}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Detected Intent
              </p>
              <p className="mt-2 text-sm text-gray-900">
                {intent || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Risk Level
              </p>
              <p className="mt-2 text-sm text-gray-900">
                {riskLevel || "-"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="suggestedReply"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Suggested Reply
            </label>
            <textarea
              id="suggestedReply"
              rows={10}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500"
              placeholder="AI-generated reply will appear here..."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={copyReply}
              disabled={!reply.trim()}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Copy
            </button>

            <button
              onClick={generateReply}
              disabled={loading || !guestMessage.trim()}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              Regenerate
            </button>

            <button
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Save as Template
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

