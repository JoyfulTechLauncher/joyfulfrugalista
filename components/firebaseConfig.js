import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDlfjFF6-T3HoxQJR5vHsV9BSSPSeXmYE",
  authDomain: "joyful-429b0.firebaseapp.com",
  databaseURL: "https://joyful-429b0.firebaseio.com",
  projectId: "joyful-429b0",
  storageBucket: "joyful-429b0.appspot.com",
  messagingSenderId: "49637931335",
  appId: "1:49637931335:android:500aec15cf39aaef1a3462",
  measurementId: "G-7749860346",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
