import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "crownd",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const processUpload = async ({
  file,
  folder,
  tags,
}: {
  file: {
    createReadStream: () => void;
    fileType?: string;
  };
  folder: string;
  tags: string[];
}) => {
  const { createReadStream, fileType } = file;
  const readableStream = createReadStream();

  let resultUrl = "";
  let resultSecureUrl = "";
  let publicId = "";

  // TODO: fix any
  const cloudinaryUpload = async ({ stream }: { stream: any }) => {
    // TODO: proper conditioning needed here
    const uploadConfig =
      fileType === "IMAGE"
        ? {
            resource_type: "auto" as const,
            folder,
            tags,
            overwrite: true,
            transformation: {
              width: 1080,
              crop: "limit",
              format: "jpg",
            },
          }
        : {
            resource_type: "video" as const,
            folder,
            tags,
            overwrite: true,
          };

    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream(
          uploadConfig,
          (error, result) => {
            if (result) {
              resultUrl = result.url;
              resultSecureUrl = result.secure_url;
              publicId = result.public_id;
              resolve({ resultSecureUrl, publicId });
            } else {
              console.error({ error });
              reject(error);
            }
          },
        );

        stream.pipe(streamLoad);
      });
    } catch (err) {
      console.error({ err });
      throw new Error(`Failed to upload file! Err:${(err as Error).message}`);
    }
  };

  await cloudinaryUpload({ stream: readableStream });
  return { resultUrl, resultSecureUrl, publicId };
};

export default processUpload;
