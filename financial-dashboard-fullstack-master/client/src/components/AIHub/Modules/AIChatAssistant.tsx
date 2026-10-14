import { useState } from "react";
import { Box, TextInput, Button, Paper, Text, ScrollArea, Group, Avatar } from "@mantine/core";
import { Send, Robot, User } from "tabler-icons-react";
import axios from "axios";

const AIChatAssistant = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I am your AI Financial Assistant. How can I help you with your finances today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // For now, we use a generic endpoint or mock logic until keys are set
      // In a real app, you'd call your backend or a proxy to keep keys safe
      const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
        model: "llama3-8b-8192",
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      const assistantMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages([...newMessages, { role: "assistant", content: "I'm having trouble connecting to my brain right now. Please check if the Groq API key is set in your .env file." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={20}>
      <Paper withBorder p="md" radius="md" shadow="xs" mb={20}>
        <ScrollArea style={{ height: 400 }} offsetScrollbars>
          {messages.map((m, i) => (
            <Group key={i} align="flex-start" mb="md" position={m.role === "user" ? "right" : "left"}>
              {m.role === "assistant" && <Avatar color="indigo" radius="xl"><Robot size={20} /></Avatar>}
              <Paper
                p="sm"
                radius="md"
                sx={(theme) => ({
                  maxWidth: "80%",
                  backgroundColor: m.role === "user" ? theme.colors.indigo[6] : theme.colors.gray[1]
                })}
              >
                <Text size="sm" color={m.role === "user" ? "white" : "black"}>{m.content}</Text>
              </Paper>
              {m.role === "user" && <Avatar color="blue" radius="xl"><User size={20} /></Avatar>}
            </Group>
          ))}
        </ScrollArea>
      </Paper>

      <Group>
        <TextInput
          placeholder="Ask me anything about finance..."
          sx={{ flex: 1 }}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <Button onClick={handleSend} loading={loading} color="indigo">
          <Send size={18} />
        </Button>
      </Group>
    </Box>
  );
};

export default AIChatAssistant;
