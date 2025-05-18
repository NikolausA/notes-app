const staticCacheName = 'static-site-v2';
const dynamicCacheName = 'dynamic-site-v2';

const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/index-BsRGKBWJ.css',
  '/assets/index-DHqxGF3F.js',
  '/icons/note%2096x96.png',
  '/icons/note%20144x144.png',
  '/icons/note%20192x192.png',
  '/icons/note%20512x512.png',
];

// 📦 Кешируем статические ресурсы при установке
self.addEventListener('install', async (e) => {
  try {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  } catch (err) {
    console.error('Ошибка при кэшировании ASSETS:', err);
  }
});

// 🧹 Очищаем старые кэши
self.addEventListener('activate', async (e) => {
  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
  self.clients.claim();
});

// 📡 Обработка запросов
self.addEventListener('fetch', (e) => {
  const { request } = e;

  // Только GET-запросы
  if (request.method !== 'GET') return;

  // Статические файлы — cache-first
  if (ASSETS.includes(new URL(request.url).pathname)) {
    e.respondWith(cacheFirst(request));
  } else {
    // API-запросы или динамика — network-first
    e.respondWith(networkFirst(request));
  }
});

// 📥 Cache-first: отдаём из кеша или запрашиваем
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || fetch(request);
}

// 🌐 Network-first: пытаемся из сети, если нет — из кеша
async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    return cached || (await caches.match('/offline.html'));
  }
}

// Code version Zar

// self.addEventListener('install', async (e) => {
//   const cache = await caches.open(staticCacheName);
//   await cache.addAll(ASSETS);
// });

// self.addEventListener('activate', async (e) => {
//   const cachesKeysArray = await caches.keys();
//   await Promise.all(
//     cachesKeysArray
//       .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
//       .map((key) => caches.delete(key))
//   );
// });

// self.addEventListener('fetch', (e) => {
//   e.respondWith(cacheFirst(e.request));
// });

// async function cacheFirst(request) {
//   const cached = await caches.match(request);
//   try {
//     return (
//       cached ??
//       (await fetch(request).then((response) => {
//         return networkFirst(request);
//       }))
//     );
//   } catch (e) {
//     return networkFirst(request);
//   }
// }

// async function networkFirst(request) {
//   const cache = await caches.open(dynamicCacheName);

//   try {
//     const response = await fetch(request);
//     await cache.put(request, response.clone());
//     return response;
//   } catch (e) {
//     const cached = await cache.match(request);
//     return cache ?? (await cache.match('/offline.html'));
//   }
// }
