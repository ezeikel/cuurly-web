import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import {
  SINGLE_USER_QUERY,
  FOLLOW_MUTATION,
  UNFOLLOW_MUTATION,
  USER_FOLLOWING_QUERY,
  USER_FOLLOWERS_QUERY,
} from "../apollo/queries";
import Button from "./styles/Button";
import Spinner from "./Spinner";

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

const FollowButton = ({ currentUser, userId, usersFollowers }) => {
  if (!currentUser || !usersFollowers) return null;

  const [follow, { data, loading, error }] = useMutation(FOLLOW_MUTATION, {
    mutation:
      usersFollowers && usersFollowers.includes(currentUser.id)
        ? UNFOLLOW_MUTATION
        : FOLLOW_MUTATION,
    variables: { id: userId },
    refetchQueries: [
      { query: SINGLE_USER_QUERY, variables: { id: userId } },
      {
        query: SINGLE_USER_QUERY,
        variables: { id: currentUser.id },
      },
      {
        query: USER_FOLLOWERS_QUERY,
        variables: { id: currentUser.id },
      },
      {
        query: USER_FOLLOWING_QUERY,
        variables: { id: currentUser.id },
      },
    ],
  });

  return (
    <StyledButton
      mode={usersFollowers.includes(currentUser.id) ? "unfollow" : "follow"}
      onClick={follow}
    >
      {loading ? (
        <Spinner />
      ) : usersFollowers.includes(currentUser.id) ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </StyledButton>
  );
};

export default FollowButton;
