// Libraries
import styled from 'styled-components';
import { useEffect, useState } from "react";

// Utils
import { UpbitWebSocket } from "./utils/cryptoInfo";

// Components
import LUComponent from './components/dummyComponents/LUComponent';
import RUComponent from './components/dummyComponents/RUComponent';
import PositionContainer from './components/position/PositionContainer';

function App() {
  const [tradeData, setTradeData] = useState({});

  useEffect(() => {
    const upbitWS = new UpbitWebSocket(["KRW-BTC", "KRW-ETH", "KRW-XRP", "KRW-DOT", "KRW-ADA"]);

    const handleTradeData = (data) => {
      setTradeData((prevData) => ({
        ...prevData,
        [data.code]: {
          trade_price: data.trade_price,               // 현재가
          prev_closing_price: data.prev_closing_price, // 전일 종가
          change: data.change,                         // 전일 대비("RISE", "EVEN", "FALL" 중 하나)
          change_price: data.change_price,             // 부호 없는 전일 대비 값
          change_rate: data.change_rate,               // 부호 없는 전일 대비 등락율
        },
      }));
    };

    upbitWS.subscribeToData(handleTradeData);

    return () => {
      upbitWS.unsubscribeFromData(handleTradeData);
      upbitWS.close();
    };
  }, []);

  return (
    <Container>
      <UpperContainer>
        <LUComponent />
        <RUComponent tradeData={tradeData} />
      </UpperContainer>
      <PositionContainer />
    </Container>
  );
}

export default App;

// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;

  background-color: rgb(225, 225, 225);
`;

const UpperContainer = styled.div`
  width: 70%;
  height: 52%;
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;