// サービスワーカー：バックグラウンドでの通知・バッジ処理（原点回帰版）

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 🌟 バックグラウンド（裏側）でプッシュ通知の信号を受け取ったときの処理
self.addEventListener('push', (event) => {
    console.log('Push received');
    
    // 届いた通知の数（通常は1、複数ある場合はその合計）
    let badgeCount = 1; 
    if (event.data) {
        try {
            const data = event.data.json();
            if (data.badge) badgeCount = parseInt(data.badge);
        } catch (e) {
            console.log('Data is not JSON');
        }
    }

    // 🌟 スマホの状態に関わらず、大きな遅延なくアイコンに数字を表示する
    if ('setAppBadge' in self.navigator) {
        event.waitUntil(
            self.navigator.setAppBadge(badgeCount)
                .then(() => console.log('Badge set successfully to: ' + badgeCount))
                .catch((error) => console.error('Failed to set badge:', error))
        );
    }
});