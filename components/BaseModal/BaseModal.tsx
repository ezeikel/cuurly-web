import { useEffect, useRef, ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const modalClasses = `
    fixed inset-0 flex flex-col justify-center items-center p-8 z-10
    ${center ? "items-center" : ""}
  `;

  const contentClasses = `
    flex flex-col bg-white rounded-md outline-none
    ${autoWidth ? "w-auto" : width ? width : "w-full"}
    ${autoHeight ? "h-auto" : "h-full"}
    ${maxWidth ? `max-w-[${maxWidth}px]` : "max-w-[640px]"}
    ${noPadding ? "p-0" : padding ? `p-${padding}` : "p-8"}
    ${className || ""}
  `;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={contentClasses}
      overlayClassName={modalClasses}
    >
      {heading ? (
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg">{heading}</h3>
          <FontAwesomeIcon
            icon={["fal", "times"]}
            color="#000000"
            size="lg"
            onClick={close}
            className="cursor-pointer"
          />
        </header>
      ) : null}
      <div className="flex-1 overflow-auto" ref={modalEl}>
        {children}
      </div>
    </Modal>
  );
};

export default BaseModal;
