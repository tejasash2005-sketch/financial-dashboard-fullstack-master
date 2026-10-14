import { useState } from "react";
import { Box, Button, Paper, Text, Title, SimpleGrid, Group, Badge, TextInput, Loader } from "@mantine/core";
import { ChartLine, TrendingUp, AlertTriangle, Search } from "tabler-icons-react";
import axios from "axios";

const AIMarketAnalyst = () => {
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const performAnalysis = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
        model: "llama3-70b-8192", // Use a larger model for analysis
        messages: [
          {
            role: "system",
            content: "You are a senior market analyst. Analyze the specific stock, crypto, or market trend requested. Provide: 1. Sentiment (Bullish/Bearish), 2. Potential Risk (High/Medium/Low), 3. Key Catalyst. Format as JSON."
          },
          {
            role: "user",
            content: query
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
      setAnalysis(result);
    } catch (error) {
      console.error("Groq Analysis Error:", error);
      alert("Analysis failed. Ensure Groq API key is set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={20}>
      <Title order={3} mb="md">Advanced Market Analyst (via Groq)</Title>
      <Paper withBorder p="md" radius="md" mb={20}>
        <Group align="flex-end">
          <TextInput
            label="What asset or trend should I analyze?"
            placeholder="e.g. Bitcoin, S&P 500, Tech Sector..."
            sx={{ flex: 1 }}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button
            onClick={performAnalysis}
            loading={loading}
            color="indigo"
            leftIcon={<Search size={16}/>}
          >
            Analyze Trend
          </Button>
        </Group>
      </Paper>

      {analysis && (
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Paper withBorder p="md" radius="md" shadow="xs">
            <Group position="apart">
              <Text size="xs" color="dimmed" weight={700} transform="uppercase">Market Sentiment</Text>
              <TrendingUp size={20} color={analysis.sentiment === "Bullish" ? "green" : "red"} />
            </Group>
            <Title order={2} mt="md" color={analysis.sentiment === "Bullish" ? "green" : "red"}>
              {analysis.sentiment}
            </Title>
          </Paper>

          <Paper withBorder p="md" radius="md" shadow="xs">
            <Group position="apart">
              <Text size="xs" color="dimmed" weight={700} transform="uppercase">Risk Profile</Text>
              <AlertTriangle size={20} color={analysis.risk === "High" ? "red" : "blue"} />
            </Group>
            <Title order={2} mt="md">
              {analysis.risk}
            </Title>
          </Paper>

          <Paper withBorder p="md" radius="md" shadow="xs">
            <Text size="xs" color="dimmed" weight={700} transform="uppercase">Key Catalyst</Text>
            <Text mt="md" size="sm" weight={500}>
              {analysis.catalyst || analysis.key_catalyst}
            </Text>
          </Paper>
        </SimpleGrid>
      )}

      {loading && <Box py={40} sx={{ textAlign: 'center' }}><Loader color="indigo" variant="bars" /></Box>}
    </Box>
  );
};

export default AIMarketAnalyst;
