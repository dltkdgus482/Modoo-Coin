// Libraries
import styled from 'styled-components';
import { useState, useEffect } from 'react';

// Utils
import { UpbitWebSocket } from './utils/cryptoInfo';
import { generateFakeData } from './utils/coinGenerate';
import { updateBalance } from './utils/logUtils';

// Other Components
import Modal from './components/modal/Modal';
import UserContainer from './components/user/UserContainer';
import RUComponent from './components/dummyComponents/RUComponent';
import PositionContainer from './components/position/PositionContainer';
import LogContainer from './components/log/LogContainer';
import LUComponent from './components/dummyComponents/LUComponent';

function App() {
  // ✅ 초기 로컬 스토리지 데이터 불러오기
  const initialBalance = Number(localStorage.getItem('balance')) || 1000000000;
  const initialPositions = JSON.parse(localStorage.getItem('positionArray')) || [];
  const initialTradeHistory = JSON.parse(localStorage.getItem('tradeDataHistory')) || [];
  const initialInputName = localStorage.getItem('inputName') || "";

  const [isVisible, setIsVisible] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [tradeDataHistory, setTradeDataHistory] = useState(initialTradeHistory);
  const [balance, setBalance] = useState(initialBalance);
  const [positionArray, setPositionArray] = useState(initialPositions);

  const [inputName, setInputName] = useState(initialInputName);
  const [logData,setLogData] = useState([]);
  
  useEffect(() => {
    // 신규 사용자 여부 판단
    if (!inputName) setIsVisible(true);
  }, [])

  useEffect(() => {
    if (logData.length === 0) { // logData가 비어있을 때만 추가
      let log = `😆 HELLO !\n`;
      setLogData([{type:'start',content:log}]); // 처음 한 번만 실행
    }
  }, []);

  // ✅ balance가 변경될 때마다 저장
  useEffect(() => {
    let log = updateBalance(balance);
    //console.log(log);
    setLogData((prevLog) => [...prevLog,log])
    localStorage.setItem("balance", balance);
  }, [balance]);
  // ✅ position 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("positionArray", JSON.stringify(positionArray));
  }, [positionArray]);
  // ✅ history 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("tradeDataHistory", JSON.stringify(tradeDataHistory));
  }, [tradeDataHistory]);
  // ✅ name 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("inputName", JSON.stringify(inputName));
  }, [inputName]);
  
  useEffect(() => {
    const upbitWS = new UpbitWebSocket([
      'KRW-BTC',
      'KRW-ETH',
      'KRW-XRP',
      'KRW-DOT',
      'KRW-ADA',
    ]);
    
    const handleTradeData = (data) => {
      setTradeData((prevData) => ({
        ...prevData,
        [data.code]: {
          trade_price: data.trade_price, // 현재가
          prev_closing_price: data.prev_closing_price, // 전일 종가
          change: data.change, // 전일 대비("RISE", "EVEN", "FALL" 중 하나)
          change_price: data.change_price, // 부호 없는 전일 대비 값
          change_rate: data.change_rate, // 부호 없는 전일 대비 등락율
        },
      }));
    };

    upbitWS.subscribeToData(handleTradeData);

    // 1초마다 가상의 데이터 추가
  const fakeDataInterval = setInterval(() => {
    setTradeData((prevData) => ({
      ...prevData,
      ...generateFakeData(), // ✅ Upbit 데이터 + 가상 데이터 추가
    }));
  }, 1000);

    return () => {
      upbitWS.unsubscribeFromData(handleTradeData);
      upbitWS.close();
      clearInterval(fakeDataInterval); // ✅ 가상 데이터 업데이트 중지
    };
  }, []);

  return (
    <>
      <Container>
        <UpperContainer>
          <LUComponent
              inputName={inputName}
              balance={balance}
              logData = {logData}
          />
          <RUComponent
            tradeData={tradeData}
            balance={balance}
            setBalance={setBalance}
            setPositionArray={setPositionArray}
            setLogData={setLogData}
          />
        </UpperContainer>
        <PositionContainer
          tradeData={tradeData}
          balance={balance}
          setBalance={setBalance}
          positionArray={positionArray}
          setPositionArray={setPositionArray}
          setTradeDataHistory={setTradeDataHistory}
          setLogData={setLogData}
          tradeDataHistory={tradeDataHistory}
        />
        <BalanceBox>
          🪙 {balance.toLocaleString()} KRW
        </BalanceBox>
        <GameTitleBox>
           MODOO COIN
        </GameTitleBox>
      </Container>


      {isVisible &&
        <Modal
          setIsVisible={setIsVisible}
          setInputName={setInputName}
        />}

    </>
  );
}

export default App;

// Styled Components
const Container = styled.div`
  * {
    box-sizing: border-box;
    font-family: 'Press Start 2P', 'Pixelify Sans', monospace !important;
  }

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;

  background-image: url('https://www.transparenttextures.com/patterns/pixel-weave.png');
  background-color:rgb(70, 121, 85);
`;

const UpperContainer = styled.div`
  width: 70%;
  height: 60%;
  display: flex;
  flex-direction: row;
  
  gap: 1vw;
`;

const BalanceBox = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #00ff88;
  border: 2px solid #00ff88;
  border-radius: 6px;
  font-size: 9px;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  z-index: 1000;
`;

const GameTitleBox = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 6px 10px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 6px;
  font-size: 9px;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  z-index: 1000;
`;

