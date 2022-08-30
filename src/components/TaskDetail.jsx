import { Flex } from "@chakra-ui/react";
import DefaultMessage from "./DefaultMessage";

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
      <DefaultMessage>할 일 목록에서 할 일을 선택하세요.</DefaultMessage>
    </Flex>
  );
}
