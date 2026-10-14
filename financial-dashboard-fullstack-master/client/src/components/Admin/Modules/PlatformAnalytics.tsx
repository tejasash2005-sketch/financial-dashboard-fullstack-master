import { SimpleGrid, Paper, Text, Group, Title, Box } from "@mantine/core";
import { Users, Coin, ChartPie, Activity } from "tabler-icons-react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_BASE_URL } from "../../../constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

const PlatformAnalytics = () => {
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalExpenses: 0,
    totalIncome: 0,
    userChartData: [],
    categoryData: [],
    monthlyTrendData: [],
    userGrowthData: [],
  });
  const token = localStorage.getItem("currentToken");

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const users = res.data;
      let expenses = 0;
      let income = 0;
      const categories: any = {};
      const monthlyTrends: any = {};
      const userRegistrations: any = {};

      users.forEach((u: any) => {
        // Track User Registrations
        const regMonth = u.createdAt ? u.createdAt.slice(0, 7) : "Unknown";
        userRegistrations[regMonth] = (userRegistrations[regMonth] || 0) + 1;

        u.expense?.forEach((e: any) => {
          expenses += e.amount || 0;
          categories[e.tag] = (categories[e.tag] || 0) + (e.amount || 0);

          const month = e.date ? e.date.slice(0, 7) : "Unknown";
          if (!monthlyTrends[month]) monthlyTrends[month] = { month, income: 0, expense: 0 };
          monthlyTrends[month].expense += e.amount || 0;
        });

        u.income?.forEach((i: any) => {
          income += i.amount || 0;
          const month = i.date ? i.date.slice(0, 7) : "Unknown";
          if (!monthlyTrends[month]) monthlyTrends[month] = { month, income: 0, expense: 0 };
          monthlyTrends[month].income += i.amount || 0;
        });
      });

      const userChartData = [
        { name: "Income", value: income },
        { name: "Expenses", value: expenses },
      ];

      const categoryData = Object.keys(categories).map((key) => ({
        name: key,
        value: categories[key],
      }));

      const monthlyTrendData = Object.values(monthlyTrends).sort((a: any, b: any) => a.month.localeCompare(b.month));

      let cumulativeUsers = 0;
      const userGrowthData = Object.keys(userRegistrations)
        .sort()
        .map(month => {
          cumulativeUsers += userRegistrations[month];
          return { month, users: cumulativeUsers };
        });

      setStats({
        totalUsers: users.length,
        totalExpenses: expenses,
        totalIncome: income,
        userChartData,
        categoryData,
        monthlyTrendData,
        userGrowthData,
      });
    });
  }, [token]);

  const data = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={32} color="blue" />,
    },
    {
      title: "Platform Income",
      value: `€${stats.totalIncome.toLocaleString()}`,
      icon: <Coin size={32} color="green" />,
    },
    {
      title: "Platform Expenses",
      value: `€${stats.totalExpenses.toLocaleString()}`,
      icon: <ChartPie size={32} color="red" />,
    },
    {
      title: "Active Sessions",
      value: Math.max(1, Math.floor(stats.totalUsers * 0.4)),
      icon: <Activity size={32} color="orange" />,
    },
  ];

  return (
    <Box>
      <SimpleGrid cols={4} mt="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {data.map((item) => (
          <Paper withBorder p="md" radius="md" key={item.title} shadow="xs">
            <Group position="apart">
              <Text size="xs" color="dimmed" weight={700} transform="uppercase">
                {item.title}
              </Text>
              {item.icon}
            </Group>
            <Group align="flex-end" spacing="xs" mt={25}>
              <Title order={3}>{item.value}</Title>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {/* Chart 1: Income vs Expense Volume */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Title order={4} mb="md">Income vs Expense Volume</Title>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.userChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Total Volume (€)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Chart 2: Platform-Wide Spending by Category */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Title order={4} mb="md">Spending by Category</Title>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {stats.categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Chart 3: Monthly Financial Trends (Line Chart) */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Title order={4} mb="md">Monthly Financial Trends</Title>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={stats.monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income (€)" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" stroke="#ff7300" name="Expense (€)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Chart 4: Cumulative User Growth (Area Chart) */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Title order={4} mb="md">User Growth Trend</Title>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={stats.userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" name="Total Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </SimpleGrid>
    </Box>
  );
};

export default PlatformAnalytics;
