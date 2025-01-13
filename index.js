const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const {initializeFirebase} = require("./config/firebaseConfig");

const app = express;
dotenv.config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

initializeFirebase();

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})