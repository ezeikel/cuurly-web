import styled from 'styled-components';

const Wrapper = styled.header`
  font-family: var(--default-font-family);
  font-style: normal;
  color: ${({ theme }) => theme.default.textColor};
`;

const Header = ({ theme }) => (
    <Wrapper theme={theme}>Header.</Wrapper>
);

export default Header;
