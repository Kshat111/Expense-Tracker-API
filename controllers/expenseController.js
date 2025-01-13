const { db } = require("./config/firestore.js");
const { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } = require("firebase/firestore");

// Add a new expense
export const addExpense = async (req, res) => {
    try {
        const { category, amount, date } = req.body;

        // Add expense to Firestore
        const expensesRef = collection(db, "expenses");
        const docRef = await addDoc(expensesRef, {
            category,
            amount,
            date,
            userId: req.user.id, // Assuming the user ID is extracted from JWT middleware
        });

        res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get expenses with filters
export const getExpenses = async (req, res) => {
    try {
        const { filter, startDate, endDate } = req.query;
        const expensesRef = collection(db, "expenses");
        let q;

        // Apply filters
        if (filter === "pastWeek") {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            q = query(expensesRef, where("date", ">=", lastWeek));
        } else if (filter === "pastMonth") {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            q = query(expensesRef, where("date", ">=", lastMonth));
        } else if (filter === "last3Months") {
            const last3Months = new Date();
            last3Months.setMonth(last3Months.getMonth() - 3);
            q = query(expensesRef, where("date", ">=", last3Months));
        } else if (filter === "custom" && startDate && endDate) {
            q = query(
                expensesRef,
                where("date", ">=", new Date(startDate)),
                where("date", "<=", new Date(endDate))
            );
        } else {
            q = query(expensesRef); // Default: Get all expenses
        }

        const querySnapshot = await getDocs(q);

        const expenses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        res.status(200).json({ success: true, expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an existing expense
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, amount, date } = req.body;

        const expenseDoc = doc(db, "expenses", id);

        // Update the document
        await updateDoc(expenseDoc, {
            category,
            amount,
            date,
        });

        res.status(200).json({ success: true, message: "Expense updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expenseDoc = doc(db, "expenses", id);

        // Delete the document
        await deleteDoc(expenseDoc);

        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};