import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

export default function DefaultMessage({ children }) {
  return (
    <Text fontSize="lg" color="gray.700" px={2} py={4} textAlign="center">
      {children}
    </Text>
  );
}

DefaultMessage.propTypes = {
  children: PropTypes.node,
};
