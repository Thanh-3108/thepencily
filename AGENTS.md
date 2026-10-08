<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# The Pencily Design & Code Conventions

## 1. STRICT RULE: ABSOLUTELY NO "NỐT RUỒI" (INDICATOR / STATUS / PULSE DOTS)
- **NEVER** add decorative, status, online indicator, pulse, or bullet dots (e.g. `<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />`, `<span className="w-2.5 h-2.5 rounded-full ...">`, etc.) anywhere in the application.
- This applies to all tasks: revamping existing components, designing new pages, creating widgets, headers, banners, lists, sidebars, or control docks.
- Only add a dot if the USER EXPLICITLY requests a dot by name.

## 2. ROOM & CONTROL BAR CONVENTIONS
- Room control bar buttons must be compact icon-only buttons ("mấy cái nút là logo là được rồi"), with clear SVG icons and accessible tooltips/aria-labels, avoiding bulky text labels.
- Room layout must strictly fit within viewport (`100dvh` / `100vh`) without pushing or clipping the control dock off-screen.
- Screen sharing video must always have `muted` attribute to prevent browser autoplay blocking.
