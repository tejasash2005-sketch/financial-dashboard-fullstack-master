import { useState } from "react";
import { Box, Button, Paper, Text, Title, List, ThemeIcon, Loader, Divider, Group } from "@mantine/core";
import { CheckupList, Cash, TrendingUp, TrendingDown, Stars } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import axios from "axios";

const AIFinancialPlanner = () => {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user) as any;

  const generatePlan = async () => {
    setLoading(true);

    // Prepare data for AI
    const financialData = {
      expenses: user.expense?.map((e: any) => ({ amount: e.amount, tag: e.tag })),
      income: user.income?.map((i: any) => ({ amount: i.amount, tag: i.tag })),
      investments: user.investments?.map((inv: any) => ({ amount: inv.amount, category: inv.category })),
    };

    try {
      const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a professional financial planner. Analyze the provided user financial data and generate a Profit/Loss summary and a strategic 3-step action plan for the next month. Format the response as JSON with keys: profit_loss_summary, plan_steps (array of 3 strings), and overall_health_score (0-100)."
          },
          {
            role: "user",
            content: JSON.stringify(financialData)
          }
        ],
        response_format: { type: "json_object" }
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      const result = JSON.parse(response.data.choices[0].message.content);
      setPlan(result);
    } catch (error) {
      console.error("AI Planning Error:", error);
      alert("Failed to generate plan. Please ensure your Groq API key is valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={20}>
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Group position="apart" mb="xl">
          <Title order={3}>AI Strategic Financial Planner</Title>
          <Button
            leftIcon={<Stars size={16} />}
            onClick={generatePlan}
            loading={loading}
            color="indigo"
          >
            Analyze & Generate Plan
          </Button>
        </Group>

        {!plan && !loading && (
          <Text color="dimmed" align="center" py={50}>
            Click the button above to let AI analyze your expenses, income, and investments to build a personalized strategy.
          </Text>
        )}

        {loading && (
          <Box py={50} sx={{ textAlign: 'center' }}>
            <Loader size="lg" variant="dots" color="indigo" />
            <Text mt="md" size="sm" color="dimmed">AI is crunching your numbers...</Text>
          </Box>
        )}

        {plan && (
          <Box>
            <Group grow mb="xl">
              <Paper withBorder p="md" radius="md">
                <Text size="xs" color="dimmed" weight={700} transform="uppercase">Financial Health Score</Text>
                <Title order={2} color={plan.overall_health_score > 70 ? "green" : "orange"}>
                  {plan.overall_health_score}/100
                </Title>
              </Paper>
              <Paper withBorder p="md" radius="md">
                <Text size="xs" color="dimmed" weight={700} transform="uppercase">P&L Outlook</Text>
                <Text size="sm">{plan.profit_loss_summary}</Text>
              </Paper>
            </Group>

            <Divider my="lg" label="3-Step Strategic Plan" labelPosition="center" />

            <List
              spacing="md"
              size="sm"
              icon={
                <ThemeIcon color="indigo" size={24} radius="xl">
                  <CheckupList size={16} />
                </ThemeIcon>
              }
            >
              {plan.plan_steps.map((step: string, index: number) => (
                <List.Item key={index}>
                  <Text weight={500}>{step}</Text>
                </List.Item>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AIFinancialPlanner;
