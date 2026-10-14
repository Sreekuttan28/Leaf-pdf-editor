/* Leaf PDF Editor – service worker (offline support)
   Bump CACHE_VERSION whenever you change any file so installed apps pick up the update. */
const CACHE_VERSION = 'leaf-v1';
const ASSETS = [
  './', 'index.html', 'manifest.webmanifest',
  'vendor/pdf.min.js', 'vendor/pdf.worker.min.js', 'vendor/pdf-lib.min.js', 'vendor/fonts.css',
  'vendor/fonts/figtree-latin-400-normal.woff2', 'vendor/fonts/figtree-latin-500-normal.woff2',
  'vendor/fonts/figtree-latin-600-normal.woff2', 'vendor/fonts/figtree-latin-700-normal.woff2',
  'vendor/fonts/instrument-serif-latin-400-normal.woff2',
  'icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : Response.error()))
  );
});
