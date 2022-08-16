import { useEffect, useRef, ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledModal } from "./BaseModal.styled";

Modal.setAppElement("body");

type BaseModalProps = {
  heading?: string;
  autoWidth?: boolean;
  autoHeight?: boolean;
  maxWidth?: number;
  isOpen: boolean;
  padding?: number;
  center?: boolean;
  onRequestClose?: () => void;
  contentLabel: string;
  close: () => void;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  width?: string;
};

const BaseModal = ({
  heading,
  autoWidth,
  autoHeight,
  maxWidth,
  isOpen = false,
  padding,
  center,
  onRequestClose,
  contentLabel,
  close,
  children,
  className,
  noPadding,
  width,
}: BaseModalProps): ReactElement => {
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
      autoHeight={autoHeight}
      maxWidth={maxWidth}
      padding={padding}
      center={center}
      className={className}
      noPadding={noPadding}
      width={width}
    >
      {heading ? (
        <header className="flex items-center justify-between">
          <h3 className="text-lg">{heading}</h3>
          <FontAwesomeIcon
            icon={["fal", "times"]}
            color="#000000"
            size="lg"
            onClick={close}
          />
        </header>
      ) : null}
      <div className="flex-1" ref={modalEl}>
        {children}
      </div>
    </StyledModal>
  );
};

export default BaseModal;
