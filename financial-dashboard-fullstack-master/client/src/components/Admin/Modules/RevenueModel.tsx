import { Card, Text, Group, Badge, Progress, Box } from "@mantine/core";

const RevenueModel = () => {
  return (
    <Box>
      <Card shadow="sm" p="lg" radius="md" withBorder mb="md">
        <Group position="apart" mb="xs">
          <Text weight={500}>Premium Subscriptions</Text>
          <Badge color="pink" variant="light">Pro Plan</Badge>
        </Group>
        <Text size="sm" color="dimmed">Current converted users: 15%</Text>
        <Progress value={15} mt="md" size="lg" radius="xl" color="pink" />
      </Card>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mb="xs">
          <Text weight={500}>Estimated Ad Revenue</Text>
          <Badge color="green" variant="light">Daily Avg</Badge>
        </Group>
        <Text weight={700} size="xl">$42.50 / day</Text>
        <Text size="xs" color="dimmed">Based on 1.2k daily active users.</Text>
      </Card>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mb="xs">
          <Text weight={500}>Projected Annual Growth</Text>
        </Group>
        <Text weight={700} size="xl" color="blue">+240%</Text>
        <Text size="xs" color="dimmed">Estimated for Year 2026.</Text>
      </Card>
    </Box>
  );
};

export default RevenueModel;
