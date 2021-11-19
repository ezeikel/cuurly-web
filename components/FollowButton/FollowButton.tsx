import { useContext } from "react";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_MUTATION,
  SINGLE_USER_QUERY,
  UNFOLLOW_MUTATION,
} from "../../apollo/queries";
import Spinner from "../svgs/Spinner";
import { AuthContext } from "../../contexts/auth";
import { StyledButton } from "./FollowButton.styled";

// username - needed to refetch single user query
// userId - the user we are looking at in lists userId - need it to for the nutation
// userFollowers - the user we are looking at in list followers list - so we can know if we can follow or unfollow

const FollowButton = ({ username, userId, userFollowers }) => {
  const { currentUser } = useContext(AuthContext);

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
    <StyledButton
      mode={userFollowers.includes(currentUser.id) ? "unfollow" : "follow"}
      onClick={follow}
    >
      {loading ? (
        <Spinner />
      ) : userFollowers.includes(currentUser.id) ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </StyledButton>
  );
};

export default FollowButton;
