import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2025-10-25"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2025-10-24"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2025-10-23"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-10-22"),
  },
  {
    id: "e5",
    description: "Coffee",
    amount: 18.59,
    date: new Date("2025-10-21"),
  },
  {
    id: "e6",
    description: "Groceries",
    amount: 89.29,
    date: new Date("2025-10-15"),
  },
  {
    id: "e7",
    description: "Gas",
    amount: 45.99,
    date: new Date("2025-10-10"),
  },
  {
    id: "e8",
    description: "Restaurant",
    amount: 64.99,
    date: new Date("2025-09-19"),
  },
  {
    id: "e9",
    description: "Movie tickets",
    amount: 28.59,
    date: new Date("2025-09-05"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({
      type: "ADD",
      payload: { ...expenseData, id: Math.random().toString() },
    });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
    // setExpenses((currentExpenses) => {
    //   return expenses;
    // });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
