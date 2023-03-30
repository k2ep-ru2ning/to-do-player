import { Container, Flex } from "@chakra-ui/react";

import HeaderBar from "../components/HeaderBar";
import Tasks from "../components/Tasks";

export default function Main() {
  return (
    <Container pb={4} maxW="container.xl">
      <Flex direction="column" rowGap={4}>
        <HeaderBar />
        <Tasks />
      </Flex>
    </Container>
  );
}
