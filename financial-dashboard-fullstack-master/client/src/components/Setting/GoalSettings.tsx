import { NumberInput, Button, Group, Box, Title, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { setUserGoals } from "../../Redux/userSlice";

export default function GoalSettings() {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.user.goals) as any;

  const form = useForm({
    initialValues: {
      totalValueTarget: goals.totalValueTarget,
      cryptoPercentTarget: goals.cryptoPercentTarget,
      stockPercentTarget: goals.stockPercentTarget,
      cashPercentTarget: goals.cashPercentTarget,
    },
  });

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto" mt={20}>
      <Title order={3} mb="md">Financial Goals</Title>
      <Divider mb="xl" />
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(setUserGoals(values));
          alert("Goals updated successfully (Local State)!");
        })}
      >
        <NumberInput
          label="Total Portfolio Target (€)"
          {...form.getInputProps("totalValueTarget")}
          mb="sm"
        />
        <NumberInput
          label="Crypto Target (%)"
          {...form.getInputProps("cryptoPercentTarget")}
          max={100}
          min={0}
          mb="sm"
        />
        <NumberInput
          label="Stocks Target (%)"
          {...form.getInputProps("stockPercentTarget")}
          max={100}
          min={0}
          mb="sm"
        />
        <NumberInput
          label="Cash Target (%)"
          {...form.getInputProps("cashPercentTarget")}
          max={100}
          min={0}
          mb="md"
        />
        <Group position="right">
          <Button type="submit" color="indigo">Save Goals</Button>
        </Group>
      </form>
    </Box>
  );
}
