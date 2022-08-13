import classNames from "classnames";

const MediaPreview = ({ files, convertingImage, className }) => {
  if (convertingImage) {
    // TODO: show spinner instead
    return <div>Converting image...</div>;
  }

  return (
    <div
      className={classNames({
        [className]: !!className,
      })}
    >
      {files?.length > 0 &&
        files.map((file) => {
          if (/^video/.test(file.type)) {
            return (
              <video width="200" key={file.preview} controls>
                <source src={file.preview} />
                <track kind="captions" />
                Your browser does not support HTML5 video.
              </video>
            );
          }

          return (
            <img
              className="object-cover w-full h-full"
              key={file.preview}
              src={file.preview}
              alt="upload preview"
            />
          );
        })}
    </div>
  );
};

export default MediaPreview;
