import React from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FireOAuth = () => {
  const storeUserData = (user) => {
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User data stored in localStorage:', userData);
  };

  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      storeUserData(user);
      alert(`Welcome, ${user.displayName}`);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email; // Email causing the issue
        const pendingCred = error.credential; // New credential to link

        try {
          // Get sign-in methods for the existing account
          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.includes('google.com')) {
            alert('This email is already associated with a Google account. Sign in using Google first, then link with Facebook.');
          } else {
            alert('This email is already associated with another provider. Sign in with the existing provider, then link accounts.');
          }
        } catch (fetchError) {
          console.error('Error fetching sign-in methods:', fetchError);
          alert('Error linking accounts. Please try again.');
        }
      } else {
        console.error('Error during sign-in:', error);
        alert('Authentication failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <button
          onClick={() => handleSignIn(new GoogleAuthProvider())}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-600"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleSignIn(new GithubAuthProvider())}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-900"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => handleSignIn(new FacebookAuthProvider())}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default FireOAuth;
