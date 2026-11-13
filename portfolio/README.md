# Anup Pund: Portfolio

Next.js 14 (App Router) + TypeScript. Plain CSS and Lucide icons, no UI frameworks.

## 1. Extract
Unzip `anup-pund-portfolio.zip`, then `cd portfolio`.

## 2. Install and run locally
Requires Node.js 18.17+.
```
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## 3. Contact form
No API keys needed. Submitting the form opens a pre-filled Gmail compose window (to anuppund.123@gmail.com) in a new tab; the visitor presses Send there. If the popup is blocked, the form opens Gmail in the same tab, and a fallback link to the default mail app is shown.

## 4. Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, **Add New > Project**, import the repo (framework: Next.js, no settings needed).
3. Optionally add `NEXT_PUBLIC_SITE_URL` (see `.env.example`). Deploy.

## 5. Custom domain
Vercel project > **Settings > Domains** > add your domain and set the DNS records Vercel shows (A record for the apex, CNAME `www`). Then set `NEXT_PUBLIC_SITE_URL` to your domain and redeploy.

## 6. Updating content
Everything lives in `lib/data.ts`.
- **Certificate:** drop the PDF/PNG into `public/certificates/`, add an entry to `certificates` (category: Cybersecurity, Programming, Cloud, Networking or Other).
- **Project:** add an entry to `projects`; add `github`/`live` links when you have them.
- **Resume:** replace `public/resume/Anup_Pund_Resume.pdf` (keep the filename).
- **Skills / timeline:** edit `skillGroups` and `timeline`. `"p"` shows as used in projects, `"l"` as learning.

## Things to review
- Profile photo: `public/images/anup-pund.jpg` (replace the file, keep the name). Phone/email live in `lib/data.ts`.
- Project role/problem text for SentinelIQ, Clinic, Esports, GovForm, Placement DBMS and Catalog is minimal; add details and repo links.
- The site uses the resume CGPA (8.52). Semester 6 SGPA 9.25 came from your brief.
