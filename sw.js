// サービスワーカー：Firebase直連動・バッジ強制点灯版
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCvsoHNZ_XcrSMB1ZQp0MZEjaQ9_4twiZK",
    authDomain: "juku-manage-dba.firebaseapp.com",
    projectId: "juku-manage-dba",
    storageBucket: "juku-manage-dba.firebasestorage.app",
    messagingSenderId: "28426983865",
    appId: "1:28426983865:web:252cd63d7f1b1cc3eb7e68"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 🌟 画面が閉じていても、裏方自身がFirebaseを直接見張るルート
let isFirstLoad = true;
db.collection("schedules")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
        
        // 初回の過去データ読み込み時はバッジを動かさない
        if (isFirstLoad) {
            isFirstLoad = false;
            return;
        }

        // 塾長画面から「新しくデータが追加された（added）」という変化を検知した場合
        const hasNewAddition = snapshot.docChanges().some(change => change.type === "added");
        
        if (hasNewAddition) {
            console.log("裏方で新着を検知しました。バッジを強制点灯します。");
            
            // 🌟 プッシュ信号に頼らず、裏方からiPhoneへ直接「数字の1」を叩き込む
            if ('setAppBadge' in self.navigator) {
                self.navigator.setAppBadge(1)
                    .then(() => console.log('バッジを1に強制設定しました'))
                    .catch((err) => console.error('バッジ設定失敗:', err));
            }
        }
    });

// （予備用）もしプッシュ信号が飛んできた場合もバッジを出す
self.addEventListener('push', (event) => {
    if ('setAppBadge' in self.navigator) {
        event.waitUntil(self.navigator.setAppBadge(1));
    }
});