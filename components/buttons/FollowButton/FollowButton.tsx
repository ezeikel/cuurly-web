"use client";

import useUser from "@/hooks/api/useUser";

// username - needed to refetch single user query
// userId - the user we are looking at in lists userId - need it to for the nutation
// userFollowers - the user we are looking at in list followers list - so we can know if we can follow or unfollow

type FollowButtonProps = {
  username: string;
  userId: string;
  userFollowers: string[];
};

const FollowButton = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  username,
  userId,
  userFollowers,
}: FollowButtonProps) => {
  const { data: currentUser } = useUser();

  if (!currentUser || !userFollowers || currentUser.id === userId) return null;

  // const MUTATION = userFollowers?.includes(currentUser.id)
  //   ? UNFOLLOW_MUTATION
  //   : FOLLOW_MUTATION;

  // TODO: reimplment follow/unfollow mutation
  // const [follow, { loading }] = useMutation(MUTATION, {
  //   // the user to be followed/unfollowed
  //   variables: { id: userId },
  //   // the data for the user who was followed/unfollowed comes from the single user query i.e the user we were originally looking at
  //   refetchQueries: [{ query: SINGLE_USER_QUERY, variables: { username } }],
  // });
  const follow = () => null;

  return (
    <button onClick={follow} type="button">
      {userFollowers.includes(currentUser.id) ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
