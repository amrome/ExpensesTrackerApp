import { View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({
  expenses,
  DUMMY_EXPENSES,
  expensesPeriod,
  fallbackText,
}) {
  const expensesToShow = expenses ?? DUMMY_EXPENSES ?? [];

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expensesToShow.length > 0) {
    content = <ExpensesList expenses={expensesToShow} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expensesToShow} />
      {content}
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
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
