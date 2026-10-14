import { Timeline, Text, Paper } from "@mantine/core";
import { DeviceMobile, UserPlus, Trash, Edit } from "tabler-icons-react";

const AuditLogs = () => {
  return (
    <Paper p="md">
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<UserPlus size={12} />} title="New User Registered">
          <Text color="dimmed" size="xs">A new user <Text variant="link" component="span" inherit>Alice</Text> joined the platform.</Text>
          <Text size="xs" mt={4}>2 hours ago</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<Edit size={12} />} title="System Configuration Change">
          <Text color="dimmed" size="xs">Admin updated the global currency settings to support INR.</Text>
          <Text size="xs" mt={4}>5 hours ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Backup Completed" bullet={<DeviceMobile size={12} />} lineVariant="dashed">
          <Text color="dimmed" size="xs">Cloud database backup was successfully stored in AWS S3.</Text>
          <Text size="xs" mt={4}>Yesterday</Text>
        </Timeline.Item>

        <Timeline.Item title="Account Deleted" bullet={<Trash size={12} />}>
          <Text color="dimmed" size="xs">User <Text variant="link" component="span" inherit>JohnDoe</Text> requested account deletion.</Text>
          <Text size="xs" mt={4}>2 days ago</Text>
        </Timeline.Item>
      </Timeline>
    </Paper>
  );
};

export default AuditLogs;
