import { VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Keyword from "./Keyword";

export default function SequentiallyShiningKeywords({ keywords = [] }) {
  return (
    <VStack spacing={0}>
      {keywords.map((keyword, index) => (
        <Keyword
          key={index}
          keyword={keyword.text}
          backgroundGradient={keyword.backgroundGradient}
          seq={index}
          numberOfKeywords={keywords.length}
        />
      ))}
    </VStack>
  );
}

SequentiallyShiningKeywords.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      backgroundGradient: PropTypes.string.isRequired,
    })
  ),
};
