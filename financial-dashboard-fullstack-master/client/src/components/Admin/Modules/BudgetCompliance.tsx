import { Table, Progress, Text, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_BASE_URL } from "../../../constants";

const BudgetCompliance = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("currentToken");

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const compliance: any = [];
      res.data.forEach((user: any) => {
        user.budget?.forEach((b: any) => {
          const spent = user.expense
            ?.filter((e: any) => e.tag === b.tag)
            .reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
          const percent = b.budget > 0 ? (spent / b.budget) * 100 : 0;
          compliance.push({ username: user.username, category: b.tag, budget: b.budget, spent, percent });
        });
      });
      setData(compliance.sort((a: any, b: any) => b.percent - a.percent));
    });
  }, [token]);

  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>User</th>
          <th>Category</th>
          <th>Budget Status</th>
          <th>Risk Level</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, i) => (
          <tr key={i}>
            <td>{item.username}</td>
            <td>{item.category}</td>
            <td style={{ width: "200px" }}>
              <Text size="xs">Spent ${item.spent} of ${item.budget}</Text>
              <Progress value={item.percent} color={item.percent > 100 ? "red" : "blue"} />
            </td>
            <td>
              {item.percent > 100 ? <Badge color="red">Over Budget</Badge> :
               item.percent > 80 ? <Badge color="yellow">Warning</Badge> :
               <Badge color="green">Safe</Badge>}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BudgetCompliance;
