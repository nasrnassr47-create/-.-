const CACHE_NAME = 'nasr-wallet-cache-v15.9';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json', '/icon.svg'];
const RUNTIME_CACHE = 'nasr-wallet-runtime-v15.9';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.pathname.endsWith('admin.html') || url.hostname.includes('script.google.com')) return;
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const shouldCache =
          response.status === 200 &&
          (url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|webp|woff2?|ttf|otf|json)$/) ||
           url.hostname.includes('fonts.g'));
        if (shouldCache) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
