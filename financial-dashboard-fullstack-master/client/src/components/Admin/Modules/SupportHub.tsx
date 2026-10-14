import { TextInput, Button, Paper, Title, Text, List, Group, Box } from "@mantine/core";
import { Send, UserCheck } from "tabler-icons-react";

const SupportHub = () => {
  return (
    <Box>
      <Paper withBorder p="md" mb="md">
        <Title order={5} mb="sm">Global System Message</Title>
        <Text size="sm" mb="md" color="dimmed">Send a notification to all users currently logged into the dashboard.</Text>
        <Group align="flex-end">
          <TextInput style={{ flex: 1 }} placeholder="System maintenance starting in 10 minutes..." />
          <Button leftIcon={<Send size={16} />}>Broadcast</Button>
        </Group>
      </Paper>

      <Paper withBorder p="md">
        <Title order={5} mb="sm">Direct Support Access</Title>
        <List spacing="xs" size="sm" center icon={<UserCheck size={16} color="blue" />}>
          <List.Item>Alice - Issue with Investment Sync</List.Item>
          <List.Item>Bob - Budget notification not firing</List.Item>
          <List.Item>Charlie - Password reset request</List.Item>
        </List>
        <Button variant="light" fullWidth mt="md">Open Support Ticket Dashboard</Button>
      </Paper>
    </Box>
  );
};

export default SupportHub;
