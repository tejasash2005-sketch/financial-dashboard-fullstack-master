import { Container, Paper, Tabs, Title, Group, Badge } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MessageDots, Calculator, ChartLine, PremiumRights, Stars, Bulb } from "tabler-icons-react";
import AIChatAssistant from "./Modules/AIChatAssistant";
import AIFinancialPlanner from "./Modules/FinancialPlanner";
import AIMarketAnalyst from "./Modules/AIMarketAnalyst";
import AIWealthAdvisor from "./Modules/AIWealthAdvisor";

const AIHubMain = () => {
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
          <Group>
            <Stars size={28} color="#6741d9" />
            <Title order={1}>AI Finance Hub</Title>
          </Group>
          <Badge color="grape" variant="filled" size="lg">Powered by Gemini & Groq</Badge>
        </Group>

        <Tabs variant="outline" defaultValue="AIChat">
          <Tabs.Tab label="AI Chat Assistant" icon={<MessageDots size={14} />}>
            <AIChatAssistant />
          </Tabs.Tab>

          <Tabs.Tab label="AI Financial Planner" icon={<Calculator size={14} />}>
            <AIFinancialPlanner />
          </Tabs.Tab>

          <Tabs.Tab label="AI Market Analyst (Groq)" icon={<ChartLine size={14} />}>
            <AIMarketAnalyst />
          </Tabs.Tab>

          <Tabs.Tab label="AI Wealth Advisor (Google)" icon={<PremiumRights size={14} />}>
            <AIWealthAdvisor />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </Container>
  );
};

export default AIHubMain;
