# AuraNav - Interactive Fixed Navigation Menu

A modern, responsive, interactive navigation menu engineered with HTML5, CSS3 (vanilla custom properties), and JavaScript. Built for **SkillCraft Technology (SCT_WD_1)**.

## ✨ Features

- **Fixed Positioning (`position: fixed; top: 0`)**: Anchored securely to the top across all pages (`index.html`, `about.html`, `services.html`, `contact.html`).
- **Dynamic Scroll Transformation**:
  - Automatically transitions from a spacious, translucent floating look to an elevated frosted glass navbar (`backdrop-filter: blur(24px)`) when scrolled past 40px.
  - Reduced height, glowing cyan bottom border, and subtle drop shadow on scroll.
  - Dynamic scroll progress bar right beneath the header that tracks page reading percentage in real time.
- **Hover Micro-Interactions**:
  - Centered expanding gradient underline indicator on menu items.
  - Soft pill hover background with subtle lift effect.
  - Dropdown menu with animated slide and fade-in, icons, and badges.
- **Mobile Responsive Drawer**:
  - Custom 3-line hamburger menu that smoothly animates into an 'X'.
  - Sliding backdrop drawer with full navigation links and CTA button.
- **Dark / Light Theme Switcher**:
  - Seamless toggle with persistent `localStorage` memory and smooth color transitions.
- **Interactive Lab / Playground**:
  - Real-time controls on the home page allowing instant simulation of scroll states and accent color palettes.

## 🚀 Running the Live Server

### Option 1: Using the provided Python Live Server
Dependencies installed:
- `livereload`
- `tornado`

Run from PowerShell or terminal:
```bash
python server.py
```
Or double-click:
```
run_server.bat
```
Then navigate to [http://localhost:3000](http://localhost:3000).

## 📁 File Structure

```
SCT_WD_1/
├── css/
│   └── style.css       # Complete modern design system and navigation animations
├── js/
│   └── nav.js          # Scroll listener, progress bar, mobile drawer, themes
├── index.html          # Main landing page with interactive lab
├── about.html          # About page with fixed navbar
├── services.html       # Services page with fixed navbar & dropdown links
├── contact.html        # Contact page with fixed navbar & contact form
├── server.py           # Live reloading server script
├── run_server.bat      # Windows batch file to start live server
└── README.md           # Project documentation
```
