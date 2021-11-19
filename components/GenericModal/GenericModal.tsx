import { useEffect, useRef, ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Modal from "react-modal";
import { StyledModal, Body } from "./GenericModal.styled";

Modal.setAppElement("body");

type GenericModalProps = {
  autoWidth?: boolean;
  maxWidth?: number;
  isOpen: boolean;
  padding?: number;
  center?: boolean;
  onRequestClose?: () => void;
  contentLabel: string;
  close: () => void;
  children: ReactNode;
  className?: string;
};

const GenericModal = ({
  autoWidth,
  maxWidth,
  isOpen = false,
  padding,
  center,
  onRequestClose,
  contentLabel,
  close,
  children,
  className,
}: GenericModalProps): ReactElement => {
  const modalEl = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      close();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!modalEl.current) return undefined;

    if (isOpen) {
      disableBodyScroll(modalEl.current.querySelector("#scrollableDiv"));
    } else {
      enableBodyScroll(modalEl.current.querySelector("#scrollableDiv"));
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen, modalEl.current]);

  return (
    <StyledModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={onRequestClose}
      autoWidth={autoWidth}
      maxWidth={maxWidth}
      padding={padding}
      center={center}
      className={className}
    >
      <Body ref={modalEl}>{children}</Body>
    </StyledModal>
  );
};

export default GenericModal;
