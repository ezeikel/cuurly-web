import CurrentUser from "./CurrentUser";

const FollowButton = ({ userId, usersFollowers }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser && currentUser.id !== userId ?
        <button>
          { usersFollowers.includes(currentUser.id) ? 'Unfollow' : 'Follow' }
        </button>
      : null
      /** TODO: Setup button to call Follow/Unfollow Mutation */
    )}
  </CurrentUser>
);

export default FollowButton;