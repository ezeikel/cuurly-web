import { Wrapper, Name, Website } from "./UserBio.styled";

const UserBio = ({ name, bio, website }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <span>{bio}</span>
      <Website>
        <a href={website} target="_blank" rel="noreferrer">
          {website}
        </a>
      </Website>
    </Wrapper>
  );
};

export default UserBio;
