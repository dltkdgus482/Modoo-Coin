// Libraries
import styled from 'styled-components';

// Components
import CryptoList from '../CryptoList';
import CornerList from '../corner/CornerList';
import Trade from '../../components/Trade';
import { useState } from 'react';
import ChartContainer from '../chart/ChartContainer';

const RUComponent = ({ tradeData, balance, setBalance, setPositionArray }) => {
  const [selectedCoinKey, setSelectedCoinKey] = useState('KRW-BTC');

  const onSetSelectedCoin = (code) => {
    setSelectedCoinKey(code);
  };

  return (
    <Container>
      <CryptoList
        tradeData={tradeData}
        updateSelectedCoin={onSetSelectedCoin}
        selectedCoinKey={selectedCoinKey}
      />
      <RULComponent>
        <ChartContainer
          selectedTradeData={tradeData[selectedCoinKey]}
          selectedCoinKey={selectedCoinKey}
        />
        <Trade
          tradeData={tradeData}
          balance={balance}
          selectedTradeData={tradeData[selectedCoinKey]}
          selectedCoinKey={selectedCoinKey}
          setBalance={setBalance}
          setPositionArray={setPositionArray}
        />
      </RULComponent>
      <CornerList />
    </Container>
  );
};

export default RUComponent;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  border: 3px solid black;
  background-color: #e9f2f1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4%;
`;

const RULComponent = styled.div`
  width: 92%;
  height: 44%;
  border: 3px solid #008485;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4%;
`;
