import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledIcon = styled(FontAwesomeIcon)`
  width: 100% !important;
  height: 100% !important;
  opacity: 0.6;
`;

const PlayButton = () => {
  return (
    <StyledIcon icon={["fas", "play"]} color="var(--color-white)" size="3x" />
  );
};

export default PlayButton;
