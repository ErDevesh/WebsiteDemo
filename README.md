# MSBTE Study Hub — Demo Frontend

This is a static, responsive demo frontend for the "MSBTE Study Hub" educational site. It implements the requested UI and interactions (client-side only) including:

- Notes search with animated results
- Model answers panel with flip cards placeholder
- Explore branch cards and a branch detail page with animated progress bar
- MCQ practice (Learn/Test modes) with progress and result screen
- Books grid with modal details
- Contact form with simulated submission

How to run

Open `index.html` in a browser (no server required). For full experience, serve via a static server:

```powershell
# from the project root
python -m http.server 8000
# then visit http://localhost:8000
```

Notes

- The site is purely frontend — download/purchase actions and backend email sending are simulated.
- Placeholder areas for Google AdSense are marked by `.ads-placeholder`.

Files added:

- `index.html` — main site
- `branch.html` — branch detail page
- `css/styles.css` — styles and animations
- `js/main.js` — interaction scripts

If you want, I can: add more sample content, wire a backend API for real downloads, or convert this to a React/Vue project.
