import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayButton = () => {
  return (
    <FontAwesomeIcon
      icon={["fas", "play"]}
      className="w-full h-full text-white opacity-60"
      size="3x"
    />
  );
};

export default PlayButton;
