import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";

const SHINING_DURATION_IN_SECOND = 4;
const SHINING_TRANSITION_PERCENT = 20;

export default function ShiningKeyword({
  text,
  backgroundGradient,
  seq,
  numberOfKeywords,
}) {
  const shiningEndPercent = 100 / numberOfKeywords;
  const totalDurationInSecond = numberOfKeywords * SHINING_DURATION_IN_SECOND;
  const firstDelayInSecond = seq * SHINING_DURATION_IN_SECOND;

  const defaultColor = "black";

  return (
    <Box
      bgGradient={backgroundGradient}
      bgClip="text"
      fontSize={{ base: "7xl", lg: "8xl", xl: "9xl" }}
      fontWeight="extrabold"
    >
      <p
        css={css`
          color: ${defaultColor};
          animation-name: ${keyframes`
            0%, ${shiningEndPercent}%, 100% {
              color: ${defaultColor};
            }
            ${(shiningEndPercent * SHINING_TRANSITION_PERCENT) / 100}%, ${
            (shiningEndPercent * (100 - SHINING_TRANSITION_PERCENT)) / 100
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
        {text}
      </p>
    </Box>
  );
}

ShiningKeyword.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundGradient: PropTypes.string.isRequired,
  seq: PropTypes.number.isRequired,
  numberOfKeywords: PropTypes.number.isRequired,
};
