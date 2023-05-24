import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Center bgColor="gray.50" minH="100vh">
      <VStack spacing={8} px={4}>
        <VStack>
          <Text fontSize="6xl" fontWeight="bold" color="main.500">
            404
          </Text>
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            해당 페이지를 찾지 못했습니다.
          </Text>
        </VStack>
        <Button as={Link} to="/" colorScheme="main" variant="link" size="lg">
          홈페이지로 이동
        </Button>
      </VStack>
    </Center>
  );
}
