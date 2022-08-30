import { Flex, Text } from "@chakra-ui/react";

export default function TaskDetail() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      height={80}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Text fontSize="lg" color="gray.700" px={2} py={4} textAlign="center">
        할 일 목록에서 할 일을 선택하세요.
      </Text>
    </Flex>
  );
}
