import { MediaType } from "@prisma/client";
import processUpload from "./processUpload";

const processFile = async ({
  file,
  tags,
  userId,
}: {
  file: any;
  tags: string[];
  userId: string;
}) => {
  let fileType: MediaType;
  const { createReadStream, mimetype } = await file;

  switch (mimetype) {
    case "image/png":
    case "image/jpg":
    case "image/jpeg":
    case "image/heic":
      fileType = "IMAGE";
      break;
    case "video/mp4":
    case "video/quicktime":
      fileType = "VIDEO";
      break;
    default:
      fileType = "IMAGE";
      break;
  }

  const folder = `users/${userId}/uploads/${fileType.toLowerCase()}s`;

  const { resultSecureUrl, publicId } = await processUpload({
    file: { createReadStream, fileType },
    tags,
    folder,
  });

  return {
    url: resultSecureUrl,
    publicId,
    fileType,
  };
};

export default processFile;
