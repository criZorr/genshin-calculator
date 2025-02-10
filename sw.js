const CACHE_NAME = "v1_cache_genshin_calculator",
  urlsToCache = [
    "./",
    "./assets",
    "./components",
    "./db",
    "./font",
    "./helpers",
    "./styles",
    "./characters.js",
    "./personal.html",
    "./personal.js",
    "./weapons.html",
    "./weapons.js",
  ];

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       await cache.addAll(urlsToCache);
//     })()
//   );
// });

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Falló registro de cache", err))
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
