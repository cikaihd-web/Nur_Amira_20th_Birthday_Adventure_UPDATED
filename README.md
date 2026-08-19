# Nur Amira Batrisya — 20th Birthday Adventure ♡

A mobile-friendly interactive birthday treasure-hunt website.

## Files

- `index.html` — all seven stages
- `style.css` — design, animations and envelope
- `script.js` — progression, photo checkpoints, hearts and music
- `assets/turning-page.mp3` — add your own legally obtained copy of the instrumental here

## Run in VS Code

1. Open this folder in VS Code.
2. Put the instrumental audio file in `assets/` and name it `turning-page.mp3`.
3. Open `index.html` with a local server (VS Code Live Server is easiest).
4. Test the full flow on your phone before the birthday.
5. Push the folder to GitHub and enable GitHub Pages.

## Important

The photo step is intentionally a completion checkpoint rather than AI image recognition:
the visitor takes/selects a photo, and the next stage unlocks. The selected photo is not uploaded anywhere.

Progress is stored in the browser's localStorage. To reset the demo, open browser DevTools and run:

localStorage.clear();

The final page starts the instrumental when the envelope is tapped. This is deliberate because mobile browsers generally block audio autoplay until the user interacts with the page.
