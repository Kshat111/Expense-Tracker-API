const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

const db = getFirestore();

const createUser = async (userData) => {
  await setDoc(doc(db, 'users', userData.email), userData); // Fix: Use email instead of UID as document ID
};

const getUserByEmail = async (email) => {
  const userDoc = await getDoc(doc(db, 'users', email));
  return userDoc.exists() ? userDoc.data() : null;
};

module.exports = { createUser, getUserByEmail };
