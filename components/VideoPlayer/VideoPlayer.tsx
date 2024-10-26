"use client";

import classNames from "classnames";
import { useEffect, useRef } from "react";
import videojs from "video.js";

type VidepPlayerProps = {
  options: videojs.PlayerOptions;
  onReady?: (player: videojs.Player) => void;
  className?: string;
};

const VideoPlayer = ({ options, onReady, className }: VidepPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready"); // eslint-disable-line no-console
        onReady?.(playerRef.current as videojs.Player); // eslint-disable-line @typescript-eslint/no-unused-expressions
      });
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
    <div
      className={classNames("w-full h-full", {
        [className as string]: !!className,
      })}
    >
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered cursor-pointer focus:outline-none"
          playsInline
        >
          <track kind="captions" />
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
