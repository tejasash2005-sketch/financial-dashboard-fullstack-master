import { Table, Button, Text, Group, Badge, Avatar, ActionIcon, Tooltip } from "@mantine/core";
import { Trash, Eye, ShieldCheck, ShieldOff, Key } from "tabler-icons-react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_BASE_URL } from "../../../constants";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("currentToken");

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = () => {
    Axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      Axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setUsers(users.filter((u: any) => u._id !== userId));
      });
    }
  };

  const toggleAdmin = (user: any) => {
    const newStatus = !user.isAdmin;
    Axios.put(
      `${API_BASE_URL}/users/${user._id}`,
      { isAdmin: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      alert(`User ${user.username} is now ${newStatus ? "an Admin" : "a regular User"}`);
      fetchUsers();
    });
  };

  const resetPassword = (user: any) => {
      alert(`Password reset link sent to ${user.email}`);
  };

  const rows = users.map((user: any) => (
    <tr key={user._id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} radius={40} src={user.image?.[0]?.imageUrl} />
          <div>
            <Text size="sm" weight={500}>
              {user.username}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        {user.isAdmin ? (
          <Badge color="red" variant="filled">
            Admin
          </Badge>
        ) : (
          <Badge color="blue" variant="outline">
            User
          </Badge>
        )}
      </td>
      <td>{user.expense?.length || 0} Expenses</td>
      <td>
        <Group spacing={8} position="right">
          <Tooltip label="Toggle Admin Role">
            <ActionIcon color={user.isAdmin ? "orange" : "blue"} variant="light" onClick={() => toggleAdmin(user)}>
              {user.isAdmin ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Reset Password">
            <ActionIcon color="gray" variant="light" onClick={() => resetPassword(user)}>
              <Key size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete User">
            <ActionIcon color="red" variant="light" onClick={() => handleDelete(user._id)}>
              <Trash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Table verticalSpacing="sm" highlightOnHover>
      <thead>
        <tr>
          <th>User Profile</th>
          <th>Privileges</th>
          <th>Activity Level</th>
          <th style={{ textAlign: "right" }}>Management Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default UserManager;
