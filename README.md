# Chaowan Lab Website

Website for Chaowan Lab (osteoarthritis research, CUHK). Built with plain HTML/CSS/JS — no build step, no framework — so anyone in the lab can open a file on GitHub and edit it directly.

**Live site:** not public yet. The repo is currently private while the site is being built out. Once ready, it will be switched to public and published at `https://kamvictor1603.github.io/lab-website` (or the account's actual GitHub Pages URL) via **Settings → Pages**.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Home page — mission statement + 3 research direction panels |
| `pi.html` | Principal Investigator profile |
| `team.html` | Team member grid |
| `research-1.html`, `research-2.html`, `research-3.html` | Detail page per research direction |
| `publications.html` | Publications list |
| `news.html` | Lab news / updates |
| `contact.html` | Contact info |
| `css/style.css` | All styling (layout, nav, cards, animations) |
| `js/main.js` | Mobile nav toggle, smooth scroll, scroll-reveal animations |
| `assets/` | Placeholder images (SVG) |

All content marked **"Placeholder"** should be replaced with real text/photos as they become available. No code changes are needed to update text — just edit the HTML directly.

## Editing content

1. Open the relevant `.html` file on GitHub (or clone the repo).
2. Edit the text between tags — e.g. change `<p>Placeholder bio.</p>` to the real bio.
3. To replace a placeholder image, add your image file under `assets/` and update the `src="..."` attribute pointing to it.
4. Commit with a clear message describing what changed (e.g. `content: add real PI bio and photo`).

## Running locally

No build step required. From the repo root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Adding collaborators

The repo owner can add lab members as collaborators under **Settings → Collaborators and teams → Add people**, using their GitHub username or email. Collaborators can then push branches and open pull requests directly.

## Going live

1. Repo owner switches the repo to public: **Settings → General → Danger Zone → Change visibility → Public** (required — GitHub Pages on the free plan only serves public repos).
2. Enable Pages: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
3. The site will be live at the Pages URL shown on that settings page within a few minutes.
