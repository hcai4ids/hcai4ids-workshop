# DESIGN.md - HCAI4IDS Workshop Website Design System

## Master Design Rules

This document defines the visual identity and design principles for the HCAI4IDS workshop website. All pages should follow these rules unless explicitly overridden in page-specific DESIGN files.

---

## Color Palette

### Primary Colors
- **Primary Blue** (`--primary: #1a3a52`): Main brand color, used for headers, footers, navigation
- **Secondary Blue** (`--secondary: #2c5aa0`): Links, emphasis elements, secondary headings
- **Accent Orange** (`--accent: #e67e22`): Call-to-action, highlights, section dividers
- **Light Orange** (`--accent-light: #f39c12`): Lighter accent for emphasis

### Neutral Colors
- **Dark Text** (`--text-dark: #2c3e50`): Primary text color
- **Light Text** (`--text-light: #ecf0f1`): Text on dark backgrounds
- **Light Background** (`--bg-light: #f8f9fa`): Section backgrounds, alternating rows
- **White** (`--bg-white: #ffffff`): Page background, cards
- **Border** (`--border: #bdc3c7`): Table borders, dividers

### Semantic Colors
- **Success Green** (`--success: #27ae60`): Checkmarks, positive actions
- **Warning Orange** (`--warning: #f39c12`): Important dates, warnings

### Usage Guidelines
1. Use Primary Blue for trust and authority (navigation, main sections)
2. Use Accent Orange for calls-to-action (submit buttons, important dates)
3. Keep sufficient contrast: minimum 4.5:1 for text
4. Avoid using orange on light backgrounds without sufficient contrast

---

## Typography

### Font Stack
- **Headings** (h1-h6): Georgia, Times New Roman, serif
- **Body Text**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Monospace**: Courier New (for code, templates)

### Font Sizes
- **h1**: 2.5rem (40px) - Page title
- **h2**: 2rem (32px) - Section heading with bottom border
- **h3**: 1.5rem (24px) - Subsection heading
- **h4**: 1.2rem (19px) - Card headings
- **Body**: 1rem (16px) - Default text
- **Small**: 0.9rem (14px) - Footer, notes

### Line Height
- Headings: 1.2-1.3
- Body text: 1.6
- Tables: normal

### Font Weight
- Regular: 400
- **Bold**: 700 (headings, labels)
- **SemiBold**: 600 (navigation, emphasis)

### Usage Guidelines
1. Use serif fonts for headings to convey academic authority
2. Use sans-serif for body to maintain readability
3. Never use text smaller than 14px for body content
4. Maintain consistent line-height for accessibility

---

## Spacing Scale

```
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
--spacing-2xl: 4rem (64px)
```

### Component Spacing Rules
- Section padding: `--spacing-2xl` top and bottom
- Container padding: `--spacing-lg` (32px)
- Card padding: `--spacing-lg` (32px)
- Margin between related elements: `--spacing-md` (24px)
- Margin between sections: `--spacing-xl` (48px)

### Usage Guidelines
1. Always use the scale—never arbitrary pixel values
2. Use consistent spacing between related elements
3. Larger spacing between different content groups
4. Mobile: reduce top-level section padding by 50%

---

## Components

### Navigation
- Sticky positioning with shadow
- Primary Blue background
- White text with Accent Orange on hover
- Links spaced `--spacing-lg` apart

### Hero Section
- Gradient background (Primary → Secondary Blue)
- Large centered heading (2.8rem)
- Tagline in Light Orange
- Padding: `--spacing-2xl`

### Section Headings (h2)
- Primary Blue color
- 3px bottom border in Accent Orange
- Padding-bottom: `--spacing-md`
- Margin-bottom: `--spacing-lg`

### Cards
- White background
- 8px border-radius
- `--shadow-md` drop shadow
- 4px top border in Secondary Blue (topic cards) or Accent Orange (others)
- Padding: `--spacing-lg`
- Hover: translate up 5px, increase shadow

### Buttons
- Primary buttons: Secondary Blue background, white text
- Secondary buttons: transparent background, 2px Secondary Blue border
- Padding: `--spacing-md` vertical, `--spacing-xl` horizontal
- Hover: change color to Accent Orange, add shadow, translate up 2px

### Tables
- Striped rows: alternate between white and light gray
- Header: Primary Blue background, white text
- Border: 1px solid Border color
- Cell padding: `--spacing-md`
- Hover: light gray background on row

### Lists
- Checkmark prefix in Success Green for acceptance lists
- Left border accent (4px) in Secondary Blue
- Item margin: `--spacing-sm`
- Left padding for icon space: `--spacing-md`

### Organizer Cards
- Circular image (100x100px)
- Name in Primary Blue (h3)
- Affiliation in Secondary Blue (semi-bold)
- Bio text: 0.9rem
- Email link in Secondary Blue

---

## Layout Patterns

### Section Layout
```
Section with alternating backgrounds:
- Even sections: white background
- Odd sections: light gray background
```

### Grid Layouts
- **Topics Grid**: 3-column on desktop, 1-column on mobile (auto-fit, minmax 280px)
- **Outcomes Grid**: 3-column on desktop (auto-fit, minmax 300px)
- **Organizers Grid**: 5-column on desktop (auto-fit, minmax 250px)

### Responsive Breakpoints
- Desktop: 1200px container max-width
- Tablet (768px): Stack 2-column grids to 1-column
- Mobile (480px): Full-width, reduce font sizes by 20%

---

## Shadows

```
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.1)
```

### Usage
- Cards: `--shadow-md`
- Buttons on hover: `--shadow-md`
- Navigation (sticky): `--shadow-md`
- Small interactive elements: `--shadow-sm`
- Enlarged on interaction: `--shadow-lg`

---

## Interactions

### Hover States
- Links: color changes to Accent Orange, underline added
- Buttons: background changes to Accent Orange, shadow increases, translate up 2px
- Cards: transform translate up 5px, shadow increases
- Table rows: background changes to light gray

### Transitions
- Duration: 0.3s
- Timing: ease (default)
- Properties: color, background-color, transform, box-shadow

### Focus States
- All interactive elements must have visible focus states
- Outline: 2px solid Accent Orange
- Offset: 2px

---

## Accessibility Standards

### Color Contrast
- Text on background: minimum 4.5:1
- UI components: minimum 3:1
- Test with: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Typography
- Minimum font size: 14px for any readable text
- Line height: 1.6 minimum for body text
- Letter spacing: normal (never negative)

### Interactive Elements
- Minimum touch target: 44x44px (mobile)
- Minimum click target: 24x24px (desktop)
- All buttons and links keyboard accessible

### Semantic HTML
- Use `<button>` for buttons, not `<a>` or `<div>`
- Use `<table>` for tabular data, not `<div>`
- Use heading hierarchy (h1 → h2 → h3, no skipping)
- Use descriptive link text (not "click here")

### Animations
- Respect `prefers-reduced-motion` media query
- Keep animations subtle (no bounce/elastic)
- Use expo-out easing for motion

---

## Do's ✓

- Use the color palette consistently
- Apply spacing from the scale
- Keep elements aligned to the grid
- Test contrast on real backgrounds
- Use semantic HTML elements
- Provide hover/focus states for interactive elements
- Use rounded corners (8px) for cards
- Add bottom borders to section headings
- Keep the design clean and professional
- Test responsiveness at 375px, 768px, 1024px, 1440px

---

## Don'ts ✗

- Don't use colors outside the palette
- Don't use arbitrary pixel values (use spacing scale)
- Don't nest cards unnecessarily (flatten hierarchy)
- Don't use text smaller than 14px
- Don't apply shadows to shadows (max 1 shadow per element)
- Don't use gradients except in hero section
- Don't use dark blue with neon colors
- Don't use glass morphism or blur effects
- Don't use all caps for body text (headings only)
- Don't forget accessibility requirements
- Don't create identical grid items (vary sizes when possible)

---

## Page-Specific Overrides

Individual pages may override global rules by including their own `DESIGN-[pagename].md` file. These files should only specify what differs from the master design, not repeat global rules.

Example structure:
```
DESIGN-call-for-papers.md
- Override: Different background color for CTA section
- Override: Larger buttons (custom sizing)
```

---

## Implementation Checklist

Before publishing any page:

- [ ] All colors from palette or explicitly approved
- [ ] Spacing using `--spacing-*` variables
- [ ] Responsive at breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Focus states visible for all interactive elements
- [ ] Hover states implemented for links/buttons
- [ ] Table headers use proper `<thead>` tags
- [ ] Images have alt text
- [ ] Form labels associated with inputs
- [ ] No single-color icons (must be icon + text or icon + hover state)
- [ ] Tested with keyboard navigation
- [ ] Reviewed by peer before merge

---

## Tools & Resources

- **Color Checking**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Responsive Testing**: Chrome DevTools device emulation
- **Typography**: Google Fonts, system fonts prioritized
- **Icons**: Consider accessibility (text labels or aria-labels)

---

*Last Updated: 2026-05-22*
