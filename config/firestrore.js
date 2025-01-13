// config/firestore.js
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { firebaseConfig } = require("./firebaseConfig");

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

module.exports = { db };
