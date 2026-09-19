# BrightPath Coaching Centre — Website

A blackboard/chalk-themed, responsive website for BrightPath Coaching Centre, built with plain HTML, CSS and JavaScript. Ready to deploy on GitHub Pages.

## Structure

```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── bg-video.mp4        ← NOT included — add your hero video with this exact name
    ├── hero-fallback.jpg   ← placeholder poster shown while/if the video doesn't load
    ├── intro.png           ← placeholder icon — replace with a transparent PNG
    ├── teachers.png        ← placeholder icon — replace with a transparent PNG
    ├── courses.png         ← placeholder icon — replace with a transparent PNG
    ├── teacher-1.png       ← placeholder avatar for Amit Kumar
    ├── teacher-2.png       ← placeholder avatar for Neha Singh
    └── teacher-3.png       ← placeholder avatar for Rahul Verma
```

The three feature icons (`intro.png`, `teachers.png`, `courses.png`) and the three teacher photos are simple generated placeholders so the layout renders correctly. Swap in the real, background-removed PNGs and real teacher photos later — just keep the same filenames and the layout will not need any changes.

`bg-video.mp4` is **not included** in this build (no video asset was provided). The hero section already has a dark charcoal fallback background, so the page looks correct with or without the video — just drop your video file into `assets/bg-video.mp4` when it's ready.

Optional testimonial images (`student-1.png`, `student-2.png`, `student-3.png`) are not required — the testimonial section works without them.

## Things to update before launch

Open `script.js` and edit the `CONTACT_CONFIG` object near the top:

```js
var CONTACT_CONFIG = {
  phoneDisplay: '98XXXXXX21',   // shown on the page
  phoneTel: '',                 // e.g. '+919812345678' — enables the Call Now button
  whatsappNumber: '',           // e.g. '919812345678' — enables the WhatsApp button
  whatsappMessage: '...'
};
```

Until `phoneTel` / `whatsappNumber` are filled in, the Call Now / WhatsApp buttons show a friendly "coming soon" message instead of dialing a placeholder number.

Also in `script.js`, `FORM_ENDPOINT` is `null`, which makes the admission form validate and show a success message without actually sending data anywhere (a working frontend demo). Point it at a real form backend (Formspree, a serverless function, etc.) when one is ready:

```js
var FORM_ENDPOINT = 'https://your-form-endpoint.example.com';
```

Testimonials in `index.html` are clearly marked as placeholders (see the `<!-- PLACEHOLDER TESTIMONIALS -->` comment) — replace with genuine feedback before launch.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set the source to the branch containing these files (e.g. `main`, root folder).
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` — all chalk-writing, underline, and reveal animations are disabled for users who request reduced motion.
- Keyboard-focus styles are visible throughout.
- The admission form validates required fields, shows inline errors, prevents duplicate submissions with a loading state, and announces success/error via `aria-live`.
- No external JS frameworks — vanilla JS keeps the page light on low/mid-range mobile devices.
