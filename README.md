# Yuvraj Bisht — Production Portfolio Website

A Next.js 14+ (App Router) TypeScript developer portfolio designed with a **Deep Forest & Obsidian Gold** visual identity, Framer Motion animations, custom cursor, 3D tilt micro-interactions, and live GitHub & LeetCode integrations.

---

## 🎨 Visual Identity & Tech Stack

- **Design System**: Deep Forest Dark (`#070E0B`), Obsidian Carbon (`#0F1E19`), Emerald Accent (`#10B981`), Warm Gold (`#F59E0B`).
- **Typography**: Google Fonts `Syne` (Headings) + `IBM Plex Mono` (Code, Stats, Nav).
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom token configuration
- **Animation**: Framer Motion (`useScroll`, `useTransform`, `useSpring`, `staggerChildren`, `layoutId`)

---

## 🚀 Key Features

1. **Interactive Self-Typing Code & Runner Hero**: Self-typing Playwright E2E tests, Golang APIs, and RAG pipelines with an interactive CLI terminal modal (`whoami`, `skills`, `projects`, `stats`).
2. **Live Data Integration**:
   - **GitHub API**: Public event streams, contribution heatmap grid, pinned repositories.
   - **LeetCode API**: Easy/Medium/Hard solve counts, total solved, ranking, and latest accepted submissions.
   - **Auto-Refreshing Polling**: Silently re-fetches client-side metrics every 5 minutes with animated count-up numbers.
3. **Motion & Polish**:
   - Spring-based magnetic custom cursor.
   - 3D card tilt with cursor spotlight radial glow tracking.
   - Top scroll progress bar & scroll-scrubbed hero parallax/blur.
   - Sliding active nav pill indicator (`layoutId`).
   - Sticky work experience timeline.

---

## 🛠 Local Setup & Running

```bash
# 1. Install dependencies
npm install

# 2. Configure Environment Variables
cp .env.example .env.local

# Edit .env.local and add your GitHub token:
# GITHUB_TOKEN=ghp_xxx
# LEETCODE_USERNAME=yuvraj249

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. In Vercel Project Settings &rarr; **Environment Variables**, add:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token.
   - `LEETCODE_USERNAME`: `yuvraj249`.
4. Deploy!

### ⚡ Setting Up Instant "Push-to-Portfolio" Updates

To make your portfolio automatically revalidate whenever you push new commits to GitHub:

1. In Vercel, go to **Project Settings &rarr; Git &rarr; Deploy Hooks**.
2. Create a hook named `github-push-revalidate` targeting the `main` branch.
3. Copy the generated Deploy Hook URL.
4. In your GitHub repository, go to **Settings &rarr; Secrets and variables &rarr; Actions**.
5. Add a repository secret named `VERCEL_DEPLOY_HOOK_URL` with the URL.
6. The included workflow `.github/workflows/deploy-hook.yml` will automatically trigger a revalidate on every `git push`!
