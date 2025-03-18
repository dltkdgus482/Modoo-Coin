// Libraries
import styled from 'styled-components';

const TradeInfo = ({ quantity, setQuantity }) => {
  return (
    <Container>
      <StyledText>QUANTITY: </StyledText>
      <StyledInput
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </Container>
  );
};

export default TradeInfo;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.p`
  color: #008485;
  font-size: 100%;
  font-weight: 1000;
`;

const StyledInput = styled.input`
  width: 30%;
  height: 70%;
  border: 2px solid #008485;
  padding: 0 2%;
  outline: none;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: #0072bc;
    box-shadow: 0px 0px 8px rgba(0, 114, 188, 0.5);
  }
`;
