// signin.js

document.addEventListener('DOMContentLoaded', function () {
    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCeSy9qMibAAYCZg5cipJ8097qeh3vwF08",
        authDomain: "testingapp-589a1.firebaseapp.com",
        databaseURL: "https://testingapp-589a1-default-rtdb.firebaseio.com",
        projectId: "testingapp-589a1",
        storageBucket: "testingapp-589a1.appspot.com",
        messagingSenderId: "920622301670",
        appId: "1:920622301670:web:8937030299600fede51627",
        measurementId: "G-ZJP7HRFH98"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Sign-in form submission
    document.getElementById('signin-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log('Signed in:', user);
                
                // Redirect to QR code page with UserID as the QR code
                const userId = user.uid; // Get the UserID from the user object
                window.location.href = `qr_code.html?userId=${userId}`; // Redirect to QR code page
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error signing in:", errorCode, errorMessage);
                alert("Error signing in: " + errorMessage);
            });
    });
});
