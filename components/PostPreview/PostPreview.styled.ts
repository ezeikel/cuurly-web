import styled from "styled-components";

export const Wrapper = styled.li`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

export const Preview = styled.div`
  height: 100%;
  img,
  video {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

export const Overlay = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.2s opacity ease;
  &:hover {
    opacity: 1;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--spacing-large);
`;

export const Stat = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--spacing-tiny);
  place-items: center;
  color: var(--color-white);
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 2.4rem;
`;
