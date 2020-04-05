var firebaseConfig = {
    apiKey: "AIzaSyDovCwjQnKqKOpHPfWfSRyx1vwQsB4dxvY",
    authDomain: "threedee-hearts.firebaseapp.com",
    databaseURL: "https://threedee-hearts.firebaseio.com",
    projectId: "threedee-hearts",
    storageBucket: "threedee-hearts.appspot.com",
    messagingSenderId: "87105317899",
    appId: "1:87105317899:web:974c590dfa10ce841fab0e"
};


firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
console.log(storage)