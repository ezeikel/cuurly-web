import { useContext } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import {
  FOLLOW_MUTATION,
  SINGLE_USER_QUERY,
  UNFOLLOW_MUTATION,
} from "../apollo/queries";
import Button from "./styles/Button";
import Spinner from "./Spinner";
import { AuthContext } from "../context/auth";

const StyledButton = styled(Button)`
  height: 100%;
  ${({ mode }) =>
    mode === "follow"
      ? `
      background-color: #3897f0;
      border-color: #3897f0;
      color: #fff;
    `
      : null}
`;

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
