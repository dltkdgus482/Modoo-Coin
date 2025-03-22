// Libraries
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

// Utils
import { enterPosition } from '../utils/trade';
import { isValid } from '../utils/tradeUtils';
import { enterPositionLog } from '../utils/logUtils';

// Styles
import '../styles/Trade.css';

// Other Components
import TradeContainer from './trade/TradeContainer';

const Trade = ({
  tradeData,
  balance,
  selectedTradeData,
  setBalance,
  setPositionArray,
  selectedCoinKey,
  setLogData
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState(
    selectedTradeData?.trade_price || 0
  );

  useEffect(() => {
    if (tradeData[selectedCoinKey]) {
      setSelectedCoin(tradeData[selectedCoinKey].trade_price);
    }
  }, [tradeData, selectedCoinKey]);


  const handleEnter = (action) => {
    if (!isValid(selectedCoin, selectedCoinKey, quantity, balance)) {
      return;
    }
    
    const position = enterPosition(
      selectedCoinKey,
      action,
      selectedCoin,
      quantity,
      balance
    );
    let log = enterPositionLog(position);
    //console.log(log);
    setLogData((prevLog) => [...prevLog,log]);
    setBalance(balance - selectedCoin * quantity);
    setPositionArray((prevPositions) => [...prevPositions, position]);
  };

  return (
    <Container>
      <TradeContainer
        quantity={quantity}
        setQuantity={setQuantity}
        handleEnter={handleEnter}
        selectedCoinKey={selectedCoinKey}
      />
    </Container>
  );
};

export default Trade;

// Styled Components
const Container = styled.div`
  width: 96%;
  height: 42%;
  display: flex;
`;
