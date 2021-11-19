/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from "react";
import blankProfilePicture from "../../utils/blankProfileImage";
import { Wrapper } from "./UserAvatar.styled";

const UserAvatar = ({ photo }) => {
  const [src, setSrc] = useState(blankProfilePicture());

  useEffect(() => {
    if (photo) {
      setSrc(
        photo?.url.replace(
          "/upload",
          "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0",
        ),
      );
    }
  }, [photo]);

  return (
    <Wrapper>
      <img src={src} alt="user avatar" />
    </Wrapper>
  );
};

export default UserAvatar;
