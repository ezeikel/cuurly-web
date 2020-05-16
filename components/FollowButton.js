import styled from "styled-components";
import { useMutation } from "@apollo/client";
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

const FollowButton = ({ singleUser, currentUser, userId, userList }) => {
  if (!currentUser || !userList || currentUser.id === userId) return null;

  const MUTATION =
    userList && userList.includes(currentUser.id)
      ? UNFOLLOW_MUTATION
      : FOLLOW_MUTATION;

  const [follow, { data, loading, error }] = useMutation(MUTATION, {
    variables: { id: userId }, // the user to be followed/unfollowed
    refetchQueries: [
      { query: SINGLE_USER_QUERY, variables: { username: singleUser } },
      {
        query: USER_FOLLOWERS_QUERY,
        variables: { username: singleUser },
      },
      {
        query: USER_FOLLOWING_QUERY,
        variables: { username: singleUser },
      },
    ],
  });

  return (
    <StyledButton
      mode={userList.includes(currentUser.id) ? "unfollow" : "follow"}
      onClick={follow}
    >
      {loading ? (
        <Spinner />
      ) : userList.includes(currentUser.id) ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </StyledButton>
  );
};

export default FollowButton;
