import styled from 'styled-components';

const Wrapper = styled.button`
  &[type="submit"] {
    display: block;
    height: 100%;
    width: 100%;
    padding: 15px 90px;
    background-color: var(--color-primary);
    color: var(--color-white);
    transition: background-color 0.3s ease-in-out;
    text-transform: uppercase;
    &[disabled] {
      opacity: 0.7;
      text-decoration: line-through;
    }
  }
`;

export default Wrapper;
