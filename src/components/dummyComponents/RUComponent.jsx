// Libraries
import styled from 'styled-components';

// Components
import CryptoList from '../CryptoList';
import RULComponent from './RULComponent';
import CornerList from '../corner/CornerList';
import { useState } from 'react';

// 캐릭터 정보 창이 위치할 더미 컴포넌트입니다.
const RUComponent = ({ tradeData }) => {
  const [selectedCoinKey, setSelectedCoinKey] = useState("KRW-BTC");
  
  const onSetSelectedCoin = ((code) => {
    setSelectedCoinKey(code);
  })
  
  return (
    <Container>
      <CryptoList tradeData={tradeData} updateSelectedCoin={onSetSelectedCoin} selectedCoinKey={selectedCoinKey} />
      {/* <Chart selectedTreadeData={tradeData[selectedCoinKey]} /> */}
      <RULComponent />
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
