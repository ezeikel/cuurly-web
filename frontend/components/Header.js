import styled from "styled-components";
import Nav from './Nav';

const Wrapper = styled.header`
  display: grid;
  justify-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const Header = () => (
  <Wrapper>
    <Nav />
  </Wrapper>
);

export default Header;
