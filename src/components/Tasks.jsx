import PropTypes from "prop-types";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TaskList from "./TaskList";

export default function Tasks({ tasks, selectedTaskId, dispatch }) {
  const waitingTasks = tasks.filter((task) => task.remainingTimeInSecond > 0);
  const finishedTasks = tasks.filter((task) => task.remainingTimeInSecond === 0);

  return (
    <Tabs variant="soft-rounded" colorScheme="main">
      <TabList>
        <Tab>할 일 목록</Tab>
        <Tab>완료 한 일</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TaskList
            tasks={waitingTasks}
            selectedTaskId={selectedTaskId}
            emptyMessage="할 일 추가하기 버튼을 눌러 할 일을 추가하세요"
            dispatch={dispatch}
          />
        </TabPanel>
        <TabPanel>
          <TaskList
            tasks={finishedTasks}
            selectedTaskId={selectedTaskId}
            emptyMessage="아직 완료된 일이 없습니다"
            dispatch={dispatch}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedTaskId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};
