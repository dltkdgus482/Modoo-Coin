// Libraries
import styled from 'styled-components';
import { useRef,useState, useEffect } from 'react';
import { Toaster } from 'sonner';

// Utils
import { UpbitWebSocket } from './utils/cryptoInfo';
import { generateFakeData } from './utils/coinGenerate';
import { updateBalance } from './utils/logUtils';
import { playSound } from './utils/soundUtils';

// assets
import backGroundSound from '@/assets/sounds/background.mp3';
import basicSound from '@/assets/sounds/basic.mp3';

// Other Components
import Modal from './components/modal/Modal';
import UserContainer from './components/user/UserContainer';
import RUComponent from './components/dummyComponents/RUComponent';
import PositionContainer from './components/position/PositionContainer';
import LogContainer from './components/log/LogContainer';
import LUComponent from './components/dummyComponents/LUComponent';
import IntroScreen from './components/intro/MainIntro';
import TutorialModal from './components/modal/TutorialModal';


function App() {
  // ✅ 초기 로컬 스토리지 데이터 불러오기
  const initialBalance = Number(localStorage.getItem('balance')) || 1000000000;
  const initialPositions = JSON.parse(localStorage.getItem('positionArray')) || [];
  const initialTradeHistory = JSON.parse(localStorage.getItem('tradeDataHistory')) || [];
  const initialInputName = localStorage.getItem('inputName') || "";

  // ✅ 상태변수 관리리
  const [isVisible, setIsVisible] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [tradeDataHistory, setTradeDataHistory] = useState(initialTradeHistory);
  const [balance, setBalance] = useState(initialBalance);
  const [positionArray, setPositionArray] = useState(initialPositions);
  const [inputName, setInputName] = useState(initialInputName);
  const [logData,setLogData] = useState([]);

  // ✅ Sound
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // ✅ Intro
  const [started, setStarted] = useState(false);

  // ✅튜토리얼 상태
  const [showTutorial, setShowTutorial] = useState(false); // 초기에는 false
  const coinListRef = useRef(null);
  const longButtonRef = useRef(null);
  const shortButtonRef = useRef(null);
  const clearButtonRef = useRef(null);

  const tutorialRefs = {
    coinListRef,
    longButtonRef,
    shortButtonRef,
    clearButtonRef,
  };


  useEffect(() => {
    if (!inputName) {
      setIsVisible(true);       // 이름 입력 모달만 띄움
    }
  }, []);

  const handleResetStorage = () => {
    playSound(basicSound,0.3);
    localStorage.removeItem('balance');
    localStorage.removeItem('positionArray');
    localStorage.removeItem('tradeDataHistory');
    //localStorage.removeItem('inputName');

    setPositionArray([]);
    setTradeDataHistory([]);
    setBalance(1000000000);
    setLogData([]);
    // or 윈도우 reload
  };

  const toggleBackgroundMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(backGroundSound);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.warn("🎵 음악 재생 실패", e);
      });
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

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
    localStorage.setItem("inputName", inputName);
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

  // 조건부 화면 분기 로직
  if (!started) {
    return <IntroScreen onStart={() => setStarted(true)} />;
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Container>
        {showTutorial && (
          <TutorialModal
            onClose={() => setShowTutorial(false)}
            refs={tutorialRefs}
            positionArray={positionArray}
            setPositionArray={setPositionArray}
          />
        )}
        <UpperContainer>
          <LUComponent
              inputName={inputName}
              balance={balance}
              logData = {logData}
              positionArray={positionArray}
          />
          <RUComponent
            tradeData={tradeData}
            balance={balance}
            setBalance={setBalance}
            setPositionArray={setPositionArray}
            setLogData={setLogData}
            coinListRef={coinListRef}
            longButtonRef={longButtonRef}
            shortButtonRef={shortButtonRef}
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
          clearButtonRef={clearButtonRef}
        />
        <BalanceBox>
          🪙 {balance.toLocaleString()} KRW
        </BalanceBox>
        <GameTitleBox>
           MODOO COIN
        </GameTitleBox>
        <RefreshButton onClick={handleResetStorage}>
          ♻ Reset Game
        </RefreshButton>
      </Container>

      {isVisible && (
        <Modal
          setIsVisible={setIsVisible}
          setInputName={(name) => {
            setInputName(name);
            setShowTutorial(true); // ✅ 이름 설정 후 튜토리얼 시작
          }}
        />
      )}
      <MusicToggleButton onClick={toggleBackgroundMusic}>
        {isMusicPlaying ? '🔇 MusicON' : '🔊 MusicOFF'}
      </MusicToggleButton>
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
  background-color: rgb(70, 121, 85);
  background-repeat: repeat;
  animation: scrollBackground 20s linear infinite;

  @keyframes scrollBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 500px 500px;
    }
  }
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
  margin-bottom: 10px;
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

const MusicToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background-color: #333;
  color: #fff;
  border: 2px solid #00ff88;
  border-radius: 8px;
  font-size: 10px;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00ff88;
    color: #000;
  }
`;

const RefreshButton = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: #333;
  color: #fff;
  border: 2px solid #ff5e5e;
  border-radius: 8px;
  font-size: 10px;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    background-color: #ff5e5e;
    color: #000;
  }
`;