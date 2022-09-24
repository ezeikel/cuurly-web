import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <FontAwesomeIcon icon={faSpinnerThird} spin size="3x" />;
  </div>
);

export default Spinner;
