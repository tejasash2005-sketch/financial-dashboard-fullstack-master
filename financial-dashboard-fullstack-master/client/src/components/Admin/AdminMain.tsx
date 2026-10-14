import { Container, Paper, Tabs, Title, Group, Badge } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { User, ChartBar, Cash, ShieldLock, Activity, TrendingUp, Help, Bulb } from "tabler-icons-react";
import UserManager from "./Modules/UserManager";
import PlatformAnalytics from "./Modules/PlatformAnalytics";
import BudgetCompliance from "./Modules/BudgetCompliance";
import InvestmentInsights from "./Modules/InvestmentInsights";
import AuditLogs from "./Modules/AuditLogs";
import RevenueModel from "./Modules/RevenueModel";
import SupportHub from "./Modules/SupportHub";
import DecisionCenter from "./Modules/DecisionCenter";

const AdminMain = () => {
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");

  return (
    <Container
      ml={largeScreen ? 600 : midScreen ? 450 : 250}
      mt={largeScreen ? 60 : 20}
      fluid
    >
      <Paper radius="md" p={30} shadow="lg">
        <Group position="apart" mb={30}>
          <Title order={1}>Admin Control Center</Title>
          <Group spacing="xs">
            <Badge color="green" variant="dot" size="lg">System Online</Badge>
            <Badge color="blue" variant="light" size="lg">API v1.4.2</Badge>
          </Group>
        </Group>

        <Tabs variant="outline" defaultValue="UserManager">
          <Tabs.Tab label="User Manager" icon={<User size={14} />}>
            <UserManager />
          </Tabs.Tab>

          <Tabs.Tab label="Decision Center" icon={<Bulb size={14} />}>
            <DecisionCenter />
          </Tabs.Tab>

          <Tabs.Tab label="Platform Analytics" icon={<ChartBar size={14} />}>
            <PlatformAnalytics />
          </Tabs.Tab>

          <Tabs.Tab label="Budget Compliance" icon={<Cash size={14} />}>
            <BudgetCompliance />
          </Tabs.Tab>

          <Tabs.Tab label="Investment Insights" icon={<TrendingUp size={14} />}>
            <InvestmentInsights />
          </Tabs.Tab>

          <Tabs.Tab label="Audit Logs" icon={<ShieldLock size={14} />}>
            <AuditLogs />
          </Tabs.Tab>

          <Tabs.Tab label="Revenue Model" icon={<Activity size={14} />}>
            <RevenueModel />
          </Tabs.Tab>

          <Tabs.Tab label="Support Hub" icon={<Help size={14} />}>
            <SupportHub />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </Container>
  );
};

export default AdminMain;
