import { useState, useEffect, ReactElement } from "react";
import { useDropzone } from "react-dropzone";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import NextImageWrapper from "../NextImageWrapper/NextImageWrapper";
import NotificationMessage from "../NotificationMessage/NotificationMessage";
import { Wrapper, StyledInput, TextWrapper } from "./Dropzone.styled";

const imageMaxSize = 10000000; // 10mb in bytes
const acceptedFileTypes = {
  "image/x-png": [],
  "image/png": [],
  "image/jpg": [],
  "image/jpeg": [],
  "image/gif": [],
  "image/heic": [],
  "video/*": [],
};

const onDropRejected = (fileRejections) => {
  const [rejection] = fileRejections;
  const [error] = rejection.errors;

  if (error.code === "file-too-large") {
    toast.error(
      <NotificationMessage
        type="failure"
        message="Sorry, that image is too large. It must be under 10mb."
      />,
    );
  } else {
    toast.error(<NotificationMessage type="failure" message={error.message} />);
  }
};

const Empty = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <NextImageWrapper
        src={`/images/${isMobile ? "image" : "photo-stack"}.png`}
        width={isMobile ? 22 : 55}
        height={isMobile ? 18 : 52}
        alt="photo stack"
      />
      <TextWrapper isMobile={isMobile}>
        <div>
          {isMobile
            ? "Add an image"
            : "Click or drag a file here to add an image"}
        </div>
        {!isMobile && <div>JPEG, GIF or PNG (under 10MB)</div>}
      </TextWrapper>
    </>
  );
};

const Dropzone = ({ onDrop }): ReactElement => {
  const [mounted, setMounted] = useState(false);
  // BUG: when dragging a file that has not downloaded from icloud it appends .icloud to the filename and has no type
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: acceptedFileTypes,
    multiple: false,
    maxSize: imageMaxSize,
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Wrapper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      isMobile={isMobile}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <StyledInput {...getInputProps()} />
      <Empty />
      {/* {isDragActive ? (
      <DropzoneText>
        <h3>Drop it!</h3>
        <span>
          Add your files by dropping them in this window
        </span>
      </DropzoneText>
    ) : (
      <span>Click here or drag some files over.</span>
    )} */}
    </Wrapper>
  );
};

export default Dropzone;
