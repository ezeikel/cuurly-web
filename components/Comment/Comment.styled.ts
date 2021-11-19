import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type WrapperProps = {
  canDelete: boolean;
};

export const Wrapper = styled.li<WrapperProps>`
  display: grid;
  grid-template-columns: ${({ canDelete }) =>
    canDelete ? "auto 1fr auto" : "auto 1fr"};
  align-items: center;
  grid-column-gap: var(--spacing-small);
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

export const StyledAnchor = styled.a`
  font-weight: bold;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
