// Mulu Ortho service worker: app works offline with the last stock it saw.
const V = "mulu-ortho-v11";
const CORE = ["./", "index.html", "manifest.json", "img/icon-192.png", "img/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  const network = () => fetch(r).then(res => { if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; });
  // Pages and live stock: try network first so updates show, fall back to the saved copy offline
  if (r.mode === "navigate" || u.hostname.endsWith("google.com") || u.hostname.endsWith("googleusercontent.com")) {
    e.respondWith(network().catch(() => caches.match(r).then(m => m || caches.match("index.html"))));
    return;
  }
  // Images, fonts and other files: saved copy first, refresh in the background
  e.respondWith(caches.match(r).then(m => { const n = network().catch(() => m); return m || n; }));
});
