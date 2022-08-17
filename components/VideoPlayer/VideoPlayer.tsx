import classNames from "classnames";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import { Wrapper } from "./VideoPlayer.styled";

const VideoPlayer = ({ options, onReady, className }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // eslint-disable-next-line no-multi-assign
      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready"); // eslint-disable-line no-console
        onReady && onReady(player); // eslint-disable-line @typescript-eslint/no-unused-expressions
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <Wrapper
      className={classNames({
        [className]: !!className,
      })}
    >
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
        >
          <track kind="captions" />
        </video>
      </div>
    </Wrapper>
  );
};

export default VideoPlayer;
