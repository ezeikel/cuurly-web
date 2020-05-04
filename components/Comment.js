import Link from "next/link";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-apollo";
import { CURRENT_USER_QUERY } from "../apollo/queries";
import { SINGLE_POST_QUERY, DELETE_COMMENT_MUTATION } from "../apollo/queries";

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: ${(props) =>
    props.canDelete ? "auto 1fr auto" : "auto 1fr"};
  align-items: center;
  grid-column-gap: var(--spacing-small);
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const StyledAnchor = styled.a`
  font-weight: bold;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Comment = ({ comment, post }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  return (
    <Wrapper
      canDelete={
        (currentUser &&
          currentUser.id &&
          currentUser.id === comment.writtenBy.id) ||
        currentUser.id === post.author.id
      }
    >
      <Link href={`/user?id=${comment.writtenBy.id}`}>
        <StyledAnchor>{comment.writtenBy.username}</StyledAnchor>
      </Link>
      <span>{comment.text}</span>
      {(currentUser &&
        currentUser.id &&
        currentUser.id === comment.writtenBy.id) ||
      currentUser.id === post.author.id ? (
        <Mutation
          mutation={DELETE_COMMENT_MUTATION}
          variables={{ id: comment.id }}
          refetchQueries={[
            { query: SINGLE_POST_QUERY, variables: { id: post.id } },
          ]}
        >
          {(deleteComment, { error, loading }) => (
            <StyledFontAwesomeIcon
              onClick={deleteComment}
              icon={["fal", "times"]}
              color="#c7c7c7"
              size="lg"
            />
          )}
        </Mutation>
      ) : null}
    </Wrapper>
  );
};

export default Comment;
