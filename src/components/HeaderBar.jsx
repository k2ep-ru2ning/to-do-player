import { Center, Text } from "@chakra-ui/react";

export default function HeaderBar() {
  return (
    <Center as="header" h="20">
      <Text as="span" fontSize="4xl" fontWeight="bold">
        FPS
      </Text>
    </Center>
  );
}
