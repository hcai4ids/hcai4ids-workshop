# CLAUDE.md - HCAI4IDS Workshop Website Maintenance Guide

## Project Overview

The HCAI4IDS Workshop Website is a data-driven, maintainable website for the Human-Centered AI Support for Immersive Data Sensemaking workshop at NordiCHI 2026.

**Key Principle**: All content is stored in CSV files. Non-technical administrators can update dates, descriptions, and organizer information without touching code.

---

## Architecture

```
hcai4ids-workshop/
├── index.html                 # Main page template (loads CSV content)
├── data/                      # Content stored as CSV files (edit these!)
│   ├── workshops.csv          # Workshop info
│   ├── organizers.csv         # Organizer bios
│   ├── key-dates.csv          # Important dates (fill in later)
│   ├── topics.csv             # Research topics
│   ├── schedule.csv           # Workshop schedule
│   ├── guidelines.csv         # Submission guidelines
│   └── call-to-action.csv     # Buttons and links
├── scripts/
│   ├── load-content.js        # Loads CSVs dynamically (for local dev)
│   └── generate.py            # Generates static HTML (for deployment)
├── styles/
│   └── main.css               # All styling (design system in DESIGN.md)
├── images/                    # Organizer photos, logos
├── DESIGN.md                  # Visual design guidelines
├── AGENTS.md                  # Skills and commands (if using with Claude agents)
└── README.md                  # Quick start guide
```

---

## How It Works

### For Local Development
1. Edit CSV files in `data/` folder
2. Open `index.html` in a browser
3. JavaScript loads and renders content dynamically
4. See changes in real-time

### For Deployment
1. Run: `python scripts/generate.py`
2. This generates static HTML output
3. Upload generated files to hosting (GitHub Pages, Netlify, etc.)
4. Static site requires no database or backend

---

## Common Tasks

### Update Important Dates

**File**: `data/key-dates.csv`

1. Open in Excel or Google Sheets
2. Update the `date` column:
   ```
   id,label,date,description,status
   1,Submission Deadline,2026-06-15,Submit extended abstracts (2-4 pages),upcoming
   2,Notification of Acceptance,2026-07-01,Authors notified,upcoming
   3,Camera-Ready Deadline,2026-07-15,Final versions due,upcoming
   4,Workshop Date,2026-10-03,HCAI4IDS Workshop at NordiCHI 2026,upcoming
   ```
3. Save as CSV
4. Refresh browser (changes appear automatically)

### Add a New Organizer

**File**: `data/organizers.csv`

1. Open in spreadsheet editor
2. Add new row:
   ```
   id,name,affiliation,country,role,bio,email,profile_image
   6,New Person,University X,Country,Co-organizer,"Bio text here",email@example.com,photo.jpg
   ```
3. Save CSV
4. Copy profile photo to `images/` folder with matching filename
5. Refresh browser

### Update Topics

**File**: `data/topics.csv`

1. Edit existing rows or add new ones:
   ```
   id,title,description,icon
   9,New Topic,"Detailed description of the topic",icon_name
   ```
2. Save and refresh

### Change Submission Guidelines

**File**: `data/guidelines.csv`

1. Edit rows as needed:
   ```
   id,section,guideline,detail
   10,Format,New Rule,Specific details here
   ```
2. Save

### Add or Update Buttons/Links

**File**: `data/call-to-action.csv`

1. Update existing buttons or add new ones:
   ```
   id,label,url,button_text,type,description
   5,New Link,https://example.com,Click Here,secondary,Description
   ```
2. Types: `primary` (orange) or `secondary` (outline)
3. Save

---

## CSV Format Rules

Each CSV file follows strict formatting:

1. **First row is headers** (column names)
2. **One item per row** (no line breaks within cells)
3. **Comma-separated values** (use quotes if comma in content)
4. **UTF-8 encoding** (save as UTF-8, not Excel format)
5. **No empty rows** (delete blank rows at bottom)

### Example correct CSV:
```
id,name,description
1,Item One,"Description with, comma"
2,Item Two,Regular description
```

### Example INCORRECT CSV:
```
id,name,description
1,Item One,Multi-line
description (BREAKS!)
,,,
(extra blank rows)
```

---

## Adding Images

### Organizer Photos
1. Place profile image in `images/` folder
2. Name it something meaningful: `veronica.jpg`
3. Add filename to `organizers.csv` in `profile_image` column
4. Supported formats: JPG, PNG (max 200x200px recommended)

### Hero Banner or Section Images
Currently, the website has a gradient hero. To add images:
1. Place image in `images/` folder
2. Edit `main.css` to reference it in the hero section
3. Update `styles/` and test responsive display

---

## Editing Content Directly in HTML

Some content is in the HTML template (`index.html`). These should NOT change often:

- Section titles (About, Schedule, Topics, etc.)
- General explanatory text in sections
- Footer contact info

If you need to change these, edit `index.html` directly:
1. Search for the text you want to change
2. Edit the HTML content
3. Save and refresh

---

## Styling & Design

All styling is in `styles/main.css`. Refer to `DESIGN.md` for:
- Color palette
- Typography rules
- Spacing guidelines
- Component specifications

### Quick Style Changes

**Change primary color**: Edit `--primary` in `:root` of `main.css`
```css
:root {
    --primary: #1a3a52;  /* Change this */
}
```

**Change font size**: Edit size in `main.css`:
```css
h2 {
    font-size: 2rem;  /* Change this */
}
```

**Change spacing**: Edit scale variables:
```css
--spacing-lg: 2rem;  /* Change this */
```

---

## Responsive Design

The website is mobile-friendly and tested at:
- **Desktop**: 1200px+ (5-column organizer grid)
- **Tablet**: 768px (3-column grids)
- **Mobile**: 480px (1-column, stacked layout)

**Test responsiveness**:
1. Chrome DevTools: Ctrl+Shift+M (or Cmd+Shift+M)
2. Resize window to check breakpoints
3. Test on actual phone if possible

---

## Deployment

### Option 1: GitHub Pages (Free)
1. Create GitHub repository
2. Push files to `main` branch
3. Go to Settings > Pages > Source = main branch
4. Site published at `yourusername.github.io/reponame`

### Option 2: Netlify (Free)
1. Connect GitHub repo
2. Build command: `python scripts/generate.py`
3. Publish directory: `.` (root)
4. Auto-deploys on changes

### Option 3: Google Sites
1. Import HTML into Google Sites
2. Use Google Drive storage for CSV updates
3. Manually update if using static HTML

---

## Validation Checklist

Before deploying, run through this checklist:

**Content**:
- [ ] All dates filled in (no "TBD" remaining)
- [ ] All organizer bios are complete
- [ ] All topic descriptions are clear
- [ ] Submission guidelines are specific
- [ ] Contact email is correct

**Format**:
- [ ] All CSV files are valid (can open in Excel)
- [ ] No special characters that break CSV formatting
- [ ] All images are in `images/` folder with correct filenames
- [ ] Links in CTA buttons are correct and tested

**Design**:
- [ ] Page displays correctly at 1200px, 768px, 480px
- [ ] All text is readable (contrast OK)
- [ ] Buttons are clickable and link correctly
- [ ] Images load without errors

**Testing**:
- [ ] Open `index.html` in browser
- [ ] Check all sections load
- [ ] Click all buttons/links
- [ ] Test on mobile phone if possible
- [ ] Verify no console errors (F12 > Console)

---

## Troubleshooting

### Content not appearing
1. Check browser console (F12 > Console tab)
2. Verify CSV files are in `data/` folder
3. Check CSV formatting (no extra line breaks)
4. Verify field names match in HTML template

### Styling looks wrong
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check that `main.css` is in `styles/` folder
3. Verify no CSS conflicting with custom CSS
4. Test in different browser

### Images not loading
1. Check image filename matches CSV exactly (case-sensitive)
2. Verify image is in `images/` folder
3. Check file format is supported (JPG/PNG)
4. Try clearing browser cache

### Links don't work
1. Check URL in `call-to-action.csv` is complete (starts with http:// or https://)
2. Test URL in new browser tab
3. Verify email links start with `mailto:`

---

## Security Notes

Since this is a static website:
- No database to secure
- No backend to hack
- No sensitive data stored on server
- Organizer emails are public (intentional)

### Safe Practices
- Keep CSV files in version control (GitHub)
- Don't commit `.env` files with secrets
- Use HTTPS when hosting (GitHub Pages/Netlify do this automatically)
- Review changes before pushing to production

---

## Git Workflow

```bash
# Make changes to CSV files
# Edit data/key-dates.csv, etc.

# Check what changed
git status

# Stage changes
git add data/

# Commit with message
git commit -m "Update dates and add new organizer"

# Push to GitHub
git push origin main

# Site auto-updates (if using GitHub Pages)
```

---

## Maintenance Schedule

**Weekly**:
- Review submission platform for new abstracts
- Check organizer email for questions

**Monthly**:
- Update important dates CSV if deadlines change
- Verify all links still work

**Before Deployment**:
- Run validation checklist (above)
- Test responsiveness
- Proof-read all text
- Check color contrast
- Test on multiple browsers

---

## Getting Help

### Questions about content
Contact: HCAI4IDS organizers (organizers.hcai4ids@gmail.com)

### Technical issues
1. Check this file first (Ctrl+F to search)
2. Check DESIGN.md for styling questions
3. Run `python scripts/generate.py` and check output

### CSV Formatting Help
- Google Sheets: File > Export > CSV
- Excel: Save As > CSV (UTF-8)
- LibreOffice: Save As > CSV

---

## For Future Enhancements

Potential improvements (don't implement unless needed):
1. Add speaker abstracts PDF download
2. Add registration form
3. Add workshop live updates/live chat
4. Add photo gallery from workshop
5. Add YouTube video embed
6. Multi-language support

Each would require:
- New CSV file or column
- HTML template update
- CSS styling
- Testing

---

*Last Updated: 2026-05-22*
*Contact: HCAI4IDS organizers (organizers.hcai4ids@gmail.com)*
