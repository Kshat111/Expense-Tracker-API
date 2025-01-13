const { db } = require("../config/firestore.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { collection, addDoc, getDocs, query, where } = require("firebase/firestore");

const SECRET_KEY = process.env.JWT_SECRET; // Add this in your .env file

// Sign up a new user
exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to Firestore
        const usersRef = collection(db, "users");
        await addDoc(usersRef, {
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Log in a user
exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Query the user from Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = querySnapshot.docs[0].data();

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: querySnapshot.docs[0].id }, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
