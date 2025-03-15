// Libraries
import styled from 'styled-components';

const PositionItem = ({ position }) => {
  return (
    <Container>
      <p>{position.coinName}</p>
      <p>{position.quantity}</p>
      <p>{position.entryPrice}</p>
    </Container>
  );
};

export default PositionItem;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid black;
`;