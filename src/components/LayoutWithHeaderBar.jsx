import { Box, Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";

export default function LayoutWithHeaderBar() {
  return (
    <Container maxW={{ base: "container.md", lg: "container.lg", xl: "container.xl" }}>
      <Flex h="100vh" direction="column" rowGap="4">
        <HeaderBar />
        <Box flexGrow="1">
          <Outlet />
        </Box>
      </Flex>
    </Container>
  );
}
