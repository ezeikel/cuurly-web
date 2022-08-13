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

const BaseModal = ({
  heading,
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

  // export const Header = styled.section`
  //   display: grid;
  //   grid-template-columns: 1fr 42px;
  //   align-items: center;
  //   border-bottom: 1px solid #efefef;
  //   h1 {
  //     justify-self: center;
  //     font-size: 1.6rem;
  //     line-height: 2.4rem;
  //     margin: 0;
  //   }
  //   svg {
  //     align-self: center;
  //     justify-self: center;
  //     cursor: pointer;
  //   }
  // `;

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
