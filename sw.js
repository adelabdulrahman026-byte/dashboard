// service-worker.js
self.addEventListener('fetch', function(event) {
    // إذا كان الطلب من أدوات المطور
    if (event.request.url.includes('chrome-devtools') || 
        event.request.url.includes('devtools')) {
        event.respondWith(
            new Response('Content unavailable. Resource was not cached', {
                status: 404,
                headers: { 'Content-Type': 'text/plain' }
            })
        );
    }
});
