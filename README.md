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

# 📩 Formspree Enquiry Setup

This project uses **Formspree** to handle admission/enquiry form submissions without requiring a custom backend.

## 🚀 Setup Guide

### Step 1 — Create a Formspree Account

1. Visit [Formspree](https://formspree.io/)
2. Click **Sign Up**.
3. You can sign up using Google or GitHub.
4. After logging in, click **New Form**.
5. Give your form a name, for example:
   `BrightPath Admission Enquiry`
6. Enter the email address where you want to receive enquiry notifications.
7. After creating the form, Formspree will provide an endpoint URL similar to:

```text
https://formspree.io/f/xxxxxxxx
```

### Step 2 — Add the Endpoint

Add the Formspree endpoint to the `script.js` file:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Replace `xxxxxxxx` with your actual Formspree endpoint.

### Step 3 — Verify Your Email

After the first test submission, Formspree may send a confirmation/verification email to the configured email address.

**Make sure to complete the verification process** so that form submissions can continue working correctly.

---

# 📊 How Enquiries Are Handled

### Where are enquiries stored?

Submitted enquiries are stored in the **Formspree dashboard** on Formspree's servers.

Email notifications are also sent to the configured email address.

### Will I receive an email for every enquiry?

Yes. Formspree can send an email notification when a new enquiry is submitted.

### Will the student receive an automatic confirmation email?

The basic/free setup does **not automatically provide a student confirmation email**.

After submission, the student will only see the website's configured success/thank-you message.

Automatic email responses require additional Formspree features or another email/automation setup.

### Are enquiries automatically saved to Google Sheets?

No. Formspree does not automatically sync submissions to Google Sheets in the basic setup.

For Google Sheets integration, you can later use:

* Google Apps Script
* Zapier
* Make
* Another backend/database solution

### What happens if the notification email fails?

The email is only a **notification mechanism**.

The actual submission remains available in the Formspree dashboard, so an email delivery problem does not necessarily mean that the enquiry itself is lost.

### Can enquiries be edited later?

Formspree submissions are records rather than editable database entries.

You can:

* 👀 View submissions
* 📥 Export submissions as CSV
* 🗂️ Manage them through the Formspree dashboard

However, direct editing of submitted records is not provided as a normal database-style feature.

---

# 🔮 Future Improvements

The current Formspree setup is intended as a simple starting solution for a small institute.

Possible future upgrades include:

* ✅ Student automatic confirmation emails
* ✅ Google Sheets integration
* ✅ Custom admin dashboard
* ✅ Search and filter enquiries
* ✅ Edit/update student records
* ✅ Proper database integration
* ✅ Custom backend using Node.js / Firebase / Supabase

## 💡 Current Architecture

```text
Student
   ↓
Website Admission Form
   ↓
Formspree
   ├──→ Email Notification
   └──→ Formspree Dashboard
            ↓
         CSV Export
```

**Formspree acts as the current backend for handling enquiry submissions, keeping the project simple and easy to deploy on GitHub Pages.**
