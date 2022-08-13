import { useMutation } from "@apollo/client";
import {
  FOLLOW_MUTATION,
  SINGLE_USER_QUERY,
  UNFOLLOW_MUTATION,
} from "../../apollo/queries";
import useUser from "../../hooks/useUser";
import Button from "../Button/Button";

// username - needed to refetch single user query
// userId - the user we are looking at in lists userId - need it to for the nutation
// userFollowers - the user we are looking at in list followers list - so we can know if we can follow or unfollow

const FollowButton = ({ username, userId, userFollowers }) => {
  const { user: currentUser } = useUser();

  if (!currentUser || !userFollowers || currentUser.id === userId) return null;

  const MUTATION = userFollowers?.includes(currentUser.id)
    ? UNFOLLOW_MUTATION
    : FOLLOW_MUTATION;

  const [follow, { loading }] = useMutation(MUTATION, {
    // the user to be followed/unfollowed
    variables: { id: userId },
    // the data for the user who was followed/unfollowed comes from the single user query i.e the user we were originally looking at
    refetchQueries: [{ query: SINGLE_USER_QUERY, variables: { username } }],
  });

  return (
    <Button
      variant={userFollowers.includes(currentUser.id) ? "outline" : "primary"}
      text={userFollowers.includes(currentUser.id) ? "Unfollow" : "Follow"}
      onClick={() => follow()} // TODO: need to fix type Button onClick
      isLoading={loading}
    />
  );
};

export default FollowButton;
