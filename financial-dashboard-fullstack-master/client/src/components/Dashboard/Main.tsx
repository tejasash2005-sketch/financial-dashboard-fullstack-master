import { Container, Grid, Paper, Text, Title, Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Stars, ArrowRight } from "tabler-icons-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

import { StatsOverview } from "../Dashboard/StatsOverview";
import { IncomeExpenseOverviewTable } from "./IncomeExpenseOverviewTable";
import { SavingsGoalOverview } from "./SavingsGoalOverview";

const Main = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user) as any;
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");

  return (
    <Container
      ml={largeScreen ? 600 : midScreen ? 450 : 250}
      mt={largeScreen ? 60 : 20}
    >
      <Paper radius="md" p={60} shadow="sm">
        <Group position="apart" mb={30}>
          <Title order={1}>Financial Overview</Title>
          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            leftIcon={<Stars size={18} />}
            rightIcon={<ArrowRight size={16} />}
            onClick={() => navigate(`/ai-hub/${user.username}`)}
          >
            Ask AI Assistant
          </Button>
        </Group>
        <StatsOverview />
      </Paper>
      <Grid mt={50}>
        <Grid.Col md={8}>
          <Text weight={500} size="lg" mb={10}>
            Latest Expenses
          </Text>
          <IncomeExpenseOverviewTable />
        </Grid.Col>
        <Grid.Col md={4}>
          <Text weight={500} size="lg" mb={10}>
            Budget Tracker
          </Text>
          <SavingsGoalOverview />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Main;
