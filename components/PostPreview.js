import { Component } from "react";
import { Query } from "react-apollo";
import { SINGLE_POST_QUERY } from "../apollo/queries";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.li`
  position: relative;
  cursor: pointer;
`;

const Preview = styled.div`
  height: 100%;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const Overlay = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  background: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.2s opacity ease;
  &:hover {
    opacity: 1;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--spacing-large);
`;

const Stat = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--spacing-tiny);
  place-items: center;
  color: var(--color-white);
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 2.4rem;
`;

class PostPreview extends Component {
  render() {
    return (
      <Query query={SINGLE_POST_QUERY} variables={{ id: this.props.id }}>
        {({ data: { post }, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          return (
            <Wrapper>
              <Link href={`/post?id=${this.props.id}`}>
                <a>
                  <Preview key={post.id}>
                    <img src={post.content.url.replace('/upload', '/upload/w_350,h_350,ar_1:1,c_fill,dpr_2.0')} />
                  </Preview>
                  <Overlay>
                    <Stats>
                      <Stat>
                        <FontAwesomeIcon icon={["fas", "heart"]}color="var(--color-white)" size="lg"/>
                        {post.likes.length}
                      </Stat>
                      <Stat>
                        <FontAwesomeIcon icon={["fas", "comment"]}color="var(--color-white)" size="lg"/>
                        {post.comments.length}
                      </Stat>
                    </Stats>
                  </Overlay>
                </a>
              </Link>
            </Wrapper>
          );
        }}
      </Query>
    );
  }
}

export default PostPreview;
