// Libraries
import styled from 'styled-components';

// Components
import CryptoList from '../CryptoList';
import RULComponent from './RULComponent';
import CornerList from '../corner/CornerList';
import Trade from '../../components/Trade';
import { useState } from 'react';
import ChartContainer from '../chart/ChartContainer';

// 캐릭터 정보 창이 위치할 더미 컴포넌트입니다.
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
      <ChartContainer 
        selectedTradeData={tradeData[selectedCoinKey]}
        selectedCoinKey = {selectedCoinKey}
      />
      <Trade
        tradeData={tradeData}
        balance={balance}
        setBalance={setBalance}
        setPositionArray={setPositionArray}
        selectedCoinKey={selectedCoinKey}
      ></Trade>
      {/* <RULComponent/> */}
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
