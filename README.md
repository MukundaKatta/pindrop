# Pindrop

The editor for indie podcasters. Drop your raw recording. Get a clean cut with chapters, show notes, and a transcript — ready to publish.

**Status:** v0 skeleton — landing page + transcript edit-point demo. Full AI not yet wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 transcript editor — paste a transcript, get 3 mocked edit points (filler clusters, long pauses, off-topic tangents) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "pindrop"` |

## What's next

- Wire real AI (transcript analysis + edit suggestions) behind `/try`
- Audio file upload + waveform visualization
- Auto-chaptering and show-notes generation
