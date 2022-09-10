import { Button, Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Center p={6} minH="100vh">
      <SimpleGrid columns={{ md: 2 }} gap={{ base: 8, lg: 16 }} placeItems="center">
        <VStack spacing={0}>
          <Text
            bgGradient="linear(to-r, #6300ff, #ff0086)"
            bgClip="text"
            fontSize={{ base: "7xl", lg: "8xl", xl: "9xl" }}
            fontWeight="extrabold"
          >
            Focus.
          </Text>
          <Text
            bgGradient="linear(to-r, #00beff, #0027ff)"
            bgClip="text"
            fontSize={{ base: "7xl", lg: "8xl", xl: "9xl" }}
            fontWeight="extrabold"
          >
            Plan.
          </Text>
          <Text
            bgGradient="linear(to-r, #ff8f00, #feff00)"
            bgClip="text"
            fontSize={{ base: "7xl", lg: "8xl", xl: "9xl" }}
            fontWeight="extrabold"
          >
            Start.
          </Text>
        </VStack>
        <VStack spacing={8}>
          <VStack spacing={{ base: 2, md: 4 }}>
            <Text textAlign="center" fontSize={{ base: "2xl", lg: "3xl" }} fontWeight="bold">
              TodoList + Timer
            </Text>
            <Text textAlign="center" fontSize={{ lg: "2xl" }}>
              할 일을 계획하고, 실행할 수 있도록 도와줍니다
            </Text>
          </VStack>
          <Button as={Link} to="/main" size={{ base: "md", lg: "lg" }}>
            시작하기
          </Button>
        </VStack>
      </SimpleGrid>
    </Center>
  );
}
