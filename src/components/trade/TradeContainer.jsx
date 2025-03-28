// Libraries
import styled from 'styled-components';

// Other Components
import TradeInfo from './TradeInfo';
import TradeButton from './TradeButton';

const TradeContainer = ({ quantity, setQuantity, handleEnter, selectedCoinKey, longButtonRef, shortButtonRef }) => {
  return (
    <Container>
      <TradeInfo quantity={quantity} setQuantity={setQuantity} />
      <TradeButton handleEnter={handleEnter} selectedCoinKey={selectedCoinKey} quantity={quantity} longButtonRef={longButtonRef} shortButtonRef={shortButtonRef}/>
    </Container>
  );
};

export default TradeContainer;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
