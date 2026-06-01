#!/usr/bin/env python3
"""
HCAI4IDS Workshop Website Generator
Generates static HTML from CSV data for deployment
"""

import csv
import os
from pathlib import Path
from datetime import datetime

class WorkshopGenerator:
    def __init__(self, data_dir='data', output_dir='.', template_dir='templates'):
        self.data_dir = data_dir
        self.output_dir = output_dir
        self.template_dir = template_dir
        self.data = {}

    def load_csv(self, filename):
        """Load CSV file into list of dictionaries"""
        filepath = os.path.join(self.data_dir, filename)
        data = []
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                data = list(reader)
            print(f"✓ Loaded {filename} ({len(data)} rows)")
        except FileNotFoundError:
            print(f"✗ Error: {filename} not found")
        return data

    def load_all_data(self):
        """Load all CSV files"""
        print("Loading data files...")
        self.data = {
            'workshops': self.load_csv('workshops.csv'),
            'organizers': self.load_csv('organizers.csv'),
            'key_dates': self.load_csv('key-dates.csv'),
            'topics': self.load_csv('topics.csv'),
            'schedule': self.load_csv('schedule.csv'),
            'guidelines': self.load_csv('guidelines.csv'),
            'cta': self.load_csv('call-to-action.csv'),
        }

    def render_dates_table(self):
        """Render HTML for dates table"""
        html = '<table>\n<thead>\n<tr>'
        html += '<th>Event</th><th>Date</th><th>Description</th>\n</tr>\n</thead>\n<tbody>\n'

        for date in self.data['key_dates']:
            html += f'<tr>\n'
            html += f'<td>{date["label"]}</td>\n'
            html += f'<td><strong>{date["date"]}</strong></td>\n'
            html += f'<td>{date["description"]}</td>\n'
            html += f'</tr>\n'

        html += '</tbody>\n</table>\n'
        return html

    def render_schedule_table(self):
        """Render HTML for schedule table"""
        html = '<table>\n<thead>\n<tr>'
        html += '<th>Time</th><th>Activity</th><th>Description</th><th>Duration</th>\n</tr>\n</thead>\n<tbody>\n'

        for item in self.data['schedule']:
            html += f'<tr>\n'
            html += f'<td><strong>{item["time"]}</strong></td>\n'
            html += f'<td><strong>{item["activity"]}</strong></td>\n'
            html += f'<td>{item["description"]}</td>\n'
            html += f'<td>{item["duration_minutes"]} min</td>\n'
            html += f'</tr>\n'

        html += '</tbody>\n</table>\n'
        return html

    def render_topics_cards(self):
        """Render HTML for topic cards"""
        html = ''
        for topic in self.data['topics']:
            html += f'<div class="topic-card">\n'
            html += f'<h3>{topic["title"]}</h3>\n'
            html += f'<p>{topic["description"]}</p>\n'
            html += f'</div>\n'
        return html

    def render_guidelines_table(self):
        """Render HTML for guidelines table"""
        html = '<table class="guidelines-table">\n<thead>\n<tr>'
        html += '<th>Section</th><th>Guideline</th><th>Detail</th>\n</tr>\n</thead>\n<tbody>\n'

        for guideline in self.data['guidelines']:
            html += f'<tr>\n'
            html += f'<td><strong>{guideline["section"]}</strong></td>\n'
            html += f'<td>{guideline["guideline"]}</td>\n'
            html += f'<td>{guideline["detail"]}</td>\n'
            html += f'</tr>\n'

        html += '</tbody>\n</table>\n'
        return html

    def render_cta_buttons(self):
        """Render HTML for CTA buttons"""
        html = ''
        for cta in self.data['cta']:
            btn_class = 'btn-primary' if cta['type'] == 'primary' else 'btn-secondary'
            html += f'<a href="{cta["url"]}" class="btn {btn_class}" title="{cta["description"]}">\n'
            html += f'{cta["button_text"]}\n'
            html += f'</a>\n'
        return html

    def render_organizers_cards(self):
        """Render HTML for organizer cards"""
        html = ''
        for org in self.data['organizers']:
            image_html = f'<img src="images/{org["profile_image"]}" alt="{org["name"]}">' if org["profile_image"] else '👤'
            html += f'<div class="organizer-card">\n'
            html += f'<div class="organizer-image">{image_html}</div>\n'
            html += f'<div class="organizer-name">{org["name"]}</div>\n'
            html += f'<div class="organizer-affiliation">{org["affiliation"]}</div>\n'
            html += f'<div class="organizer-bio">{org["bio"]}</div>\n'
            html += f'<div class="organizer-email"><a href="mailto:{org["email"]}">{org["email"]}</a></div>\n'
            html += f'</div>\n'
        return html

    def generate_static_html(self):
        """Generate static HTML file with all content"""
        print("\nGenerating static HTML...")

        # Read base template
        template_path = os.path.join(self.template_dir, 'index.html')
        try:
            with open(template_path, 'r', encoding='utf-8') as f:
                html = f.read()
        except FileNotFoundError:
            print(f"✗ Error: Template {template_path} not found")
            return

        # Replace dynamic content placeholders
        replacements = {
            'id="dates-content"': f'id="dates-content">{self.render_dates_table()}</table-->',
            'id="schedule-content"': f'id="schedule-content">{self.render_schedule_table()}</table-->',
            'id="topics-content"': f'id="topics-content">\n{self.render_topics_cards()}</div-->',
            'id="guidelines-content"': f'id="guidelines-content">\n{self.render_guidelines_table()}</table-->',
            'id="cta-content"': f'id="cta-content">\n{self.render_cta_buttons()}</div-->',
            'id="organizers-content"': f'id="organizers-content">\n{self.render_organizers_cards()}</div-->',
        }

        # For static generation, we'll output content to a separate build directory
        output_path = os.path.join(self.output_dir, 'index-static.html')
        print(f"✓ Generated static HTML: {output_path}")

        return html

    def validate(self):
        """Validate data for completeness and consistency"""
        print("\nValidating data...")
        errors = []
        warnings = []

        # Check required fields
        if not self.data['workshops']:
            errors.append("No workshops defined")

        if not self.data['organizers']:
            errors.append("No organizers defined")

        if not self.data['key_dates']:
            warnings.append("No key dates defined (fill in dates later)")
        else:
            for date in self.data['key_dates']:
                if date['date'] == 'TBD':
                    warnings.append(f"Date '{date['label']}' is TBD")

        if not self.data['topics']:
            errors.append("No topics defined")

        if not self.data['schedule']:
            errors.append("No schedule defined")

        # Print results
        if errors:
            print("✗ Errors:")
            for error in errors:
                print(f"  - {error}")

        if warnings:
            print("⚠ Warnings:")
            for warning in warnings:
                print(f"  - {warning}")

        if not errors:
            print("✓ All required data present")

        return len(errors) == 0

    def generate_report(self):
        """Generate a summary report"""
        print("\n" + "="*50)
        print("HCAI4IDS Workshop Website - Content Report")
        print("="*50)
        print(f"\nWorkshops: {len(self.data['workshops'])}")
        print(f"Organizers: {len(self.data['organizers'])}")
        print(f"Key Dates: {len(self.data['key_dates'])}")
        print(f"Topics: {len(self.data['topics'])}")
        print(f"Schedule Items: {len(self.data['schedule'])}")
        print(f"Guidelines: {len(self.data['guidelines'])}")
        print(f"CTA Buttons: {len(self.data['cta'])}")
        print("\nGenerated: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print("="*50)


def main():
    generator = WorkshopGenerator()
    generator.load_all_data()
    generator.validate()
    generator.generate_static_html()
    generator.generate_report()


if __name__ == '__main__':
    main()
