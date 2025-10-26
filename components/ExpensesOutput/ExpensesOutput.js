import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, DUMMY_EXPENSES, expensesPeriod }) {
  const expensesToShow = expenses ?? DUMMY_EXPENSES ?? [];

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expensesToShow} />
      <ExpensesList expenses={expensesToShow} />
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
