import { Container, Paper, Title, Tabs } from "@mantine/core";
import { User, Target } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import Sidebar from "../Sidebar/Sidebar";
import EditProfile from "../UserInfo/EditProfile";
import GoalSettings from "./GoalSettings";

const Settings = () => {
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");

  return (
    <div className="general-layout" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Container
        ml={largeScreen ? 600 : midScreen ? 450 : 250}
        mt={largeScreen ? 60 : 20}
        size="md"
        sx={{ flex: 1 }}
      >
        <Paper radius="md" p={40} withBorder shadow="sm">
          <Title order={1} mb={30} align="center">
            Settings
          </Title>

          <Tabs color="indigo" variant="outline">
            <Tabs.Tab label="Profile" icon={<User size={14} />}>
              <div style={{ paddingTop: "20px" }}>
                <EditProfile />
              </div>
            </Tabs.Tab>
            <Tabs.Tab label="Financial Goals" icon={<Target size={14} />}>
              <div style={{ paddingTop: "20px" }}>
                <GoalSettings />
              </div>
            </Tabs.Tab>
          </Tabs>
        </Paper>
      </Container>
    </div>
  );
};

export default Settings;

