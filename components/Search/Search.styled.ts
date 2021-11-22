import styled, { keyframes } from "styled-components";

type DropdownItemProps = {
  highlighted?: boolean;
};

export const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

export const SearchStyles = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  input {
    display: flex;
    justify-items: center;
    width: 100%;
    padding: 6px;
    border: solid 1px #dbdbdb;
    outline: 0;
    font-size: 1.6rem;
    background-color: #fafafa;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export const ComboBox = styled.div`
  width: 215px;
`;

export const DropDown = styled.div`
  position: absolute;
  z-index: 2;
  border: 1px solid ${(props) => props.theme.lightgrey};
  width: 215px;
`;

export const DropdownItem = styled.div<DropdownItemProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
  background: ${({ highlighted }) => (highlighted ? "#f7f7f7" : "white")};
  padding: 8px 14px;
  transition: all 0.2s;
  font-size: 1.4rem;
  line-height: 2.2rem;
  width: 100%;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
`;

export const UserPhoto = styled.div`
  display: grid;
  width: 32px;
  height: 32px;
  img {
    border-radius: 50%;
  }
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

export const Username = styled.span`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
`;

export const Name = styled.span`
  display: grid;
  color: #999999;
`;
