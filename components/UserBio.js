import styled from "styled-components";

const Wrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (min-width: 736px) {
    grid-column: 2 / -1;
    grid-row: 3 / span 1;
  }
`;

const Name = styled.span`
  font-weight: bold;
`;

const Website = styled.span`
  a {
    color: #003569;
  }
`;

const UserBio = ({ name, bio, website }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <span>{bio}</span>
      <Website>
        <a href={website} target="_blank">
          {website}
        </a>
      </Website>
    </Wrapper>
  );
};

export default UserBio;
