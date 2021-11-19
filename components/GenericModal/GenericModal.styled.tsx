/* eslint-disable import/prefer-default-export */

import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Modal from "react-modal";

type StyledModalProps = {
  center: boolean;
  padding: number;
  autoWidth: boolean;
  maxWidth: number;
};

type ReactModalAdapterProps = {
  className: string;
  modalClassName: string;
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose: () => void;
  contentLabel: string;
  children: ReactNode;
};

const ReactModalAdapter = ({
  className,
  modalClassName,
  isOpen,
  onAfterOpen,
  onRequestClose,
  contentLabel,
  ...props
}: ReactModalAdapterProps): ReactElement => (
  <Modal
    className={modalClassName}
    portalClassName={className}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={contentLabel}
    onAfterOpen={onAfterOpen}
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  />
);

export const StyledModal = styled(ReactModalAdapter).attrs({
  // https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})<StyledModalProps>`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    z-index: 6;
    ${({ center }) =>
      center
        ? ""
        : `
    @media (min-width: 768px) {
      justify-content: start;
    }
    `}
  }
  .modal {
    display: flex;
    padding: ${({ padding }) => (padding ? `${padding}px` : "20px")};
    background-color: var(--color-white);
    border-radius: var(--border-radius-small);
    outline: 0;
    width: ${({ autoWidth }) => (autoWidth ? "auto" : "100%")};
    max-height: 100%;
    @media (min-width: 768px) {
      max-width: ${({ maxWidth }) => maxWidth || "640"}px;
      min-height: 200px;
      max-height: 921px;
    }
  }
`;

export const Body = styled.div`
  flex: 1;
`;
