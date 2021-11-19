import styled from "styled-components";

type PostActionProps = {
  actionType?: string;
  disabled?: boolean;
};

export const Wrapper = styled.article`
  display: grid;
  grid-template-rows: 60px auto;
  grid-row-gap: var(--spacing-medium);
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
`;

export const PostHeader = styled.header`
  display: grid;
  grid-template-columns: 30px 1fr auto;
  grid-template-rows: 30px;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  padding: var(--spacing-medium);
  border-bottom: 1px solid #efefef;
  border-bottom-width: 0.5px;
`;

export const Photo = styled.div`
  display: grid;
  img {
    border-radius: 50%;
  }
`;

export const Details = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 2px;
  line-height: 1;
`;

export const Username = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const Location = styled.span`
  font-size: 1.2rem;
`;

export const PostContent = styled.div`
  display: grid;
`;

export const PostInteraction = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-row-gap: var(--spacing-small);
  padding: 0 var(--spacing-medium);
`;

export const Buttons = styled.section`
  display: grid;
`;

export const Likes = styled.div`
  display: grid;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

export const Caption = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  font-size: 1.4rem;
  line-height: 1.8rem;
  a {
    font-weight: bold;
  }
`;

export const PostTime = styled.div`
  display: grid;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  line-height: 18px;
  color: #999;
  text-transform: uppercase;
`;

export const AddComment = styled.section`
  display: grid;
  border-top: 1px solid #efefef;
  min-height: 56px;
`;

export const ModalBody = styled.div`
  overflow-y: scroll;
`;

export const PostActions = styled.ul`
  display: grid;
`;

export const PostAction = styled.li<PostActionProps>`
  display: grid;
  align-items: center;
  justify-content: space-around;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ actionType }) =>
      actionType === "negative"
        ? `
    color: var(--color-red);
  `
        : null}
    ${({ disabled }) =>
      disabled
        ? `
    pointer-events: none;
    opacity: 0.3;
  `
        : null}
  }
`;

export const CommentList = styled.ul`
  display: grid;
  grid-row-gap: var(--spacing-small);
`;
