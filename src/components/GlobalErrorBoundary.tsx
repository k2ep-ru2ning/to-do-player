import { type ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button, Center, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function FallbackPage({ resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const handleClickRecoverButton = () => {
    resetErrorBoundary();
    navigate("/main");
  };

  return (
    <Container maxW="container.xl">
      <Center minHeight="100vh">
        <Flex
          role="alert"
          flexDirection="column"
          rowGap={4}
          p={4}
          m={4}
          borderWidth="thin"
          rounded="md"
        >
          <Text>
            알 수 없는 <Text as="strong">에러</Text>가 발생했습니다. <br />
            에러가 계속 발생하면, To-Do Player 팀으로 문의해 주세요.
          </Text>
          <Button
            type="button"
            onClick={handleClickRecoverButton}
            alignSelf="center"
          >
            메인 페이지로 이동
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}

export default function GlobalErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary FallbackComponent={FallbackPage}>{children}</ErrorBoundary>
  );
}
