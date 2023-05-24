import { Container, Flex } from "@chakra-ui/react";

import HeaderBar from "../components/header-bar";
import ToDos from "../components/to-dos/to-dos";

export default function Player() {
  return (
    <Container pb={4} maxW="container.xl">
      <Flex direction="column" rowGap={4}>
        <HeaderBar />
        <ToDos />
      </Flex>
    </Container>
  );
}
