import axios from "axios";

const BACKEND_URL =
  "https://expenses-tracker-1e56d-default-rtdb.asia-southeast1.firebasedatabase.app";

async function storeExpense(expenseData) {
  const response = await axios.post(`${BACKEND_URL}/expense.json`, expenseData);
  const id = response.data.name;
  return id;
}
async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expense.json`);
  const data = response.data;

  const expenses = [];

  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

// function validateDate(dateString) {
//   // Check for the format YYYY-MM-DD using regex
//   const regex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!regex.test(dateString)) {
//     return false;
//   }
//   return true;
// }
// function parseDate(dateString) {
//   const [year, month, day] = dateString.split("-").map(Number);
//   return new Date(year, month - 1, day);
// }

function updateExpense(expenseId, expenseData) {
  return axios.put(`${BACKEND_URL}/expense/${expenseId}.json`, expenseData);
}

function deleteExpense(expenseId) {
  return axios.delete(`${BACKEND_URL}/expense/${expenseId}.json`);
}

export { storeExpense, updateExpense, deleteExpense, fetchExpenses };
