// Import Firebase modules from the Firebase package
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Your Firebase config and sign-up code go here...

// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const last_name = document.getElementById('last_name').value;
    const first_name = document.getElementById('first_name').value;
    const birthday = document.getElementById('birthday').value;
    const sex = document.getElementById('sex').value;
    const civil_status = document.getElementById('civil_status').value;
    const nationality = document.getElementById('nationality').value;
    const contact_number = document.getElementById('contact_number').value;
    const countryOfResidence = document.getElementById('countryOfResidence').value;
    const region = document.getElementById('region').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const purpose_of_travel = document.getElementById('purpose_of_travel').value;
    const otherPurpose = document.getElementById('otherPurpose').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Save user data to Firestore
        await setDoc(doc(db, "Users", userId), {
            last_name,
            first_name,
            birthday,
            sex,
            civil_status,
            nationality,
            contact_number,
            countryOfResidence,
            region: countryOfResidence === "Philippines" ? region : null,
            province: countryOfResidence === "Philippines" ? province : null,
            city: countryOfResidence === "Philippines" ? city : null,
            purpose_of_travel,
            otherPurpose: purpose_of_travel === "Other" ? otherPurpose : null,
            email
        });

        // Redirect to QR code page with UserID as the QR code
        window.location.href = `qr_code.html?userId=${userId}`;


    } catch (error) {
        console.error("Error during sign-up:", error.message);
        alert("Sign-up failed. Please try again.");
    }
});

// Handle showing and hiding the local address fields
const countryOfResidenceEl = document.getElementById('countryOfResidence');
const localAddressEl = document.getElementById('localAddress');

countryOfResidenceEl.addEventListener('change', () => {
    if (countryOfResidenceEl.value === 'Philippines') {
        localAddressEl.style.display = 'block';
    } else {
        localAddressEl.style.display = 'none';
    }
});

// Handle showing and hiding the "Other" input for Purpose of Travel
const purposeOfTravelEl = document.getElementById('purpose_of_travel');
const otherPurposeInputEl = document.getElementById('otherPurposeInput');

purposeOfTravelEl.addEventListener('change', () => {
    if (purposeOfTravelEl.value === 'Other') {
        otherPurposeInputEl.style.display = 'block';
    } else {
        otherPurposeInputEl.style.display = 'none';
    }
});
