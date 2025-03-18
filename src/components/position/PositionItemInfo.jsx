// Libraries
import styled from 'styled-components';

const PositionItemInfo = ({ position }) => {
  return (
    <Container>
      <InnerContainer>
        <p>{position.coinName}</p>
        <p>{position.orderType}</p>
      </InnerContainer>
      <p>{position.quantity}</p>
      <p>{position.entryPrice.toLocaleString()}</p>
      <p>현재가</p>
      <p>{position.orderType}</p>
      <p>profit</p>
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
