import dynamic from "next/dynamic";
const Upload = dynamic(() => import("../components/Upload"), {
  ssr: false,
});

const uploadPage = () => (
  // TODO: Eventually make this a modal
  <Upload />
);

export default uploadPage;
