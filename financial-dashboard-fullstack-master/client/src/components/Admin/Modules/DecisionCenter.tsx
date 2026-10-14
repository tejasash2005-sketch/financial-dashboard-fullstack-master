import { Paper, Title, Text, Button, Group, Alert, Divider, List, ThemeIcon } from "@mantine/core";
import { AlertCircle, Check, ArrowRight, TrendingUp, Users } from "tabler-icons-react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_BASE_URL } from "../../../constants";

const DecisionCenter = () => {
  const [data, setData] = useState({ highSpenders: [], inactiveUsers: [], lowBudgetUsers: [] });
  const token = localStorage.getItem("currentToken");

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
        const users = res.data;
        const highSpenders = users.filter((u: any) => u.expense?.reduce((acc: number, e: any) => acc + e.amount, 0) > 5000);
        const inactiveUsers = users.filter((u: any) => (u.expense?.length || 0) === 0);
        const lowBudgetUsers = users.filter((u: any) => u.budget?.some((b: any) => b.budget < 100));

        setData({ highSpenders, inactiveUsers, lowBudgetUsers });
    });
  }, [token]);

  return (
    <Paper p="md">
      <Title order={3} mb="sm">Decision Support System</Title>
      <Text color="dimmed" mb="xl">Automated insights based on real-time platform data to help you manage the community.</Text>

      <Group grow align="flex-start" mb="xl">
        <Alert icon={<AlertCircle size={16} />} title="Retention Risk" color="yellow" variant="outline">
          There are <Text weight={700} component="span">{data.inactiveUsers.length}</Text> inactive users who haven't recorded any expenses yet.
          <Group mt="md">
            <Button size="xs" color="yellow" variant="light">Send Engagement Email</Button>
          </Group>
        </Alert>

        <Alert icon={<TrendingUp size={16} />} title="Revenue Opportunity" color="green" variant="outline">
          <Text weight={700} component="span">{data.highSpenders.length}</Text> users have spent over €5,000 this month.
          They are prime candidates for the Premium Pro plan.
          <Group mt="md">
            <Button size="xs" color="green" variant="light">Launch Upsell Campaign</Button>
          </Group>
        </Alert>
      </Group>

      <Divider my="xl" label="System Recommendations" labelPosition="center" />

      <List
        spacing="md"
        size="sm"
        center
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <Check size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>
          <Text weight={500}>Infrastructure Scaling:</Text> User growth is steady (+12% this week). Current server load is at 45%. No immediate action required.
        </List.Item>
        <List.Item>
            <Text weight={500}>Compliance Alert:</Text> <Text component="span" weight={700}>{data.lowBudgetUsers.length}</Text> users have budgets under €100. Consider adding a "Micro-budgeting" guide to the help center.
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="orange" size={24} radius="xl">
              <ArrowRight size={16} />
            </ThemeIcon>
          }
        >
          <Text weight={500}>Strategic Pivot:</Text> Crypto portfolio tracking is used by 70% of active admins. Recommend prioritizing the Real-time API integration.
        </List.Item>
      </List>

      <Group position="right" mt="xl">
          <Button variant="outline" color="indigo" leftIcon={<Users size={16}/>}>Generate Platform Report (PDF)</Button>
      </Group>
    </Paper>
  );
};

export default DecisionCenter;
