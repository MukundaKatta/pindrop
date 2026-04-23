"use client";

import { useState } from "react";
import Link from "next/link";

interface EditPoint {
  type: "filler" | "pause" | "off-topic";
  timestamp: string;
  label: string;
  suggestion: string;
  excerpt: string;
}

const MOCK_EDIT_POINTS: EditPoint[] = [
  {
    type: "filler",
    timestamp: "4:32 – 4:41",
    label: "Filler cluster",
    suggestion:
      "Cut 9 seconds of repeated filler words. The sentence lands harder without them.",
    excerpt:
      '"So, like, um, you know, basically what I was trying to say is, um, like..."',
  },
  {
    type: "pause",
    timestamp: "12:07 – 12:19",
    label: "Long pause",
    suggestion:
      "12-second dead air while the guest searches for a link. Trim to 2 seconds or insert a transition.",
    excerpt: "[silence — 12s]",
  },
  {
    type: "off-topic",
    timestamp: "27:15 – 29:48",
    label: "Off-topic tangent",
    suggestion:
      "2.5-minute digression about weekend brunch spots. Cut entirely or move to a bonus segment.",
    excerpt:
      '"Oh man, speaking of that, have you tried the new place on 5th? Their avocado toast is insane..."',
  },
];

const SAMPLE_TRANSCRIPT = `[0:00] Hey everyone, welcome back to the show. Today I've got Marcus joining me to talk about his new startup.

[1:12] So Marcus, tell us about the company. What are you building?

[1:20] Yeah, so basically we're building a tool for, um, like, content creators who need to, you know, manage their workflow better.

[4:32] So, like, um, you know, basically what I was trying to say is, um, like, the whole point is that creators spend too much time on the boring stuff.

[4:41] Right, exactly. And that's where automation comes in.

[12:00] Let me pull up that link for you...

[12:07] [silence — 12s]

[12:19] Okay, got it. So if you go to the site you can see the dashboard.

[27:15] Oh man, speaking of that, have you tried the new place on 5th? Their avocado toast is insane. We went last Saturday and the line was out the door but totally worth it. I think they also do this amazing cold brew...

[29:48] Anyway, back to the product. So the core feature is the AI-powered editor.

[38:15] Thanks for coming on, Marcus. Everyone, hit subscribe and we'll see you next week.`;

const TYPE_COLORS: Record<EditPoint["type"], { bg: string; text: string; border: string; badge: string }> = {
  filler: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  pause: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  "off-topic": {
    bg: "bg-rose-50",
    text: "text-rose-900",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
};

export default function TryPage() {
  const [transcript, setTranscript] = useState("");
  const [editPoints, setEditPoints] = useState<EditPoint[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!transcript.trim()) return;
    setAnalyzing(true);
    // Simulate a brief analysis delay
    setTimeout(() => {
      setEditPoints(MOCK_EDIT_POINTS);
      setAnalyzing(false);
    }, 800);
  }

  function handleReset() {
    setTranscript("");
    setEditPoints(null);
  }

  function handleUseSample() {
    setTranscript(SAMPLE_TRANSCRIPT);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-500" />
          Pindrop
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Transcript editor
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Paste a transcript. See what to cut.
          </h1>
        </div>

        {editPoints === null ? (
          <form onSubmit={handleAnalyze}>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your podcast transcript here..."
              rows={12}
              required
              className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-sm leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
            />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleUseSample}
                className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              >
                Use sample transcript
              </button>
              <button
                type="submit"
                disabled={analyzing || !transcript.trim()}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                {analyzing ? "Analyzing..." : "Find edit points"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4">
              {editPoints.map((point, i) => {
                const colors = TYPE_COLORS[point.type];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border ${colors.border} ${colors.bg} p-5`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${colors.badge}`}
                      >
                        {point.label}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">
                        {point.timestamp}
                      </span>
                    </div>
                    <p className={`mt-3 text-sm italic ${colors.text} opacity-80`}>
                      {point.excerpt}
                    </p>
                    <p className={`mt-2 text-sm leading-relaxed ${colors.text}`}>
                      {point.suggestion}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try another transcript
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900 text-center"
              >
                Get early access
              </Link>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with mocked edit suggestions.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for real AI-powered editing.
        </p>
      </div>
    </div>
  );
}
