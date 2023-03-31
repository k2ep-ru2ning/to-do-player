import { Container, Flex } from "@chakra-ui/react";

import HeaderBar from "../components/HeaderBar";
import ToDos from "../components/ToDos";

export default function Main() {
  return (
    <Container pb={4} maxW="container.xl">
      <Flex direction="column" rowGap={4}>
        <HeaderBar />
        <ToDos />
      </Flex>
    </Container>
  );
}
