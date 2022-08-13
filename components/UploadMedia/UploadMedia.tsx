import { useCallback, useState } from "react";
import Dropzone from "../Dropzone/Dropzone";
import MediaPreview from "../MediaPreview/MediaPreview";

const heic2any = require("heic2any");

const UploadMedia = ({ files, setFiles }) => {
  const [convertingImage, setConvertingImage] = useState(false);

  const onDrop = useCallback(async (droppedFiles) => {
    setFiles(
      await Promise.all(
        droppedFiles.map(async (file) => {
          let result;
          if (file.type === "image/heic") {
            setConvertingImage(true);
            result = await heic2any({
              blob: file,
              toType: "image/jpeg",
            });
            setConvertingImage(false);
          } else {
            result = file;
          }

          return Object.assign(file, {
            preview: URL.createObjectURL(result),
          });
        }),
      ),
    );
  }, []);

  if (files?.length > 0) {
    return (
      <MediaPreview
        className="w-full h-full"
        files={files}
        convertingImage={convertingImage}
      />
    );
  }

  return <Dropzone onDrop={onDrop} />;
};

export default UploadMedia;
