/* eslint-disable import/prefer-default-export */

import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import Modal from "react-modal";

type StyledModalProps = {
  center?: boolean;
  padding?: number;
  autoWidth?: boolean;
  autoHeight?: boolean;
  maxWidth?: number;
  noPadding?: boolean;
  width?: string;
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
    padding: 32px;
    z-index: 1;
  }
  .modal {
    display: flex;
    padding: ${({ padding, noPadding }) =>
      // eslint-disable-next-line no-nested-ternary
      noPadding ? 0 : padding ? `${padding}px` : "32px"};
    background-color: #ffffff;
    border-radius: 4px;
    outline: 0;
    width: ${({ autoWidth, width }) =>
      // eslint-disable-next-line no-nested-ternary, no-unneeded-ternary
      width ? width : autoWidth ? "auto" : "100%"};
    /* height: ${({ autoHeight }) => (autoHeight ? "auto" : "100%")}; */
    max-height: 100%;
    @media (min-width: 768px) {
      max-width: ${({ maxWidth }) => maxWidth || "640"}px;
      min-height: ${({ autoHeight }) => (autoHeight ? 0 : "200px")};
      max-height: 921px;
    }
  }
`;
