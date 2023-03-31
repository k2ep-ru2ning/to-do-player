import { ButtonGroup, Flex, Grid, GridItem } from "@chakra-ui/react";

import SelectedToDoDetail from "./SelectedToDoDetail";
import ToDoListTabs from "./ToDoListTabs";
import AddToDoFormModalOpenButton from "./AddToDoFormModalOpenButton";
import { ToDosProvider } from "../contexts/ToDosContext";

export default function ToDos() {
  return (
    <ToDosProvider>
      <Grid gap={4} templateColumns={{ md: "repeat(3, 1fr)" }}>
        <Flex direction="column" rowGap={4}>
          <ButtonGroup alignSelf="flex-end">
            <AddToDoFormModalOpenButton />
          </ButtonGroup>
          <SelectedToDoDetail />
        </Flex>
        <GridItem colSpan={{ md: 2 }}>
          <ToDoListTabs />
        </GridItem>
      </Grid>
    </ToDosProvider>
  );
}
