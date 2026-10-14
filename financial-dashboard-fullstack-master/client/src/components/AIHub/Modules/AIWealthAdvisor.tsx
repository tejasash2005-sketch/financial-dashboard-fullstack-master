import { useState } from "react";
import { Box, Button, Paper, Text, Title, Badge, Group, ThemeIcon, Textarea, Loader } from "@mantine/core";
import { PremiumRights, ShieldCheck, Diamond, Quote } from "tabler-icons-react";
import axios from "axios";

const AIWealthAdvisor = () => {
  const [scenario, setScenario] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    if (!scenario) return;
    setLoading(true);

    try {
      // Gemini API call format
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GOOGLE_AI_KEY}`,
        {
          contents: [{
            parts: [{
              text: `You are a high-net-worth wealth advisor. Provide sophisticated, long-term wealth preservation and growth advice for this scenario: ${scenario}. Keep it professional and focus on tax efficiency and diversification.`
            }]
          }]
        }
      );

      const result = response.data.candidates[0].content.parts[0].text;
      setAdvice(result);
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Wealth Advisor failed to respond. Check Google API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={20}>
      <Group mb="md">
        <Title order={3}>Sophisticated Wealth Advisor</Title>
        <Badge color="gold" variant="filled" sx={{ backgroundColor: '#D4AF37' }}>Premium AI</Badge>
      </Group>

      <Paper withBorder p="md" radius="md" mb={20} shadow="sm">
        <Textarea
          label="Describe your wealth goals or scenario"
          placeholder="e.g. How should I allocate €50,000 for a 10-year horizon considering current inflation?"
          minRows={3}
          value={scenario}
          onChange={(e) => setScenario(e.currentTarget.value)}
          mb="md"
        />
        <Button
          fullWidth
          onClick={getAdvice}
          loading={loading}
          sx={{ backgroundColor: '#2C3E50', '&:hover': { backgroundColor: '#1A252F' } }}
          leftIcon={<Diamond size={16} />}
        >
          Consult Advisor
        </Button>
      </Paper>

      {loading && <Box py={30} sx={{ textAlign: 'center' }}><Loader color="yellow" /></Box>}

      {advice && (
        <Paper withBorder p="xl" radius="md" sx={{ borderLeft: '5px solid #D4AF37', backgroundColor: '#FBFAf5' }}>
          <Box>
            <Group mb="md">
              <ThemeIcon color="yellow" variant="light" size="lg">
                <Quote size={20} />
              </ThemeIcon>
              <Text weight={700} color="dark">Advisor's Recommendation</Text>
            </Group>
            <Text sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontStyle: 'italic' }} color="dimmed">
              {advice}
            </Text>
            <Group mt="md">
              <ShieldCheck size={18} color="green" />
              <Text size="xs" color="dimmed">This advice is AI-generated for educational purposes.</Text>
            </Group>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AIWealthAdvisor;
