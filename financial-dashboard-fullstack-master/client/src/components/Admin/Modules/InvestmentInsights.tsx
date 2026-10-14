import { Title, Text, SimpleGrid, Paper, RingProgress, Center, Group, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_BASE_URL } from "../../../constants";

const InvestmentInsights = () => {
  const [trends, setTrends] = useState<any>({});
  const token = localStorage.getItem("currentToken");

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const counts: any = {};
      res.data.forEach((user: any) => {
        user.investments?.forEach((inv: any) => {
          counts[inv.category] = (counts[inv.category] || 0) + 1;
        });
      });
      setTrends(counts);
    });
  }, [token]);

  return (
    <div>
      <Title order={4} mb="md">Popular Asset Classes (Global)</Title>
      <SimpleGrid cols={3}>
        {Object.entries(trends).map(([cat, count]: any) => (
          <Paper withBorder p="md" key={cat}>
            <Group position="apart">
                <Text weight={500}>{cat}</Text>
                <Badge>{count} Users</Badge>
            </Group>
            <Center mt="md">
                <RingProgress
                    sections={[{ value: (count / 10) * 100, color: "blue" }]}
                    label={<Text align="center" size="xs">Trending</Text>}
                />
            </Center>
          </Paper>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default InvestmentInsights;
