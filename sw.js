const CACHE_NAME = "site-cache-v1";
const FILES_TO_CACHE = [
  "/dashboard/",           // الصفحة الرئيسية
  "/dashboard/index.html",
  "/dashboard/style.css",
  "/dashboard/script.js",
  "/dashboard/offline.html"
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل وحذف أي كاش قديم
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// التعامل مع الطلبات (Fetch)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // لو الملف في الكاش: رجّعه
      }
      return fetch(event.request).catch(() =>
        caches.match("/dashboard/offline.html") // بديل لما تكون أوفلاين
      );
    })
  );
});
