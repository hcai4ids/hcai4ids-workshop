# Deploying the HCAI4IDS Website

Recommended hosting: **GitHub Pages**, managed by a dedicated GitHub account registered with `organizers.hcai4ids@gmail.com`.

This site is already a plain static website: HTML pages, one CSS file, one JavaScript loader, CSV data files, and images. GitHub Pages is the easiest option to maintain because updates can be made by editing the CSV files directly in the repository. Google Sites is useful for drag-and-drop editing, but it would require manually rebuilding the current multi-page layout and would not preserve the CSV-driven workflow.

## Publish on GitHub Pages

1. Create or sign in to a GitHub account using `organizers.hcai4ids@gmail.com`.
2. Create a new GitHub repository, for example `hcai4ids-workshop`.
3. Upload or push all files in this folder to the repository root.
4. In GitHub, open the repository settings.
5. Go to **Pages**.
6. Under **Build and deployment**, choose:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
7. Save the settings.
8. Wait for GitHub Pages to publish the site.

The site URL will usually be:

```text
https://<github-username>.github.io/<repository-name>/
```

For example:

```text
https://<github-username>.github.io/hcai4ids-workshop/
```

## What to Update Later

Most routine updates only require editing CSV files:

- `data/key-dates.csv`: deadlines and workshop date
- `data/schedule.csv`: schedule rows
- `data/topics.csv`: topics of interest
- `data/guidelines.csv`: submission guidance
- `data/call-to-action.csv`: submission portal, template, and contact links
- `data/organizers.csv`: organizer details

Organizer photos should be added to `images/`, then referenced from the `profile_image` column in `data/organizers.csv`.

## Current Contact Email

The public contact email is:

```text
organizers.hcai4ids@gmail.com
```

It is used in the site footer and the Call for Participation contact button.

## Repository Ownership

The local repository is configured to use:

```text
HCAI4IDS Organizers <organizers.hcai4ids@gmail.com>
```

For clean long-term management, the GitHub repository should be owned by the GitHub account registered with `organizers.hcai4ids@gmail.com`, not by a personal account. If additional organizers need access, add them as repository collaborators in GitHub.

## Local Preview

Because the site loads CSV files with JavaScript, preview it through a local static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Opening the HTML files directly from disk may block CSV loading in some browsers.

## Publication Checklist

- Replace `TBD` in `data/key-dates.csv` when dates are confirmed.
- Replace the `TBD` submission portal URL in `data/call-to-action.csv`.
- Check all three pages:
  - `index.html`
  - `schedule.html`
  - `call-for-participation.html`
- Confirm the contact email is `organizers.hcai4ids@gmail.com`.
- Confirm GitHub Pages is publishing from `main` and `/ (root)`.
