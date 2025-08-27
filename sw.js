// sw.js
self.addEventListener("install", event => {
  console.log("✅ Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("✅ Service Worker Activated");
});

// اعتراض أي طلب Network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // لو الملف موجود في الكاش رجعه
      }
      // لو مش موجود رجع رسالة بديلة
      return new Response("Content unavailable. Resource was not cached", {
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });
    })
  );
});
