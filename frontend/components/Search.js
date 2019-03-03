import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Search = () => (
  <Wrapper>
    <input type="text" />
  </Wrapper>
);

export default Search;
