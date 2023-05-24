import { ButtonGroup, Flex, Grid, GridItem } from "@chakra-ui/react";

import SelectedToDoDetail from "./selected-to-do-detail";
import ToDoListTabs from "./to-do-list-tabs";
import AddToDoFormModalOpenButton from "./add-to-do-form-modal-open-button";
import { ToDosProvider } from "../../contexts/to-dos";

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
