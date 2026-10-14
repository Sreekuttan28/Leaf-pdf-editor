# Leaf – Free PDF Editor

Made by **Mokuttan Labs**.

A free PDF editor that runs **entirely in the browser**. Open a PDF, change its text, add text or images, highlight, draw, delete pages, and save the result to your device.

- No sign-in, no server, no database, no cost.
- Files are never uploaded. All work happens in the browser tab.
- Installable on Android, iPhone, Windows, Mac and Linux (PWA), and works offline.
- Can be packaged as an Android APK (see [Part 5](#5-make-an-android-apk)).

---

## Quick start on a phone, without hosting (single file)

If you unzipped the project on a phone and opened `index.html` straight from the file manager, you will see **"The PDF engine did not load"**. That is expected. A browser that opens one file from storage cannot read the other files next to it (the `vendor/` folder), and installing or offline mode needs `https://`.

Use **`leaf-single-file.html`** instead. It is the same app with the PDF libraries and fonts built into one file, so it works with no hosting and no internet.

**Android**
1. Copy `leaf-single-file.html` to your Downloads folder.
2. Open it with **Chrome**. In the Files app, tap the file and choose **Chrome**. Or type `file:///sdcard/Download/leaf-single-file.html` in Chrome's address bar.
3. Tap **Open a PDF**. Tip: in Chrome's menu you can add the page to your home screen as a shortcut.

**iPhone / iPad**
Safari's Files preview does not run web apps from a local file, so host the folder (see Part 3) and use Add to Home Screen (Part 4).

The single file cannot be "installed" as an app and does not auto-update. For the installable app or the APK, use the hosted version.

---

## Contents

1. [What is in this folder](#1-what-is-in-this-folder)
2. [Run it on your computer](#2-run-it-on-your-computer)
3. [Put it online for free](#3-put-it-online-for-free)
4. [Install it on a phone or computer](#4-install-it-on-a-phone-or-computer)
5. [Make an Android APK](#5-make-an-android-apk)
6. [How to use the editor](#6-how-to-use-the-editor)
7. [How it works (for developers and vibe-coding tools)](#7-how-it-works)
8. [Customising](#8-customising)
9. [Known limits](#9-known-limits)
10. [Troubleshooting](#10-troubleshooting)
11. [Licences](#11-licences)

---

## 1. What is in this folder

```
leaf-pdf-editor/
├── index.html              The whole app: layout, styles and logic in one file
├── leaf-single-file.html   Same app with everything built in. Works from a phone's file manager
├── manifest.webmanifest    Makes the app installable (name, icons, colours)
├── sw.js                   Service worker: caches files so the app works offline
├── package.json            Only used for the optional "npm start" local server
├── .nojekyll               Tells GitHub Pages to serve files as they are
├── icons/                  App icons (192, 512, maskable 512, Apple touch, SVG favicon)
├── vendor/
│   ├── pdf.min.js          pdf.js 3.11.174 – shows PDF pages and reads their text
│   ├── pdf.worker.min.js   pdf.js background worker
│   ├── pdf-lib.min.js      pdf-lib 1.17.1 – writes the edited PDF
│   ├── fonts.css           Local @font-face rules
│   ├── fonts/              Figtree and Instrument Serif (woff2)
│   └── LICENSE-*.txt       Licences of the bundled libraries and fonts
└── README.md               This file
```

There is **no build step**. Everything is plain HTML, CSS and JavaScript. The libraries are already included, so the app makes **zero requests to other websites**.

---

## 2. Run it on your computer

Service workers and installing only work over `http://localhost` or `https://`, so do not just double-click `index.html` for full features (editing still works that way, but offline and install do not).

**Option A – Python (nothing to install on most computers)**
```bash
cd leaf-pdf-editor
python3 -m http.server 8080
```
Open <http://localhost:8080>.

**Option B – Node.js**
```bash
cd leaf-pdf-editor
npm start
```
Open <http://localhost:8080>.

**Option C – VS Code**
Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".

---

## 3. Put it online for free

Any static host works because the app is only files. Pick one.

### GitHub Pages
1. Create a GitHub account and a new repository, for example `leaf-pdf`. Make it public.
2. Upload **everything inside** `leaf-pdf-editor/` (so `index.html` is at the top of the repo). On the GitHub website: **Add file → Upload files**, drag all files and folders in, then **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**, then **Save**.
4. Wait one to two minutes. Your app is at `https://YOUR-USERNAME.github.io/leaf-pdf/`.

### Netlify (fastest, no account for a first try)
1. Open <https://app.netlify.com/drop>.
2. Drag the `leaf-pdf-editor` folder onto the page.
3. You get a live `https://something.netlify.app` link. Free accounts can rename it.

### Cloudflare Pages
1. In the Cloudflare dashboard open **Workers & Pages → Create → Pages → Upload assets**.
2. Upload the folder. Build command: none. Output directory: the folder root.

### Vercel
1. Import the GitHub repo at <https://vercel.com/new>.
2. Framework preset: **Other**. Leave build and output settings empty. Deploy.

> The link must be **https**. All the hosts above provide that automatically.

---

## 4. Install it on a phone or computer

Once the site is online:

| Device | Steps |
|---|---|
| **Android (Chrome)** | Open the link. Tap **Install** in Leaf's top bar, or Chrome menu ⋮ → **Add to Home screen / Install app**. |
| **iPhone / iPad (Safari)** | Open the link in Safari. Tap **Share** → **Add to Home Screen**. (iOS does not show an install button.) |
| **Windows / Mac / Linux (Chrome or Edge)** | Click the install icon at the right of the address bar, or the **Install** button in Leaf. |

The **Install app** button in Leaf's top bar does this for you. If the browser offers one-tap install, it shows the prompt. Otherwise it shows the exact steps for your device.

After installing, Leaf opens full screen like a normal app and works without internet. On Android and desktop Chrome it also appears in "Open with" for `.pdf` files.

---

## 5. Make an Android APK (optional, and usually not needed)

> **If an APK says "App not installed" or "This app cannot be installed":** this is common with APKs generated from websites. The usual causes are an APK that was not signed, an older copy of the app with a different signature already on the phone (uninstall it first), a phone that blocks unknown sources or Play Protect, or a download that did not finish. The simplest fix is to skip the APK and use **Add to Home screen** (Part 4). It gives the same result: an icon on your home screen that opens Leaf full screen, with no installer errors.

An APK is optional. The installed web app above already behaves like an app. Make an APK if you want a file to share or to publish on the Play Store.

### Easiest: PWABuilder (no coding, free)
1. Deploy the app first (Part 3) so you have an `https://` link.
2. Go to <https://www.pwabuilder.com>, paste your link, click **Start**.
3. When the report shows the manifest and service worker as valid, click **Package for stores → Android**.
4. Fill in a package ID such as `com.yourname.leafpdf`, app name, and version. Leave other defaults. Click **Generate**.
5. Download the zip. It contains:
   - an `.apk` for installing directly (sideloading),
   - an `.aab` for the Play Store,
   - a `signing.keystore` and its passwords. **Keep these safe. You need them for every future update.**
6. Copy the `.apk` to your phone and open it. Android will ask you to allow installs from that source.

### Remove the browser address bar in the APK (Digital Asset Links)
PWABuilder creates a Trusted Web Activity. For it to hide the address bar, your site must prove it belongs to the app:
1. In the PWABuilder download, open `assetlinks.json` (or copy your SHA-256 fingerprint from the signing info).
2. Host it at `https://YOUR-DOMAIN/.well-known/assetlinks.json`.
   - On GitHub Pages, project sites live under a sub-path, so this only works with a **user/organisation site** (`USERNAME.github.io`) or a **custom domain**. Netlify and Cloudflare Pages work directly: add a `.well-known/assetlinks.json` file to the folder and redeploy.
3. Reinstall the APK. The address bar disappears.

### Play Store (optional)
Create a Google Play developer account (one-time fee of about US$25), upload the `.aab`, complete the store listing and privacy policy ("this app does not collect any data"), then submit for review.

### Alternative: Bubblewrap or Capacitor
- **Bubblewrap** (`npm i -g @bubblewrap/cli`, then `bubblewrap init --manifest https://YOUR-LINK/manifest.webmanifest` and `bubblewrap build`) is the command-line version of PWABuilder.
- **Capacitor** wraps the folder as a native WebView app: `npm i @capacitor/core @capacitor/cli @capacitor/android`, `npx cap init`, set `webDir` to this folder, `npx cap add android`, `npx cap open android`. Use this only if you need native features. File saving inside a WebView may need the Capacitor Filesystem and Share plugins, which the TWA route does not need.

---

## 6. How to use the editor

1. **Open** – tap **Open** (or "Open a PDF") and choose a PDF. On desktop you can also drag a file onto the page. Only PDF files are accepted.
2. **Edit existing text** – choose **Edit text**, then click or tap any line. Retype it. Click or tap outside to finish.
3. **Add text** – choose **Add text**, click where you want it, type. Change font, size, bold, italic and colour in the bar under the toolbar.
4. **Add an image** – choose **Image**, pick a picture (PNG, JPG, WebP and others are converted automatically). Drag it into place and drag the round corner dot to resize.
5. **Highlight / Box / Whiteout / Draw** – pick the tool and drag on the page. Colour, width and opacity appear in the bar.
6. **Move or change things** – choose **Select**, then click an item. Double-click text (or tap it twice on a phone) to edit it. Press **Delete** or use the Delete button to remove it. Arrow keys nudge the selected item.
7. **Pages** – open the page list with the pages button in the bottom bar. Hover or tap the **×** on a thumbnail to delete a page.
8. **Zoom** – use the **−/+** and **Fit** buttons, pinch on a phone, or Ctrl + mouse wheel on desktop.
9. **Undo / redo** – buttons at the top, or Ctrl+Z / Ctrl+Y.
10. **Save PDF** – a box asks what to call the file. Type any name you like (the app adds `.pdf`), then tap **Save**. It downloads to your device. Characters that are not allowed in file names are removed automatically. The box suggests `originalname-edited` and remembers your last name during the session (Ctrl+S also opens it). Your original file is never changed.

### Keyboard shortcuts
| Keys | Action |
|---|---|
| Ctrl/Cmd + S | Save PDF |
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Y or Shift + Ctrl/Cmd + Z | Redo |
| Delete / Backspace | Delete selected item |
| Arrow keys (Shift = 10×) | Nudge selected item |
| Esc | Deselect and return to Select tool |
| Ctrl + mouse wheel | Zoom |

---

## 7. How it works

**Stack:** plain HTML/CSS/JS, [pdf.js](https://mozilla.github.io/pdf.js/) for rendering, [pdf-lib](https://pdf-lib.js.org/) for saving, a service worker for offline.

**Flow**
1. `loadFile()` reads the chosen file into memory and checks it really starts with `%PDF`.
2. pdf.js renders each page to a `<canvas>` lazily (only pages near the screen), and extracts text positions per page (`getRuns()`).
3. Each page has an overlay `<div class="ov">`. Everything the user adds is stored as a plain object in `pages[i].objects` in PDF-point coordinates (top-left origin at 100% zoom): `text`, `image`, `rect`, `draw`, and `cover` (the block that hides original text).
4. Clicking existing text in **Edit text** mode creates a `cover` object plus a `text` object with the same string, font family guess, size and colour. The `cover` is built by `buildPatch()`: it re-draws that one line at high resolution, finds the letter pixels, and fills only those pixels with the nearest clean background colour. The result is an opaque image of the page's own pixels with the old letters removed, so watermarks, gradients and table lines match exactly and no box shows. (If that ever fails, it falls back to a plain colour block.)
5. History is a list of JSON snapshots of all objects, which gives undo and redo.
6. `savePdf()` loads the original bytes with pdf-lib, draws every object onto the right page (handling page rotation through pdf.js's `convertToPdfPoint`), removes deleted pages, and downloads the result.
7. Text that standard PDF fonts cannot encode (for example Hindi, Tamil, Arabic, Chinese) is drawn to a canvas and embedded as an image so it still appears correctly.

**Key places in `index.html`**
| Look for | What it does |
|---|---|
| `const TOOLS` | Toolbar buttons and hints |
| `const DEF` | Default colours, sizes and opacity per tool |
| `getRuns` / `editRun` / `buildPatch` | Detect existing PDF text, edit it, and erase the old letters invisibly |
| `makeEl` / `startDrag` / `startResize` | Selecting, moving, resizing objects |
| `snap` / `commit` / `undo` | History |
| `savePdf` | Writes the final PDF |
| `askName` / `savePdf` | Asks for the file name, then writes the final PDF |
| `deliver` | Downloads the file (uses a normal download link) |
| `btnInstall` handler | Add to Home screen prompt or device-specific steps |

**Offline and updates:** `sw.js` caches every file listed in `ASSETS`. When you change any file, edit `CACHE_VERSION` in `sw.js` (for example `leaf-v2`). Installed apps then fetch the new version on their next launch.

**Privacy:** there are no analytics, no cookies and no network calls after the first load. You can verify this in the browser's Network tab.

### Notes for AI / vibe-coding tools
If you paste this project into a tool such as Bolt, Lovable, Replit, v0, Cursor or Claude Code, give it these instructions:

> This is a static site with no build step. Keep `index.html` as a single file. Do not replace pdf.js or pdf-lib with CDN links or npm imports; they are vendored in `vendor/` so the app works offline. Do not add a backend. When changing files, bump `CACHE_VERSION` in `sw.js` and add any new files to its `ASSETS` list. Keep touch support working (pointer events, `touch-action`, 40px tap targets). Test: open a PDF, use Edit text on a line, Add text, Save, and confirm the downloaded PDF.

---

## 8. Customising

- **Footer credit** – edit the `<footer class="foot">` line near the bottom of the page markup in `index.html`.
- **Name and colours** – edit `manifest.webmanifest` (`name`, `short_name`, `theme_color`) and the CSS variables at the top of `index.html` (`--accent` and others, with a dark-mode block below).
- **Icons** – replace the PNGs in `icons/` keeping the same sizes. Make the maskable one with the artwork inside the central 80%.
- **Default fonts or sizes** – change `DEF` in the script.
- **More fonts in saved PDFs** – today saved text uses the 14 standard PDF fonts (Helvetica, Times, Courier). To embed custom fonts, add [`@pdf-lib/fontkit`](https://github.com/Hopding/fontkit), call `doc.registerFontkit(fontkit)` and `doc.embedFont(fontBytes)` inside `savePdf`.
- **Sub-folder hosting** – all paths are relative, so the app works from any folder.

---

## 9. Known limits

- **Edited text is covered, not erased.** The original text stays inside the saved file underneath a patch image, so it can still be selected or extracted with other tools. Do not rely on this to redact secrets. For real redaction use a dedicated tool.
- **Not a full Acrobat clone.** There is no paragraph re-flow, no embedded-font matching, no form-field editing, no digital signatures, no OCR for scanned pages.
- **Scanned PDFs** are images, so use **Add text** and **Whiteout** on them.
- **Password-protected PDFs** are not opened. Remove the password first.
- **Rotated text** inside the PDF is not editable (it is shown but not detected as editable).
- **Very large files** (hundreds of pages or hundreds of MB) depend on the device's memory.
- **iPhone/iPad:** Safari handles install through Share → Add to Home Screen. Downloads go to the Files app.

---

## 10. Troubleshooting

| Problem | Fix |
|---|---|
| "The PDF engine did not load" | You opened `index.html` straight from storage. Use `leaf-single-file.html`, or host the folder (Part 3) and open the https link. |
| Open button does nothing | Use a current browser. Some in-app viewers (inside chat or social apps) block file pickers; open the link in Chrome or Safari. |
| "Only PDF files can be opened here" | The file is not a real PDF. Export it again from the source app. |
| "Password-protected" message | Remove the password in the original viewer, then reopen. |
| Install button missing | Needs https, a visited-twice visit on some browsers, and not already installed. On iPhone use Share → Add to Home Screen. |
| App shows an old version after an update | Bump `CACHE_VERSION` in `sw.js`, redeploy, then close and reopen the app (or clear site data once). |
| Edited text looks slightly different from the original | Saved text uses standard fonts. Change the font, size and bold in the property bar to get closest. |
| Non-English text looks different | It is saved as an image using the device's fonts, so it still displays correctly but is not selectable. |
| Nothing saves on iOS | After tapping Save PDF, use the share sheet's **Save to Files**. |

---

## 11. Licences

- App code: MIT, copyright Mokuttan Labs. Do whatever you like with it, and please keep the footer credit if you redistribute it.
- pdf.js – Apache License 2.0 (`vendor/LICENSE-pdfjs.txt`)
- pdf-lib – MIT (`vendor/LICENSE-pdf-lib.txt`)
- Figtree and Instrument Serif – SIL Open Font License (`vendor/fonts/LICENSE-*.txt`)

Keep the files in `vendor/` and their licence texts when you redistribute.
