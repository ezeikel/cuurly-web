import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-family: var(--heading-font-family);
  font-style: normal;
  color: var(--color-black);
`;

const Heading = ({ level, ...rest }) => {
  return (
    <StyledHeading
      as={`h${level}`}
      {...rest}
    />
  )
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
