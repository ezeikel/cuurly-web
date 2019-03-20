import { Component } from 'react';
import Link from "next/link";
import { Query } from 'react-apollo';
import { SINGLE_USER_QUERY } from '../apollo/queries';
import FollowButton from './FollowButton';

class Profile extends Component {
  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{ id: this.props.id}}>
        {({ data: { user: { id, profilePicture, name, bio, posts, followers, following }}, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          return (
            <div>
              <img src={profilePicture} />
              <h1>{name}</h1>
              <p>{bio}</p>
              <FollowButton userId={id} usersFollowers={followers.map(follower => follower.id)} />
              <p>{posts.length} posts</p>
              <p>{followers.length} followers</p>
              <p>{following.length} following</p>
              <section>
                <h3>Posts</h3>
                <ul>
                  {posts.map(post => (
                    <div key={post.id}>
                      <Link href={`/post?id=${post.id}`}>
                        <a>
                          <img src={post.image} />
                          <span>{post.caption}</span>
                        </a>
                      </Link>
                    </div>
                  ))}
                </ul>
              </section>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Profile;
