import { FunctionComponent } from "react";
import Error from "next/error";

const NotFound: FunctionComponent = () => {
  return <Error statusCode={404} />;
};

export default NotFound;
