import { ButtonGroup, Flex, Grid, GridItem } from "@chakra-ui/react";

import SelectedTaskDetail from "./SelectedTaskDetail";
import TaskListTabs from "./TaskListTabs";
import AddTaskFormModalOpenButton from "./AddTaskFormModalOpenButton";
import { TasksProvider } from "../contexts/TasksContext";

export default function Tasks() {
  return (
    <TasksProvider>
      <Grid gap={4} templateColumns={{ md: "repeat(3, 1fr)" }}>
        <Flex direction="column" rowGap={4}>
          <ButtonGroup alignSelf="flex-end">
            <AddTaskFormModalOpenButton />
          </ButtonGroup>
          <SelectedTaskDetail />
        </Flex>
        <GridItem colSpan={{ md: 2 }}>
          <TaskListTabs />
        </GridItem>
      </Grid>
    </TasksProvider>
  );
}
