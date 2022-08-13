import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, ReactElement } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import NotificationMessage from "../NotificationMessage/NotificationMessage";

const imageMaxSize = 10000000; // 10mb in bytes
const acceptedFileTypes = {
  "image/x-png": [],
  "image/png": [],
  "image/jpg": [],
  "image/jpeg": [],
  "image/gif": [],
  "image/heic": [],
  "image/webp": [],
  // "image/avif": [], // TODO: add support for avif
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
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <FontAwesomeIcon icon={["fal", "photo-film"]} color="#333" size="3x" />
      <p className="text-xl">Drag photos and videos here</p>
    </div>
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="flex rounded p-8 items-center justify-center"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} />
      <Empty />
    </div>
  );
};

export default Dropzone;
