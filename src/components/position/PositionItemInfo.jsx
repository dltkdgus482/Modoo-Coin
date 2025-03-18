// Libraries
import styled from 'styled-components';

const PositionItemInfo = ({ position, benefit }) => {
  return (
    <Container>
      <p>{position.coinName}</p>
      <p>{position.quantity}</p>
      <p>{(position.entryPrice || 0).toLocaleString()} $</p>
      <p>{position.orderType}</p>
      <p>{benefit.toLocaleString()} $</p>
    </Container>
  );
};

export default PositionItemInfo;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  heigth: 100%;
`;
