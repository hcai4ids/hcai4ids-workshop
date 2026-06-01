# AGENTS.md - Workshop Website Skills & Commands

This file defines reusable skills and commands for managing the HCAI4IDS workshop website. Use these as reference for recurring tasks.

---

## Available Skills

### 1. `/workshop update-dates`
Update important dates in one command.

**Usage:**
```
/workshop update-dates
  --submission "2026-06-15"
  --notification "2026-07-01"
  --camera-ready "2026-07-15"
```

**What it does:**
- Reads current `data/key-dates.csv`
- Updates date values
- Validates date format (YYYY-MM-DD)
- Saves back to CSV
- Reports changes

**Files modified:**
- `data/key-dates.csv`

---

### 2. `/workshop add-organizer`
Add a new workshop organizer.

**Usage:**
```
/workshop add-organizer
  --name "Jane Doe"
  --affiliation "University X"
  --country "Sweden"
  --bio "Bio text here..."
  --email "jane@example.com"
  --role "Co-organizer"
```

**What it does:**
- Adds new row to `data/organizers.csv`
- Auto-assigns next available ID
- Validates email format
- Reminds to upload profile photo
- Reports success

**Files modified:**
- `data/organizers.csv`

---

### 3. `/workshop add-topic`
Add a new research topic.

**Usage:**
```
/workshop add-topic
  --title "Topic Title"
  --description "Detailed description of the research topic"
```

**What it does:**
- Adds to `data/topics.csv`
- Auto-assigns ID
- Validates description length
- Reports new topic ID

**Files modified:**
- `data/topics.csv`

---

### 4. `/workshop validate`
Check data completeness and consistency.

**Usage:**
```
/workshop validate
```

**Checks:**
- ✓ All required CSV files present
- ✓ No empty required fields
- ✓ Valid email formats
- ✓ Valid date formats (YYYY-MM-DD)
- ✓ Image files exist for organizers
- ✓ All links are valid URLs
- ✓ No duplicate entries

**Output:**
- List of errors (must fix)
- List of warnings (should review)
- Pass/Fail summary

---

### 5. `/workshop deploy`
Prepare site for deployment.

**Usage:**
```
/workshop deploy --target github
```

**Options:**
- `--target github`: Prepare for GitHub Pages
- `--target netlify`: Prepare for Netlify
- `--target static`: Generate static HTML

**What it does:**
1. Runs validation
2. Generates static HTML
3. Optimizes images
4. Creates deployment bundle
5. Reports ready for upload

**Output files:**
- `dist/index.html`
- `dist/styles/main.css`
- `dist/scripts/load-content.js`
- `dist/data/*.csv`
- `dist/images/*`

---

### 6. `/workshop audit`
Run quality checks before publication.

**Usage:**
```
/workshop audit
```

**Checks:**
- Content completeness (90%+ filled)
- Design compliance (DESIGN.md rules)
- Accessibility standards (contrast, alt text)
- Responsiveness (tested at breakpoints)
- Link validity (no 404s)
- Image optimization (file sizes)

**Output:**
- Ranked list of issues by severity
- Suggestions for fixes
- Pass/Fail for publication

---

### 7. `/workshop backup`
Create backup of current content.

**Usage:**
```
/workshop backup
```

**What it does:**
- Creates timestamped archive of all CSVs
- Stores in `backups/` folder
- Names as `backup-2026-05-22-143022.zip`
- Logs file location

**Output:**
- Backup file path
- Timestamp
- Files included

---

### 8. `/workshop status`
Show current state of workshop website.

**Usage:**
```
/workshop status
```

**Reports:**
- Number of organizers
- Number of topics
- Key dates (with days until/past)
- Submission status (open/closed/TBD)
- Last modified dates
- Deployment readiness score

---

## Advanced Commands

### `/content update`
Update any CSV field programmatically.

**Usage:**
```
/content update
  --file "organizers.csv"
  --id 1
  --field "bio"
  --value "New bio text here"
```

---

### `/content validate-csv`
Validate specific CSV file format.

**Usage:**
```
/content validate-csv --file "key-dates.csv"
```

**Checks:**
- Valid CSV format
- All required columns present
- No malformed rows
- Correct encoding (UTF-8)

---

### `/design check`
Verify design system compliance.

**Usage:**
```
/design check
  --page "index.html"
  --strict true
```

**Checks:**
- Color palette usage
- Typography hierarchy
- Spacing scale consistency
- Component patterns
- Accessibility compliance

---

### `/deploy preview`
Generate preview before deployment.

**Usage:**
```
/deploy preview --target github
```

**Output:**
- Preview URL
- Expected deployment time
- Changes summary
- Rollback instructions

---

## Task Templates

### Setting Up New Workshop
```bash
/workshop update-dates --submission "2026-06-15" --notification "2026-07-01" --camera-ready "2026-07-15"
/workshop validate
/workshop audit
/workshop deploy --target github
```

### Monthly Maintenance
```bash
/workshop status
/workshop validate
/workshop backup
```

### Before Publication
```bash
/workshop validate
/workshop audit
/design check --strict true
/workshop deploy --target github
```

---

## Error Handling

### Common Issues & Fixes

**"CSV file not found"**
- Check file exists in `data/` folder
- Verify filename spelling
- Ensure UTF-8 encoding

**"Invalid date format"**
- Use YYYY-MM-DD format
- Example: 2026-06-15 (not 6/15/26)

**"Email format invalid"**
- Include @ symbol
- Include domain (.com, .edu, etc.)
- Example: person@example.com

**"Image not found"**
- Check image in `images/` folder
- Verify filename matches CSV exactly
- Use JPG or PNG format

---

## Automation Workflows

### Daily Status Check
Schedule: Every morning at 9 AM
```
/workshop status
```

### Weekly Backup
Schedule: Every Friday at 5 PM
```
/workshop backup
```

### Pre-Deployment Quality Gate
Trigger: Before any push to GitHub
```
/workshop validate
/workshop audit
/design check --strict true
```

---

## Integration Examples

### GitHub Action
```yaml
name: Validate Workshop Site
on: [push]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate
        run: python scripts/validate.py
      - name: Audit
        run: python scripts/audit.py
```

### Google Sheets Sync
```
When: Google Sheet edited
Then: Run /content update
Then: Run /workshop validate
Then: Notify organizers if errors
```

---

## Permission Requirements

For running these commands, ensure permissions for:
- Read access to `data/`, `scripts/`, `styles/` folders
- Write access to create backups
- Shell execution for Python scripts
- Git operations for deployment

---

## FAQ

**Q: How do I revert a change?**
A: Use `/workshop backup` to restore a previous version from the backup folder.

**Q: Can I schedule tasks?**
A: Yes, use automation tools (GitHub Actions, Zapier, IFTTT) to trigger commands on schedule.

**Q: What if validation fails?**
A: Fix errors shown in the report, then run `/workshop validate` again.

**Q: Can multiple people edit at once?**
A: Yes, but coordinate via GitHub. Use branches for simultaneous edits.

---

*Last Updated: 2026-05-22*
