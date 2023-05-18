import { Box } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";

const ACTIVE_DURATION_IN_SECOND = 4;
const TRANSITION_OF_ACTIVE_IN_PERCENT = 20;

type Props = {
  keyword: string;
  backgroundGradient: string;
  seq: number;
  numberOfKeywords: number;
};

export default function Keyword({
  keyword,
  backgroundGradient,
  seq,
  numberOfKeywords,
}: Props) {
  const activeEndPercent = 100 / numberOfKeywords;
  const totalDurationInSecond = numberOfKeywords * ACTIVE_DURATION_IN_SECOND;
  const firstDelayInSecond = seq * ACTIVE_DURATION_IN_SECOND;

  const defaultColor = "black";

  return (
    <Box
      bgGradient={backgroundGradient}
      bgClip="text"
      fontSize={{ base: "7xl", lg: "8xl" }}
      fontWeight="extrabold"
    >
      <p
        css={css`
          color: ${defaultColor};
          animation-name: ${keyframes`
            0%, ${activeEndPercent}%, 100% {
              color: ${defaultColor};
            }
            ${(activeEndPercent * TRANSITION_OF_ACTIVE_IN_PERCENT) / 100}%, ${
            (activeEndPercent * (100 - TRANSITION_OF_ACTIVE_IN_PERCENT)) / 100
          }% {
              color: transparent;
            } 
          `};
          animation-duration: ${totalDurationInSecond}s;
          animation-delay: ${firstDelayInSecond}s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in;
        `}
      >
        {keyword}
      </p>
    </Box>
  );
}
