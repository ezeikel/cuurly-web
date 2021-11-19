import { useState, useEffect, useCallback } from "react";
import videojs from "video.js";
import ReactDOM from "react-dom";
import PlayButton from "../PlayButton/PlayButton";
import { Wrapper } from "./VideoPlayer.styled";

// TODO: should probably move this to another file and just export vjsPlayButon

const vjsButton = videojs.getComponent("Button");

class vjsPlayButon extends vjsButton {
  constructor(player, options) {
    super(player, options);

    this.mount = this.mount.bind(this);
    this.handleClick = this.handleClick.bind(this);

    player.ready(() => {
      this.mount();
    });

    this.player_.on("ended", () => {
      this.removeClass("hide");
    });

    this.player_.on("pause", () => {
      this.removeClass("hide");
    });

    this.player_.on("play", () => {
      this.addClass("hide");
    });

    this.on("dispose", () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  handleClick() {
    // clicking on the video itself pauses/plays so not needed here
    return;
  }

  mount() {
    ReactDOM.render(<PlayButton vjsButton={this} />, this.el());
  }
}

vjsButton.registerComponent("vjsPlayButton", vjsPlayButon);

const VideoPlayer = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl === null) return;

    // instantiate Video.js
    const player = videojs(videoEl, props);

    // player.getChild("controlBar").addChild("vjsPlayButton", {});
    player.addChild("vjsPlayButton", {});

    return () => {
      // destroy player on unmount
      player.dispose();
    };
  }, [videoEl]); // BUGFIX: had to remove 'props' from dependency array to fix issue of video element no longer being in the DOM. Probably bug in - https://github.com/vercel/next.js/tree/canary/examples/with-videojs
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856

  // not using controls. Clicking on video itself will play/pause
  const handleClick = () => {
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  return (
    <Wrapper>
      <div data-vjs-player>
        <video
          ref={onVideo}
          className="video-js"
          playsInline
          onClick={handleClick}
        />
      </div>
    </Wrapper>
  );
};

export default VideoPlayer;
