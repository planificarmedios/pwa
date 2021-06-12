importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAnDYjB6nl-IXUVyuI97n00VTO70jWYH14",
    authDomain: "deft-observer-249301.firebaseapp.com",
    projectId: "deft-observer-249301",
    storageBucket: "deft-observer-249301.appspot.com",
    messagingSenderId: "581706997035",
    appId: "1:581706997035:web:eb0b8450ef67e343b8396e",
    measurementId: "G-F6Z8E2XYQ1"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});