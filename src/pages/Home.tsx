import { Link } from "react-router-dom";
import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import Keywords from "../components/Keywords";

export default function Home() {
  return (
    <Center p={6} minH="100vh">
      <SimpleGrid
        columns={{ lg: 2 }}
        gap={{ base: 8, lg: 14 }}
        placeItems="center"
      >
        <Keywords keywords={keywords} />
        <VStack spacing={8}>
          <VStack spacing={{ base: 3, lg: 6 }}>
            <Heading
              as="h1"
              textAlign="center"
              fontSize={{ base: "2xl", lg: "4xl" }}
              fontWeight="bold"
            >
              To-Do Player
            </Heading>
            <Text textAlign="center" fontSize={{ lg: "2xl" }}>
              할 일을 계획하고, <br />
              계획한 시간만큼 집중할 수 있도록 도와줍니다
            </Text>
          </VStack>
          <Button
            as={Link}
            to="/main"
            size={{ base: "md", lg: "lg" }}
            colorScheme="main"
            variant="ghost"
          >
            시작하기
          </Button>
        </VStack>
      </SimpleGrid>
    </Center>
  );
}

const keywords = [
  {
    keyword: "Focus.",
    backgroundGradient: "linear(to-r, #6300ff, #ff0086)",
  },
  {
    keyword: "Plan.",
    backgroundGradient: "linear(to-r, #00beff, #0027ff)",
  },
  {
    keyword: "Start.",
    backgroundGradient: "linear(to-r, #ff8f00, #feff00)",
  },
];
