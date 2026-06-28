// サービスワーカー：FCMプッシュ信号・バッジ専用版
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCvsoHNZ_XcrSMB1ZQp0MZEjaQ9_4twiZK",
    authDomain: "juku-manage-dba.firebaseapp.com",
    projectId: "juku-manage-dba",
    storageBucket: "juku-manage-dba.firebasestorage.app",
    messagingSenderId: "28426983865",
    appId: "1:28426983865:web:252cd63d7f1b1cc3eb7e68"
};

firebase.initializeApp(firebaseConfig);

let messaging = null;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// 🌟 背景でプッシュ信号（FCM）を受け取った瞬間の処理
if (messaging) {
    messaging.onBackgroundMessage((payload) => {
        console.log('裏方でプッシュ信号をキャッチしました:', payload);
        
        // 🌟 信号が届いたら、iPhoneのアイコンに「1」を強制点灯させる
        if ('setAppBadge' in self.navigator) {
            return self.navigator.setAppBadge(1);
        }
    });
}

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});