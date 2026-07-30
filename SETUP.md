# Matin Atelier — deployment guide

A static site. No build step. The repo root **is** the website.

---

## 1 · Create the GitHub repo (new, separate)
1. github.com → **New repository**.
2. Name it e.g. `matin-atelier`. Private or public — either works. **Don't** add a README/gitignore.
3. **Create repository.**

## 2 · Upload the site
Easiest (no terminal):
1. On the empty repo page → **uploading an existing file**.
2. Drag in **everything inside this `site` folder** (the `index.html`, `assets/`, `docs/`, `netlify.toml`, etc.) — so the HTML files sit at the **root** of the repo, not inside a `site/` subfolder.
3. **Commit changes.**

## 3 · Connect Netlify (new site)
1. app.netlify.com → **Add new site → Import an existing project → GitHub**.
2. Authorise if asked, pick the `matin-atelier` repo.
3. Build settings: **Build command = empty**, **Publish directory = `.`** (already set by `netlify.toml`).
4. **Deploy site.**
5. Netlify gives a temporary URL like `something.netlify.app`. **Check the whole site here first** — gallery zoom, About, PDFs, the form.

## 4 · Route the form to your email
1. Netlify dashboard → your site → **Forms**. After the first deploy you'll see a form named **purchase-inquiry**.
   (If it's missing: Site config → **Build & deploy → Post processing → Form detection** must be ON, then redeploy.)
2. **Forms → Form notifications → Add notification → Email notification.**
3. Set the address to **hello@matinatelier.art** → **Save**.
4. Submit a test inquiry from the site to confirm the email arrives.

## 5 · Temporary domain for review — hossein.photo (at eukhost)
Use this to preview on a "real" domain before touching matinatelier.art.
1. Netlify → **Domain management → Add a domain → `hossein.photo`.**
2. Netlify shows DNS targets. In your **eukhost** control panel, edit `hossein.photo` DNS:
   - **A record** `@` → `75.2.60.5`
   - **CNAME** `www` → `<your-site>.netlify.app`
   (Or, simpler: set eukhost **nameservers** to Netlify's and let Netlify manage DNS.)
3. Wait for DNS to propagate (minutes–a few hours). Netlify auto-issues HTTPS.
4. Review everything at `https://hossein.photo`.

## 6 · Go live on the real domain
When you're happy:
1. Netlify → **Domain management → Add `matinatelier.art`** (and `www`).
2. At your matinatelier.art registrar, point DNS to Netlify (same A/CNAME as above, or Netlify nameservers).
3. Set **matinatelier.art** as the **primary domain**; keep/redirect `www`.
4. (Optional) remove `hossein.photo` from the site once done.

---

## Editing artworks later
Open `assets/js/artworks.js` and edit the array — title, year, size, description, or add a new `{ code, img, ... }`. Drop the matching `NNS.webp` (thumbnail) and `NNM.webp` (zoom) into `assets/images/artworks/`. Commit → Netlify redeploys automatically.

Pieces **MT-006, MT-009, MT-010, MT-011, MT-012** are currently marked *"details on request"* — send me their titles/year/size/description and I'll fill them in.
