import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SINGLE_USER_QUERY } from '../apollo/queries';
import FollowButton from './FollowButton';
import PostPreview from './PostPreview';
import CurrentUser from './CurrentUser';
import Button from './styles/Button';

const Wrapper = styled.div`
  display: grid;
  padding-top: 60px;
  grid-row-gap: var(--spacing-huge);
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-huge);
`;

const Username = styled.span`
  font-size: 28px;
  line-height: 32px;
  ${({ verified }) => verified ?
  `
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--spacing-small);
    place-items: center;
  ` : null }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const UserPhoto = styled.div`
  display: grid;
  width: 150px;
  height: 150px;
  img {
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, auto) 1fr;
  grid-row-gap: var(--spacing-large);
`;

const FirstRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const SecondRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const Stat = styled.div`
  font-size: 1.6rem;
  line-height: 1.8rem;
`;

const Number = styled.span`
  font-weight: bold;
`;

const ThirdRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / span 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const Name = styled.span`
  font-weight: bold;
`;

const PostsWrapper = styled.div`
  display: grid;
`;

const Posts = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: var(--spacing-large);
`;

class Profile extends Component {
  render() {
    return (
      <CurrentUser>
        {({ data: { currentUser } }) => (
          <Query query={SINGLE_USER_QUERY} variables={{ id: this.props.id}}>
            {({ data: { user: { id, profilePicture, username, name, bio, website, posts, followers, following, verified }}, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;

              return (
                <Wrapper>
                  <Header>
                    <UserPhoto>
                      <img src={profilePicture} />
                    </UserPhoto>
                    <UserInfo>
                      <FirstRow>
                        <Username verified={verified}>
                          {username}
                          { verified ? <FontAwesomeIcon icon={["fas", "badge-check"]} color="#3E9AED" size="xs" /> : null }
                        </Username>
                        {currentUser && currentUser.id === id ?
                          <Button>Edit profile</Button> :
                          <FollowButton userId={id} usersFollowers={followers.map(follower => follower.id)} />
                        }
                        <StyledFontAwesomeIcon icon={["fal", "cog"]} color="var(--color-black)" size="2x" />
                      </FirstRow>
                      <SecondRow>
                        <Stat><Number>{posts.length}</Number> posts</Stat>
                        <Stat><Number>{followers.length}</Number> followers</Stat>
                        <Stat><Number>{following.length}</Number> following</Stat>
                      </SecondRow>
                      <ThirdRow>
                        <Name>{name}</Name>
                        <span>{bio}</span>
                        <span>{website}</span>
                      </ThirdRow>
                    </UserInfo>
                  </Header>
                  <PostsWrapper>
                    <Posts>
                      {posts.map(post => (
                        <PostPreview key={post.id} id={post.id} />
                      ))}
                    </Posts>
                  </PostsWrapper>
                </Wrapper>
              );
            }}
          </Query>
        )}
      </CurrentUser>
    );
  }
}

export default Profile;
