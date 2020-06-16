import React, { useState, useEffect, useCallback } from "react";
import videojs from "video.js";

const VideoPlayer = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl === null) return;

    // instantiate Video.js
    const player = videojs(videoEl, props);

    return () => {
      // destroy player on unmount
      player.dispose();
    };
  }, [props, videoEl]);
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  return (
    <>
      <div data-vjs-player>
        <video ref={onVideo} className="video-js" playsInline />
      </div>
    </>
  );
};

export default VideoPlayer;
