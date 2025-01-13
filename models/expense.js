const { getFirestore, collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } = require('firebase/firestore');

const db = getFirestore();

const addExpense = async (expenseData) => {
  await addDoc(collection(db, 'expenses'), expenseData);
};

const getExpenses = async (filters) => {
  let q = collection(db, 'expenses');
  if (filters.dateRange) {
    q = query(q, where('date', '>=', filters.dateRange.start), where('date', '<=', filters.dateRange.end));
  }
  const expenses = await getDocs(q);
  return expenses.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateExpense = async (id, updates) => {
  await updateDoc(doc(db, 'expenses', id), updates);
};

const deleteExpense = async (id) => {
  await deleteDoc(doc(db, 'expenses', id));
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
