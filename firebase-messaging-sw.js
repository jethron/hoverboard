importScripts('node_modules/firebase/firebase-app.js');
importScripts('node_modules/firebase/firebase-messaging.js');

firebase.initializeApp({
  apiKey: '{$ firebase.apiKey $}',
  authDomain: '{$ firebase.authDomain $}',
  databaseURL: '{$ firebase.databaseURL $}',
  projectId: '{$ firebase.projectId $}',
  storageBucket: '{$ firebase.storageBucket $}',
  appId: '{$ firebase.appId $}',
  messagingSenderId: '{$ firebase.messagingSenderId $}',
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(({ data }) => {
  const notification = Object.assign({}, data, {
    data: {
      click_action: data.click_action,
    },
  });
  return self.registration.showNotification(notification.title, notification);
});

self.addEventListener('notificationclick', event => {
  const url = event.notification.data.click_action && event.notification.data.click_action.startsWith('/')
    ? `${self.origin}${event.notification.data.click_action}`
    : event.notification.data.click_action;
  event.waitUntil(clients.openWindow(url));
});
