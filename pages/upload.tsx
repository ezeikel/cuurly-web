import { FunctionComponent } from "react";
import dynamic from "next/dynamic";

const Upload = dynamic(() => import("../components/Upload/Upload"), {
  ssr: false,
});

const uploadPage: FunctionComponent = () => (
  // TODO: Eventually make this a modal
  <Upload />
);

export default uploadPage;
