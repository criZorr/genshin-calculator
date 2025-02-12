const CACHE_NAME = "v1_cache_genshin_calculator",
  urlsToCache = [
    "./",
    "./characters.js",
    "./index.html",
    "./index.js",
    "./personal.html",
    "./personal.js",
    "./settings.html",
    "./settings.js",
    "./weapons.html",
    "./weapons.js",
    "./components/calculateCharacter.js",
    "./components/calculateNeeded.js",
    "./components/calculateWeapon.js",
    "./components/drawItems.js",
    "./components/drawTotalExcess.js",
    "./components/drawTotalItems.js",
    "./components/getCards.js",
    "./components/toggleSize.js",
    "./db/characters.json",
    "./db/data.js",
    "./db/weapons.json",
    "./font/OFL.txt",
    "./font/Raleway-cyrillic.woff2",
    "./font/Raleway-cyrillic-ext.woff2",
    "./font/Raleway-italic-cyrillic.woff2",
    "./font/Raleway-italic-cyrillic-ext.woff2",
    "./font/Raleway-italic-latin.woff2",
    "./font/Raleway-italic-latin-ext.woff2",
    "./font/Raleway-italic-vietnamese.woff2",
    "./font/Raleway-latin.woff2",
    "./font/Raleway-latin-ext.woff2",
    "./font/Raleway-vietnamese.woff2",
    "./helpers/calculateTotal.js",
    "./helpers/createLocal.js",
    "./helpers/createTotalLocal.js",
    "./helpers/deleteLocal.js",
    "./helpers/getData.js",
    "./helpers/getNumbList.js",
    "./helpers/handleAscension.js",
    "./styles/auto-theme.css",
    "./styles/dark-theme.css",
    "./styles/font.css",
    "./styles/styles-no-nesting.css",
    "./styles/styles.css",
    "./assets/add.webp",
    "./assets/characters.svg",
    "./assets/characters.webp",
    "./assets/collapse.svg",
    "./assets/delete.svg",
    "./assets/edit.svg",
    "./assets/expand.svg",
    "./assets/faq.svg",
    "./assets/favicon.png",
    "./assets/favicon.svg",
    "./assets/hero-image.png",
    "./assets/nothing.webp",
    "./assets/personal.svg",
    "./assets/plus.svg",
    "./assets/settings.svg",
    "./assets/weapons.svg",
    "./assets/weapons.webp",
  ];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);
      } catch (err) {}
    })()
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
