import { initializeApp } from "firebase/app";
import { isJwtExpired } from 'jwt-check-expiration';

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC9jrzURk6uuduwysaQDHaGEIoEvYv2ibk",
    authDomain: "ptsalariesprod.firebaseapp.com",
    projectId: "ptsalariesprod",
    storageBucket: "ptsalariesprod.appspot.com",
    messagingSenderId: "296196078902",
    appId: "1:296196078902:web:aa03fe076e07069e19c797"
  };
// Initialize Firebase
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
        localStorage.setItem("token", res.user.accessToken);

        console.log("token validation");
        let token = localStorage.getItem('token');
        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    localStorage.removeItem("token")
};

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const tokenExpired = () => {
    let token = localStorage.getItem('token');
    if (token) {
        let result = isJwtExpired(token)
        return result;
    }
    else {
        return true;
    }
}

export {
    auth,
    signInWithGoogle,
    logout,
    getToken,
    tokenExpired
};