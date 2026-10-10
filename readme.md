# 3D Portfolio Book — Interactive Developer Portfolio

![screenshot](public/Omar Yasir Dafalla developer logo.png)

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![3D](https://img.shields.io/badge/3D-Animation-FF6B6B)
![Responsive](https://img.shields.io/badge/Responsive-Design-4ECDC4)

A developer portfolio presented as an interactive 3D book. Instead of a scrolling single-page site, visitors flip through pages — cover, index, profile, projects, education, services, skills, work history, and contact — with realistic CSS 3D page-turn animations on desktop and a single-page swipe-style view on mobile.

Projects are pulled live from GitHub and cross-referenced with Vercel deployments, so the portfolio page always reflects your current repos without manual updates.

---

## Features

- **3D page-flip book UI** — CSS 3D transforms (`preserve-3d`, `backface-visibility`, `rotateY`) drive realistic page turns on desktop, with a dedicated single-page mobile layout.
- **Live project data** — Repos are fetched from the GitHub API, matched against Vercel deployments by name, and enriched with an auto-extracted preview image pulled from each repo's README.
- **No-scroll pagination** — Since project count is only known at runtime, the portfolio section measures its own content and splits it across as many physical book pages as it needs — never an internal scrollbar, consistent with the rest of the book.
- **Category filtering** — Projects can be filtered (All / Full Stack / Mobile / Frontend / Backend), inferred automatically from GitHub topics, language, and repo name/description when no explicit topic is set.
- **Book-wide index** — A two-page index/table of contents lets you jump directly to any section; page numbers are generated dynamically as sections resize.
- **Secure by design** — GitHub/Vercel API tokens are never shipped to the browser; all upstream API calls happen inside a Vercel serverless function.
- **Responsive** — Distinct desktop (two-page spread) and mobile (single page + bottom nav) experiences, sharing the same underlying data/pagination logic.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 (functional components, hooks) |
| Styling | Tailwind CSS 3 |
| Build tool | Vite 5 |
| Icons | BoxIcons |
| HTTP client | Axios |
| Backend | Vercel Serverless Functions (Node.js) |
| Data sources | GitHub REST API, Vercel REST API |
| Deployment | Vercel |

No animation library (Framer Motion, GSAP, etc.) is used — page turns are pure CSS 3D transforms driven by inline style mutations.

---

## Project Structure

```
├── api/                          # Vercel serverless functions (server-side only)
│   ├── projects.js               # GET /api/projects — fetches, merges, returns project data
│   └── _lib/
│       └── fetchReadmeImage.js   # Extracts a preview image from a repo's README
│
├── src/
│   ├── components/
│   │   ├── Book/
│   │   │   ├── Book.jsx              # Chooses DesktopScreen vs MobileBook
│   │   │   ├── DesktopScreen.jsx     # Desktop two-page-spread book + dynamic page list
│   │   │   ├── MobileBook.jsx        # Mobile single-page book + dynamic page list
│   │   │   ├── BookPage.jsx          # Static left/right page shell (legacy/simple layout)
│   │   │   ├── Page.jsx              # One physical page's front/back face + flip button
│   │   │   ├── Paper.jsx             # Wraps a front+back page pair, handles the 3D flip
│   │   │   └── Cover.jsx             # Book cover visual (spine/edge)
│   │   │
│   │   ├── Pages/
│   │   │   ├── CoverPage.jsx             # Front cover content
│   │   │   ├── IndexPage.jsx             # Desktop table of contents
│   │   │   ├── MobileIndex.jsx           # Mobile table of contents
│   │   │   ├── ProfilePage.jsx           # Bio, photo, social links, CV download
│   │   │   ├── PortfolioContentPage.jsx  # ONE physical page's slice of projects
│   │   │   ├── EducationPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── SkillsPage.jsx
│   │   │   ├── WorkExperiencePage.jsx
│   │   │   └── ContactPage.jsx
│   │   │
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── SocialMedia.jsx
│   │       ├── ProjectCard.jsx           # Shared project card (real + measurement pass)
│   │       ├── MobileNavigation.jsx      # Bottom nav bar + quick-jump menu
│   │       └── PageNavigation.jsx        # Per-page flip button / cover CTA
│   │
│   ├── hooks/
│   │   ├── usePagedItems.js          # Generic measure-then-paginate hook
│   │   ├── usePortfolioPagination.js # Fetch + filter + paginate, shared by Desktop/Mobile
│   │   └── useElementSize.js         # ResizeObserver-based live element sizing (mobile)
│   │
│   ├── data/
│   │   └── portfolioData.js          # Static content: profile, education, services, skills, work
│   │
│   ├── styles/
│   │   └── globals.css               # Tailwind layers + 3D transform utility classes
│   │
│   ├── App.jsx                       # Mobile/desktop breakpoint detection
│   └── main.jsx                      # React root
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Architecture Notes

### The pagination problem

The book's whole premise is "no scrolling" — every page is a fixed-height box. That works fine for static content (Education, Skills, etc.), but the **Portfolio** section's length depends on how many repos exist on GitHub at any given time, which isn't known until the API responds.

CSS can't auto-paginate content across a fixed box the way a print stylesheet can, so this project measures content and splits it manually:

1. `usePortfolioPagination` fetches the merged project list from `/api/projects` and applies the active category filter.
2. `usePagedItems` renders every filtered project once, **off-screen**, at the real card width, and reads each card's actual rendered height via a ref.
3. Items are greedily bucketed into pages — a page is closed and a new one started the moment the next item would overflow the available height. Grid rows are kept whole (a page never splits a row in half).
4. `DesktopScreen`/`MobileBook` use the resulting page count to build their page list *dynamically* — the portfolio section contributes as many physical pages as it needs, and every page number after it shifts accordingly. Both re-measure automatically if the filter changes or (on mobile) the viewport resizes.

### Data flow

```
GitHub API ─┐
            ├─> /api/projects (Vercel serverless function) ─> usePortfolioPagination ─> usePagedItems ─> DesktopScreen / MobileBook
Vercel API ─┘
```

All calls to the GitHub and Vercel REST APIs happen **server-side**, inside `api/projects.js`. The browser only ever calls your own `/api/projects` endpoint, which returns the already-merged, already-categorized project list. This keeps `GITHUB_TOKEN`/`VERCEL_TOKEN` out of the client bundle entirely.

### Category inference

GitHub repos have no built-in "frontend/backend/mobile/fullstack" field, so `inferCategory` (in `api/projects.js`) approximates one, in priority order:
1. Explicit GitHub **topics** (most reliable — tag your repos for accurate results).
2. **Language**, but only where it's unambiguous (e.g. Python/Go → backend, HTML/CSS → frontend). JavaScript/TypeScript are deliberately excluded here, since the same language is used for both a React frontend and a Node/Express backend.
3. A **keyword scan** of the repo name/description, for the ambiguous JS/TS case.
4. Falls back to `'fullstack'` if nothing matches.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- A [Vercel account](https://vercel.com) (for the serverless function + deployment)
- GitHub [personal access token](https://github.com/settings/tokens) with `public_repo` (or `repo`) scope
- Vercel [API token](https://vercel.com/account/tokens)

### Installation

```bash
git clone https://github.com/yourusername/3d-portfolio-book.git
cd 3d-portfolio-book
npm install
```

### Environment variables

Set these in your Vercel project (**Settings → Environment Variables**) — not in a client-side `.env` file, since they must never be exposed to the browser:

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | GitHub personal access token, used server-side to list your repos and read READMEs |
| `VERCEL_TOKEN` | Vercel API token, used server-side to look up deployment URLs |

### Local development

This project uses Vercel serverless functions (`api/`), which Vite's own dev server doesn't run. Use the Vercel CLI instead:

```bash
npm install -g vercel
vercel link      # one-time: link this folder to a Vercel project
vercel dev        # runs the Vite frontend AND /api routes together
```

Running `npm run dev` alone will serve the frontend but any request to `/api/projects` will 404 — always use `vercel dev` for local development.

### Build & deploy

```bash
npm run build     # production build via Vite
vercel --prod      # deploy (or push to your connected Git branch)
```

---

##  API Reference

### `GET /api/projects`

Returns the merged, categorized project list.

**Response**

```json
{
  "projects": [
    {
      "id": 123456,
      "title": "my-repo-name",
      "description": "A short description from GitHub.",
      "technologies": ["TypeScript", "react", "vite"],
      "category": "frontend",
      "liveUrl": "https://my-repo-name.vercel.app",
      "githubUrl": "https://github.com/OmarYasirR/my-repo-name",
      "imgURL": "https://raw.githubusercontent.com/OmarYasirR/my-repo-name/main/screenshot.png"
    }
  ]
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | number | GitHub repo ID |
| `title` | string | Repo name |
| `description` | string | GitHub description, or a placeholder if none set |
| `technologies` | string[] | Primary language + GitHub topics |
| `category` | string | `fullstack` \| `mobile` \| `frontend` \| `backend` — inferred, see above |
| `liveUrl` | string \| null | Matching Vercel deployment URL, falling back to the repo's `homepage`, or `null` |
| `githubUrl` | string | Repo URL |
| `imgURL` | string \| null | First image found in the repo's README, resolved to an absolute URL |

Responses are cached at the CDN edge (`Cache-Control: s-maxage=3600, stale-while-revalidate=86400`) to conserve GitHub/Vercel API rate limits.

**Error responses**

| Status | Meaning |
|---|---|
| `405` | Non-GET request |
| `502` | Upstream GitHub/Vercel API call failed |

---

##  Known Limitations

- `inferCategory`'s language/keyword heuristic is a best-effort guess — tagging repos with explicit GitHub topics (`frontend`, `backend`, `fullstack`, `mobile`) gives the most accurate results.
- The desktop book's portfolio page-height constant (`PORTFOLIO_PAGE_CONTENT_HEIGHT`) is a fixed estimate based on the book's static `45rem` container; if you change the header/padding markup, re-measure and update the constant.
- Mobile navigation between non-adjacent pages animates one page at a time (interval-based), which is intentional for the flip effect but means jumping far across the book takes a moment.

---

##  License

MIT
