const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const app = require("./firebaseConfig"); // Fix: Use `require` to import app

const db = getFirestore(app);

module.exports = { db };
