# Portfolio

Personal portfolio website for **Shoki** ([@Shoki-RSM](https://github.com/Shoki-RSM)), an aspiring software developer and second-year BSc Computing student at UNISA.

Plain HTML, CSS and JavaScript with no framework and no build step.

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content: hero, about, projects, skills, education, contact |
| `styles.css` | Layout, light and dark theme, responsive styles |
| `script.js` | Theme toggle, mobile menu, footer year, scroll reveal |
| `favicon.svg` | Site icon |

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. The site goes live at `https://shoki-rsm.github.io/<repo-name>/` within a minute or two.

Tip: if the repo is named `Shoki-RSM.github.io`, the site is served at `https://shoki-rsm.github.io/` with no path.

## Updating content

Everything lives in `index.html`:

- **Name and intro:** the hero section at the top of `<main>`
- **New project:** copy an `<article class="project">` block in the Projects section
- **Contact links:** uncomment the email and LinkedIn buttons in the Contact section and fill them in
- **Colours:** change the `--accent` and `--accent-2` tokens at the top of `styles.css`
