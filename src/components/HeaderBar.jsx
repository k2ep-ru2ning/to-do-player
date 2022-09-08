import { Center, Text } from "@chakra-ui/react";

export default function HeaderBar() {
  return (
    <Center as="header" h="24">
      <Text as="span" color="main.500" fontSize="4xl" fontWeight="bold">
        FPS
      </Text>
    </Center>
  );
}
