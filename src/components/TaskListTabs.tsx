import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import TaskList from "./TaskList";
import { useTasks } from "../contexts/TasksContext";

export default function TaskListTabs() {
  const { tasks } = useTasks();

  const waitingTasks = tasks.filter((task) => task.remainingTimeInSecond > 0);
  const finishedTasks = tasks.filter(
    (task) => task.remainingTimeInSecond === 0
  );

  return (
    <Tabs variant="soft-rounded" colorScheme="main">
      <TabList>
        <Tab>할 일 목록</Tab>
        <Tab>완료 한 일</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0}>
          <TaskList
            tasks={waitingTasks}
            emptyMessage="할 일 추가하기 버튼을 눌러 할 일을 추가하세요"
          />
        </TabPanel>
        <TabPanel px={0}>
          <TaskList
            tasks={finishedTasks}
            emptyMessage="아직 완료된 일이 없습니다"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
