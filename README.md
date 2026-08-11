# Lab Website

Website for our lab (osteoarthritis research, CUHK). Built with plain HTML/CSS/JS — no build step, no framework — so anyone in the lab can open a file on GitHub and edit it directly.

**Live site:** https://lab-website-tau.vercel.app (mirrored at https://kamvictor.github.io/lab-website)

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
| `js/main.js` | Mobile nav toggle, smooth scroll, tilt/parallax/text-reveal animations |
| `assets/` | Placeholder images (SVG) |

All content marked **"Placeholder"** should be replaced with real text/photos as they become available. No code changes are needed to update text — just edit the HTML directly.

The hero background on the homepage and research direction pages is currently a CSS animated gradient (`.hero-media` in `css/style.css`), not an image — to swap in a real photo later, replace that gradient/animation with a `background-image` (or add back an `<img class="hero-image">`).

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

## Deployment

The repo is connected to Vercel (project `lab-website`). Every push to `main` auto-deploys to production; every other branch/PR gets its own preview URL automatically, so collaborators can review edits before they're merged. GitHub Pages is also enabled as a mirror (**Settings → Pages → Source: Deploy from a branch → `main` / `root`**) and updates on every push too.
