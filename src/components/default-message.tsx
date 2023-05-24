import { Text } from "@chakra-ui/react";

type Props = {
  message: string;
};

export default function DefaultMessage({ message }: Props) {
  return (
    <Text fontSize="lg" color="gray.500" px={2} py={4} textAlign="center">
      {message}
    </Text>
  );
}
