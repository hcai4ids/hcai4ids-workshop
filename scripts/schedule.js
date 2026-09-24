/**
 * HCAI4IDS workshop schedule, calendar export, and print controls.
 */

function parseProgramCSV(csv) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let index = 0; index < csv.length; index += 1) {
        const character = csv[index];
        const nextCharacter = csv[index + 1];

        if (character === '"' && inQuotes && nextCharacter === '"') {
            field += '"';
            index += 1;
        } else if (character === '"') {
            inQuotes = !inQuotes;
        } else if (character === ',' && !inQuotes) {
            row.push(field.trim());
            field = '';
        } else if ((character === '\n' || character === '\r') && !inQuotes) {
            if (character === '\r' && nextCharacter === '\n') index += 1;
            row.push(field.trim());
            if (row.some(value => value !== '')) rows.push(row);
            row = [];
            field = '';
        } else {
            field += character;
        }
    }

    row.push(field.trim());
    if (row.some(value => value !== '')) rows.push(row);

    const headers = rows.shift().map(header => header.trim());
    return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])));
}

function escapeProgramHTML(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function durationInMinutes(start, end) {
    const toMinutes = time => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60) + minutes;
    };

    return toMinutes(end) - toMinutes(start);
}

function escapeCalendarText(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/\r?\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
}

function compactDate(date) {
    return date.replace(/-/g, '');
}

function compactTime(time) {
    return time.replace(':', '') + '00';
}

function foldCalendarLine(line) {
    const characters = Array.from(line);
    const folded = [];

    while (characters.length > 72) {
        folded.push(characters.splice(0, 72).join(''));
    }
    folded.push(characters.join(''));

    return folded.join('\r\n ');
}

function buildCalendarFile(schedule, workshop) {
    const workshopDate = workshop.date_start || '2026-10-03';
    const timezone = 'Europe/Helsinki';
    const location = 'Academill, Åbo Akademi University, Vaasa, Finland';
    const parentItems = schedule.filter(item => !item.parent_id);
    const childItems = schedule.filter(item => item.parent_id);
    const calendarLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HCAI4IDS//Workshop Program//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:HCAI4IDS Workshop Program',
        `X-WR-TIMEZONE:${timezone}`
    ];

    parentItems.forEach(item => {
        const children = childItems.filter(child => child.parent_id === item.id);
        const childDetails = children
            .map(child => `${child.start}–${child.end} ${child.title || child.activity} (${child.speaker || 'Details to be confirmed'})`)
            .join('\n');
        const keynoteDetails = item.type === 'keynote'
            ? [
                item.title,
                [item.speaker, item.speaker_title, item.institution].filter(Boolean).join(', ')
            ].filter(Boolean).join('\n')
            : '';
        const description = [item.description, keynoteDetails, childDetails].filter(Boolean).join('\n\n');
        const uid = `${workshopDate}-${item.id.replace(/[^a-zA-Z0-9]/g, '-') }@hcai4ids-workshop`;

        calendarLines.push(
            'BEGIN:VEVENT',
            `UID:${uid}`,
            'DTSTAMP:20260921T120000Z',
            `DTSTART;TZID=${timezone}:${compactDate(workshopDate)}T${compactTime(item.start)}`,
            `DTEND;TZID=${timezone}:${compactDate(workshopDate)}T${compactTime(item.end)}`,
            `SUMMARY:${escapeCalendarText(item.activity)}`,
            `DESCRIPTION:${escapeCalendarText(description)}`,
            `LOCATION:${escapeCalendarText(location)}`,
            'STATUS:CONFIRMED',
            'TRANSP:OPAQUE',
            'END:VEVENT'
        );
    });

    calendarLines.push('END:VCALENDAR');
    return calendarLines.map(foldCalendarLine).join('\r\n') + '\r\n';
}

function downloadCalendar(schedule, workshop) {
    const calendar = buildCalendarFile(schedule, workshop);
    const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const workshopDate = workshop.date_start || '2026-10-03';

    link.href = url;
    link.download = `HCAI4IDS-workshop-program-${workshopDate}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function renderSubsession(item) {
    const pending = /\bTBC\b|to be confirmed/i.test(`${item.title} ${item.speaker}`);

    return `
        <li class="subsession${pending ? ' is-pending' : ''}">
            <time datetime="${escapeProgramHTML(item.start)}">${escapeProgramHTML(item.start)}&ndash;${escapeProgramHTML(item.end)}</time>
            <span class="subsession-copy">
                <strong>${escapeProgramHTML(item.title || item.activity)}</strong>
                <small>${escapeProgramHTML(item.speaker || (pending ? 'Details to be confirmed' : ''))}</small>
            </span>
        </li>
    `;
}

function renderAgendaRow(item, children) {
    const minutes = durationInMinutes(item.start, item.end);
    const isSecondary = item.type === 'break' || item.type === 'transition';
    const proportionalHeight = Math.min(350, Math.max(100, 50 + (minutes * 5)));
    const mobileProportionalHeight = Math.min(430, Math.max(180, 130 + (minutes * 5)));
    const keynoteMeta = item.type === 'keynote'
        ? `
            <div class="keynote-placeholder">
                <strong class="keynote-talk-title">${escapeProgramHTML(item.title)}</strong>
                <strong class="keynote-speaker-name">${escapeProgramHTML(item.speaker)}</strong>
                <small class="keynote-speaker-meta">${escapeProgramHTML(item.speaker_title)}<br>${escapeProgramHTML(item.institution)}</small>
                <a class="keynote-detail-link" href="keynote.html">View keynote abstract and bio <span aria-hidden="true">&rarr;</span></a>
            </div>
        `
        : '';
    const descriptionMarkup = ['presentation', 'keynote'].includes(item.type)
        ? ''
        : `<p>${escapeProgramHTML(item.description)}</p>`;
    const subsessions = children.length
        ? `<ol class="subsession-list">${children.map(renderSubsession).join('')}</ol>`
        : '';

    return `
        <div class="agenda-row agenda-${escapeProgramHTML(item.type)}${isSecondary ? ' agenda-row-secondary' : ''}" style="--duration-height: ${proportionalHeight}px; --mobile-duration-height: ${mobileProportionalHeight}px">
            <div class="agenda-time">
                <time datetime="${escapeProgramHTML(item.start)}">${escapeProgramHTML(item.start)}</time>
                <span class="time-separator" aria-hidden="true">&ndash;</span>
                <time datetime="${escapeProgramHTML(item.end)}">${escapeProgramHTML(item.end)}</time>
            </div>
            <article class="agenda-event">
                <h3>${escapeProgramHTML(item.activity)}</h3>
                ${descriptionMarkup}
                ${keynoteMeta}
                ${subsessions}
            </article>
        </div>
    `;
}

async function populateProgramUpdate() {
    const container = document.getElementById('program-update-content');
    if (!container) return;

    try {
        const [programResponse, workshopResponse] = await Promise.all([
            fetch('data/schedule.csv?v=20260923-schedule-clean', { cache: 'no-store' }),
            fetch('data/workshops.csv?v=20260922-program', { cache: 'no-store' })
        ]);
        if (!programResponse.ok || !workshopResponse.ok) throw new Error('Unable to load program data');

        const schedule = parseProgramCSV(await programResponse.text());
        const workshops = parseProgramCSV(await workshopResponse.text());
        const workshop = workshops[0] || {};
        const parentItems = schedule.filter(item => !item.parent_id);
        const childItems = schedule.filter(item => item.parent_id);

        container.innerHTML = parentItems
            .map(item => renderAgendaRow(item, childItems.filter(child => child.parent_id === item.id)))
            .join('');

        document.getElementById('download-calendar')?.addEventListener('click', () => downloadCalendar(schedule, workshop));
        document.getElementById('print-program')?.addEventListener('click', () => window.print());
    } catch (error) {
        console.error('Unable to load the workshop program:', error);
        container.innerHTML = '<p class="agenda-error">The program could not be loaded. Please run the website through a local web server.</p>';
    }
}

document.addEventListener('DOMContentLoaded', populateProgramUpdate);
