# HCAI4IDS Workshop Website

Human-Centered AI Support for Immersive Data Sensemaking - NordiCHI 2026 Workshop Website.

This is a plain static website designed for easy hosting on GitHub Pages. Content is maintained mostly through CSV files in `data/`, so routine updates do not require editing HTML.

## Recommended Hosting

Use **GitHub Pages** with a dedicated GitHub account registered to `organizers.hcai4ids@gmail.com`.

GitHub Pages is the best fit for this site because:

- The current site is already HTML, CSS, JavaScript, CSV, and images.
- Updates can be made by editing CSV files directly in GitHub.
- The multi-page structure matches normal GitHub Pages hosting.
- No build system, backend, or paid hosting is required.

Google Sites is possible, but it would require manually rebuilding the layout and would not preserve the CSV-driven workflow.

See `DEPLOY.md` for the step-by-step GitHub Pages setup.

The local Git repository is configured to use:

```text
HCAI4IDS Organizers <organizers.hcai4ids@gmail.com>
```

## Pages

- `index.html`: About, motivation, workshop focus, goals, outcomes, organizers
- `schedule.html`: Workshop schedule
- `call-for-participation.html`: Important dates, topics, submission guidelines, contact links

## Local Preview

Run a small static server from this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Opening the HTML files directly from disk may block CSV loading in some browsers.

## Update Content

Most content is stored in CSV files:

- `data/key-dates.csv`: important dates
- `data/organizers.csv`: organizer details
- `data/topics.csv`: topics of interest
- `data/schedule.csv`: schedule
- `data/guidelines.csv`: submission guidelines
- `data/call-to-action.csv`: buttons and links

After editing a CSV file, commit and push the change to GitHub. GitHub Pages will update the live site from the repository.

## Add Organizer Photos

1. Save a JPG or PNG in `images/`.
2. Add the filename to the `profile_image` column in `data/organizers.csv`.
3. Commit and push both the image and CSV update.

## Before Publishing

- Replace remaining `TBD` values once confirmed.
- Add the real submission portal URL to `data/call-to-action.csv`.
- Confirm all three pages load locally.
- Confirm the public contact email is `organizers.hcai4ids@gmail.com`.

## Project Structure

```text
hcai4ids-workshop/
├── index.html
├── schedule.html
├── call-for-participation.html
├── data/
│   ├── organizers.csv
│   ├── key-dates.csv
│   ├── topics.csv
│   ├── schedule.csv
│   ├── guidelines.csv
│   └── call-to-action.csv
├── scripts/
│   └── load-content.js
├── styles/
│   └── main.css
├── images/
├── .nojekyll
├── DEPLOY.md
└── README.md
```

## Contact

For workshop-specific questions, contact:

```text
organizers.hcai4ids@gmail.com
```

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- CSV data files
- No backend
- No dependencies

## License

Copyright (c) 2026 HCAI4IDS Workshop Organizers.
