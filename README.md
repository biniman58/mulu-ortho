# Mulu Ortho

Ordering web app for Mulu Ortho, an orthopedic supply pharmacy: check implant stock and sizes, then order on WhatsApp.

Live: https://mulu-ortho-bd.netlify.app/

## Stack
- One static `index.html` (HTML, CSS, vanilla JavaScript; no build step)
- PWA: `manifest.json` + service worker `sw.js` (installable, works offline)
- Orders sent as a WhatsApp message to the chosen branch
- Optional live stock from a published Google Sheet (CSV)
- Hosted on Netlify (`_headers` sets the manifest content type)

## Editing
Settings (phone numbers, branches, prices on/off, stock sheet link) are in the `PHARMACY` block at the top of the script in `index.html`.
After changing files, bump the cache name in `sw.js` (e.g. `mulu-ortho-v11` → `v12`) so installed apps update.
