/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  video {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  .vjs-button {
    width: 140px;
    height: 140px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -70px;
    margin-top: -70px;
    cursor: pointer;
    pointer-events: none;
    &:focus {
      outline: none;
      svg {
        outline: none;
        path {
          outline: none;
        }
      }
    }
    &.hide {
      display: none;
    }
  }
`;
