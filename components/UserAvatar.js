import { useEffect, useState } from "react";
import styled from "styled-components";
import blankProfilePicture from "../utils/blankProfileImage";

const Wrapper = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  display: grid;
  width: 77px;
  height: 77px;
  img {
    border-radius: 50%;
  }
  @media (min-width: 736px) {
    width: 150px;
    height: 150px;
    grid-row: 1 / -1;
  }
`;

const UserAvatar = ({ photo }) => {
  const [src, setSrc] = useState(blankProfilePicture());

  useEffect(() => {
    if (photo) {
      setSrc(
        photo?.url.replace(
          "/upload",
          "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0"
        )
      );
    }
  }, [photo]);

  return (
    <Wrapper>
      <img src={src} />
    </Wrapper>
  );
};

export default UserAvatar;
