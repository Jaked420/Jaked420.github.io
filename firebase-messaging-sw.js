// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD0kuWsYAXU-YmqP-mv52WzA13UUHAKEmw",
  authDomain: "best-budz-0420.firebaseapp.com",
  projectId: "best-budz-0420",
  storageBucket: "best-budz-0420.appspot.com", // FIXED
  messagingSenderId: "188695599598",
  appId: "1:188695599598:web:77cb96ade47af1c67516ff"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/Images/icon.png' // make sure this icon exists
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
