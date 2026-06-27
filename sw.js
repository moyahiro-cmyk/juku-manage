// サービスワーカー（sw.js）のおまじない
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// バックグラウンドで処理を行うための空のリスナー
self.addEventListener('fetch', (event) => {
  // ここは空でも、存在すること自体がiPhoneにとって重要です
});