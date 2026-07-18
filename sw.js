// Idk jack shiii about PWAS, this is total larping on my part type shiii

const CACHE_NAME = "tpv2cache";
const PRECACHE_ASSETS = [
  "style.css",
  "index.html",
  "js/data.js",
  "js/editHouse.js",
  "js/editStreets.js",
  "js/pages.js",
  "js/streetView.js",
];

// Download the assets that we need to cache
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(PRECACHE_ASSETS);
  })());
});

// Run immediately after install
self.addEventListener("activate", event => {
  // Claim any existing instances of the app immediately, without requiring them to be reloaded.
  event.waitUntil(self.clients.claim());
});

// Try to find assets in the offline cache before checking the network.
self.addEventListener("fetch", event => {
  event.respondWith(async () => {
    const cache = await caches.open(CACHE_NAME);

    // match the request to our cache
    const cachedResponse = await cache.match(event.request);

    // check if we got a valid response
    if (cachedResponse !== undefined) {
      // Cache hit, return the resource
      return cachedResponse;
    } else {
      // Otherwise, go to the network
      return fetch(event.request)
    };
  });
});