// Libraries
import styled from 'styled-components';

const PositionHeader = ({ setPositionArray }) => {
  return (
    <Container>
      <Header>My Positions</Header>
    </Container>
  );
};

export default PositionHeader;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.p`
  color: #008485;
  font-size: 120%;
  font-weight: bold;
`;
