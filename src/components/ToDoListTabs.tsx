import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import ToDoList from "./ToDoList";
import { useToDos } from "../contexts/ToDosContext";

export default function ToDoListTabs() {
  const { items: toDos } = useToDos();

  const waitingToDos = toDos.filter((toDo) => toDo.remainingTimeInSecond > 0);
  const finishedToDos = toDos.filter(
    (toDo) => toDo.remainingTimeInSecond === 0
  );

  return (
    <Tabs variant="soft-rounded" colorScheme="main">
      <TabList>
        <Tab>할 일 목록</Tab>
        <Tab>완료 한 일</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0}>
          <ToDoList
            toDos={waitingToDos}
            emptyMessage="할 일 추가하기 버튼을 눌러 할 일을 추가하세요"
          />
        </TabPanel>
        <TabPanel px={0}>
          <ToDoList
            toDos={finishedToDos}
            emptyMessage="아직 완료된 일이 없습니다"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
