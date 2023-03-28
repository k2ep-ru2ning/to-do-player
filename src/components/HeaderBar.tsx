import { Box, Heading } from "@chakra-ui/react";

export default function HeaderBar() {
  return (
    <Box as="header" py={6}>
      <Heading as="h1" fontSize="4xl" textAlign="center">
        FPS
      </Heading>
    </Box>
  );
}
