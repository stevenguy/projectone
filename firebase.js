
/*  read/write rules provided by firebase -  not yet sure how to utilize this
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
*/

// put this link in the HTML <script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>

// Initialize Firebase - copied from firebase Project Overview section
  var config = {
    apiKey: "AIzaSyDuH4bUwCx-wm2rw6dyqtprc1B8rB8h3zs",
    authDomain: "team7project2018.firebaseapp.com",
    databaseURL: "https://team7project2018.firebaseio.com",
    projectId: "team7project2018",
    storageBucket: "team7project2018.appspot.com",
    messagingSenderId: "5398178863"
  };

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


//create a new user with createUserWithEmailAndPassword:
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

// sign an existing user into firebase using signInWithEmailAndPassword():
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

/*  For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. 
    This observer gets called whenever the user's sign-in state changes.
    Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.
*/  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });


// To sign out a user, call signOut:
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});


//write new favorites to firebase under user id


//retrieve favorites from firebase 


//populate retrieved data into HTML
