# ICX Testimonials — AIESEC in Suez

A digital memory box built as a surprise gift for the AIESEC in Suez ICX 2026 exchange participants. Next.js 16 + TypeScript + Tailwind CSS + Supabase + Framer Motion.

## What's inside

- **Public site** (`/`) — an animated, scrollable memory box: a box-opening intro, a collage hero of group memories, a discovery grid of every EP as a physical object (Polaroid / taped photo / rotated card / envelope / torn paper), and a masonry gallery of everything else.
- **Personal EP pages** (`/ep/[id]`) — each EP gets their own themed memory box with their full photo gallery and a fullscreen lightbox.
- **Admin panel** (`/admin`) — email+password login (Supabase Auth), add/edit EPs (with a theme color picker), drag-and-drop multi-photo upload with automatic layout assignment, drag-to-reorder, inline caption/date editing, delete, and a separate general-memories manager with a "featured" toggle.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project (the free tier is enough for this).
2. Once it's ready, open the **SQL Editor** and run `supabase/schema.sql` from this repo. This creates the three tables, row-level security policies, and a public `memory-box` storage bucket.
3. (Optional but recommended) Run `supabase/seed.sql` afterwards to load 5 sample EPs with placeholder photos, so the site looks complete before you upload real photos. You can delete this data any time from the admin panel.
4. Go to **Authentication → Users** and manually create exactly **one** user with your own email and a password — this is your admin login. There is no public sign-up anywhere in the app, by design.
5. Go to **Settings → API** and copy your **Project URL** and **anon public key**.

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the two values from step 1.5:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` to sign in with the admin user you created.

## 4. Deploy to Vercel

1. Push this project to a GitHub repo (or drag-and-drop the folder into Vercel).
2. Import it in Vercel, and add the same two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your production URL once you know it (used only for social-share previews).
4. Deploy. No further configuration needed — the build is clean and uses no local-only assumptions.

## 5. Replace the sample data

Once deployed, sign in at `/admin`:
- **EPs** → edit each sample EP's name/country/dates/photo, or delete them and add your real 20–30 EPs.
- Open each EP's **Manage** page to drag-and-drop their real photos — they'll automatically slot into a Polaroid/taped/rotated-card layout, no manual placement needed.
- **General Memories** → replace the sample group photos with your real event photos, and mark a handful as **Featured** — those are the ones that appear largest in the homepage hero collage.

## Project structure

```
app/
  page.tsx                 → homepage (server component, fetches data)
  ep/[id]/page.tsx          → personal EP memory box page
  admin/login/page.tsx      → admin sign-in
  admin/(dashboard)/        → protected admin routes (EP list, EP editor, memories)
components/
  memory/                   → all public-site visual components
  admin/                    → all admin-panel components
lib/
  supabase/                 → browser/server/middleware Supabase clients
  queries.ts                → typed data-fetching helpers
  storage.ts                → image upload/delete helpers
  layout.ts                 → auto-layout logic for new photo uploads
  types.ts                  → shared TypeScript types
supabase/
  schema.sql                → run this first, in the Supabase SQL editor
  seed.sql                  → optional sample data
```

## Notes

- No image size/type restrictions are enforced on upload, per the brief — very large images will simply take longer to upload and load.
- The site is fully keyboard-navigable; the lightbox supports arrow keys, Escape, and mobile swipe.
- `prefers-reduced-motion` is respected globally.
