import { useEffect, useState } from "react";
import { UpbitWebSocket } from "./utils/cryptoInfo";
import Temp from "./components/Temp";
import CryptoList from "./components/CryptoList";

function App() {
  const [tradeData, setTradeData] = useState({});
  const [selectedCoinKey, setSelectedCoinKey] = useState("KRW-BTC");

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

  const onSetSelectedCoin = ((code) => {
    setSelectedCoinKey(code);
  })

  return (
    <>
      <h1>리액트 프로젝트</h1>
      <Temp />
      <CryptoList tradeData={tradeData} />
    </>
  );
}

export default App;
