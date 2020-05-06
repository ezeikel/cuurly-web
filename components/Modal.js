import Modal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal className={modalClassName} portalClassName={className} {...props} />
);

const StyledStatsModal = styled(ReactModalAdapter).attrs({
  //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    grid-template-rows: 43px 1fr;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
  }
`;

const Header = styled.section`
  display: grid;
  grid-template-columns: 1fr 42px;
  align-items: center;
  border-bottom: 1px solid #efefef;
  h1 {
    justify-self: center;
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin: 0;
  }
  svg {
    align-self: center;
    justify-self: center;
    cursor: pointer;
  }
`;

const Body = styled.div`
  overflow-y: scroll;
`;

const GenericModal = ({
  heading,
  isOpen,
  onRequestClose,
  contentLabel,
  close,
  children,
}) => {
  return (
    <StyledStatsModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
    >
      <Header>
        <h1>{heading}</h1>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          color="var(--color-black)"
          size="lg"
          onClick={close}
        />
      </Header>
      <Body>{children}</Body>
    </StyledStatsModal>
  );
};

export default GenericModal;
