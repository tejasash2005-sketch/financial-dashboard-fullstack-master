import { Progress, Text, Group, Badge, Paper } from "@mantine/core";
import { RootState } from "../../Redux/store";
import ExpensesFunctions from "../../stats/expenses";
import { useSelector } from "react-redux";

export function SavingsGoalOverview() {
  // Expense Data by category
  const { totalExpenseByCategoryCurrentMonth } = ExpensesFunctions();
  const expenseData = Object.entries(totalExpenseByCategoryCurrentMonth).map(
    (item) => item
  );

  // Budget Data from Redux Store
  const budgetData = useSelector((state: RootState) => state.user.user.budget);

  if (!budgetData || budgetData.length === 0) {
    return (
      <Paper radius="md" withBorder p={30}>
        <Text align="center">No budget data set.</Text>
      </Paper>
    );
  }

  // Check if categories of expenses and budget are the same
  const firstBudget = budgetData[0];
  const categoryExpense = expenseData.find((item) =>
    item[0].toLowerCase() === firstBudget.tag.toLowerCase()
  );

  //@ts-ignore
  const spentAmount: number = categoryExpense ? categoryExpense[1] : 0;
  const progressValue = firstBudget.budget > 0 ? Math.floor((spentAmount / firstBudget.budget) * 100) : 0;

  return (
    <Paper radius="md" withBorder p={30}>
      <Text align="center" weight={700}>
        {firstBudget.title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Budget: {firstBudget.budget} EUR
      </Text>
      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Already spent:
        </Text>
        <Text size="sm" color="dimmed">
          {progressValue}%
        </Text>
      </Group>
      <Progress
        value={progressValue}
        mt={5}
      />
      <Group position="apart" mt="md">
        <Text size="sm">
          Spent: {spentAmount} EUR
        </Text>
        <Badge size="sm">{firstBudget.tag}</Badge>
      </Group>
    </Paper>
  );
}
