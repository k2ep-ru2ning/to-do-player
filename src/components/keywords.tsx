import { Flex } from "@chakra-ui/react";

import Keyword from "./keyword";

type Props = {
  keywords?: {
    keyword: string;
    backgroundGradient: string;
  }[];
};

export default function Keywords({ keywords }: Props) {
  return (
    <Flex direction="column" alignItems="center">
      {keywords?.map(({ keyword, backgroundGradient }, index) => (
        <Keyword
          key={index}
          keyword={keyword}
          backgroundGradient={backgroundGradient}
          seq={index}
          numberOfKeywords={keywords.length}
        />
      ))}
    </Flex>
  );
}
