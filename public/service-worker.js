const FILES_TO_CACHE = [
    "/",
    "/index.html", 
    "index.js", 
    "/db.js", 
    "/style.css",
    "/icons/icon-512x512.png",
    "/icons/icon-192x192.png"
];
const CACHE_NAME = "strict-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install service worker
self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Files were pre-cached!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

//activate service worker
self.addEventListener("activate", function (evt) {
    // install steps performed here
    evt.waitUntil(
        cache.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Remove old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.ClientRectList.claim();
});

//fetch 
self.addEventListener("fetch", evt => {
    // all requests to the /api routes are cached
    if (evt.request.url.includes('/api/')) {
        console.log('[Service Worker] Fetch(data)', evt.request.url);
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(evt.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                }).catch(err => {
                    return cache.match(evt.request); // Network req will fail and attempt to get from cache
                });
            })
        );
        return;
    }
    evt.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(evt.request).then(response => {
                return response || fetch(evt.request); // cached home page returned on requests for html
            });
        })
    );
});