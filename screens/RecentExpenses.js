import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";


function RecentExpenses() {

  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);


    return expense.date >= sevenDaysAgo && expense.date <= today;
    // return expense.date > sevenDaysAgo;



  });
  return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />;
}
export default RecentExpenses;
