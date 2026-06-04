/**
 * HCAI4IDS Workshop Website
 * Dynamic Content Loader from CSV
 */

// Parse CSV data
function parseCSV(csv) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            field += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            row.push(field.trim());
            field = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            row.push(field.trim());
            if (row.some(value => value !== '')) rows.push(row);
            row = [];
            field = '';
        } else {
            field += char;
        }
    }

    row.push(field.trim());
    if (row.some(value => value !== '')) rows.push(row);

    const headers = rows.shift().map(header => header.trim());
    return rows.map(values => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });
}

// Load and parse CSV file
async function loadCSV(filename) {
    try {
        const response = await fetch(`data/${filename}?v=20260602-program`);
        const csv = await response.text();
        return parseCSV(csv);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
}

function getInitials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join('');
}

function formatDate(dateString) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
    if (!match) return dateString;

    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Populate Important Dates Section
async function populateDates() {
    const container = document.getElementById('dates-content');

    if (!container) return;

    const dates = await loadCSV('key-dates.csv');
    if (dates.length === 0) return;

    container.innerHTML = dates
        .map(
            date => `
        <div class="date-row${date.label.includes('Submission Deadline') ? ' date-row-primary' : ''}">
            <div class="date-label">${date.label}</div>
            <div class="date-value">${formatDate(date.date)}</div>
            <div class="date-description">${date.description}</div>
        </div>
    `
        )
        .join('');
}

// Populate Schedule Section
async function populateSchedule() {
    const container = document.getElementById('schedule-content');

    if (!container) return;

    const schedule = await loadCSV('schedule.csv');
    if (schedule.length === 0) return;

    container.innerHTML = schedule
        .map(
            item => `
        <article class="schedule-block schedule-${item.type}">
            <div class="schedule-time">${item.time}</div>
            <div class="schedule-details">
                <h3>${item.activity}</h3>
                <p>${item.description}</p>
            </div>
        </article>
    `
        )
        .join('');
}

// Populate Topics Section
async function populateTopics() {
    const container = document.getElementById('topics-content');

    if (!container) return;

    const topics = await loadCSV('topics.csv');
    if (topics.length === 0) return;

    container.innerHTML = topics
        .map(
            topic => `
        <div class="topic-card">
            <h4>${topic.title}</h4>
            <p>${topic.description}</p>
        </div>
    `
        )
        .join('');
}

// Populate Guidelines Section
async function populateGuidelines() {
    const container = document.getElementById('guidelines-content');

    if (!container) return;

    const guidelines = await loadCSV('guidelines.csv');
    if (guidelines.length === 0) return;

    container.innerHTML = guidelines
        .map(
            guideline => `
        <div class="guideline-row">
            <div class="guideline-label">${guideline.guideline}</div>
            <div class="guideline-detail">${guideline.detail}</div>
        </div>
    `
        )
        .join('');
}

// Populate Call-to-Action Buttons
async function populateCTA() {
    const container = document.getElementById('cta-content');

    if (!container) return;

    const ctas = await loadCSV('call-to-action.csv');
    if (ctas.length === 0) return;

    container.innerHTML = ctas
        .map(cta => {
            if (!cta.url || cta.url === 'TBD') {
                return `<span class="btn btn-primary btn-disabled" title="${cta.description}">Submission Portal Coming Soon</span>`;
            }

            const btnClass = cta.type === 'primary' ? 'btn-primary' : 'btn-secondary';
            return `
            <a href="${cta.url}" class="btn ${btnClass}" title="${cta.description}">
                ${cta.button_text}
            </a>
        `;
        })
        .join('');
}

// Populate Organizers Section
async function populateOrganizers() {
    const container = document.getElementById('organizers-content');

    if (!container) return;

    const organizers = await loadCSV('organizers.csv');
    if (organizers.length === 0) return;

    container.innerHTML = organizers
        .map(
            org => `
        <div class="organizer-card">
            <div class="organizer-header">
                <div class="organizer-image">
                    ${org.profile_image ? `<img src="${org.profile_image}" alt="${org.name}">` : getInitials(org.name)}
                </div>
                <div class="organizer-heading">
                    <div class="organizer-name">${org.name}</div>
                    <div class="organizer-affiliation">${org.affiliation}</div>
                    <div class="organizer-email"><a href="mailto:${org.email}">${org.email}</a></div>
                </div>
            </div>
            <div class="organizer-bio">${org.bio}</div>
        </div>
    `
        )
        .join('');
}

// Initialize all sections
async function initializeContent() {
    await Promise.all([
        populateDates(),
        populateSchedule(),
        populateTopics(),
        populateGuidelines(),
        populateCTA(),
        populateOrganizers()
    ]);
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeContent);
