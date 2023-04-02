import { Box, Heading } from "@chakra-ui/react";

export default function HeaderBar() {
  return (
    <Box as="header" py={6}>
      <Heading as="h1" fontSize={{ base: "3xl", lg: "4xl" }} textAlign="center">
        To-Do Player
      </Heading>
    </Box>
  );
}
