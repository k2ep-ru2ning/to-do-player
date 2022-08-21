import { Flex, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function HeaderBar() {
  return (
    <header>
      <Flex height="16" justifyContent="space-between" alignItems="center">
        <Link
          as={ReactRouterLink}
          to="/"
          color="main.500"
          fontSize="3xl"
          fontWeight="bold"
          _hover={{
            textDecoration: "none",
          }}
        >
          FPS
        </Link>
        <nav>
          <Flex columnGap="4">
            {navMenuList.map((menu) => (
              <Link
                key={menu.link}
                as={ReactRouterLink}
                to={menu.link}
                fontWeight="bold"
                _hover={{ textDecoration: "none", color: "main.500" }}
              >
                {menu.name}
              </Link>
            ))}
          </Flex>
        </nav>
      </Flex>
    </header>
  );
}

const navMenuList = [
  { name: "메인", link: "/main" },
  { name: "이전 기록", link: "/history" },
];
