import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const userDoc = doc(db, "Users", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User data found:", userData);
            generateQRCode(userId); // Pass userId to generate QR code
        } else {
            console.log("No user data found");
            alert("User not logged in or no user data found.");
        }
    } else {
        console.log("No user is signed in");
        alert("User not logged in or no user data found.");
        window.location.href = "signin.html"; // Redirect if no user
    }
});

// Generate QR Code
function generateQRCode(userId) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Clear any existing QR code

    const qr = new QRious({
        element: document.createElement('canvas'),
        value: userId,
        size: 250,
    });

    qrCodeContainer.appendChild(qr.canvas); // Append the QR code canvas
}
