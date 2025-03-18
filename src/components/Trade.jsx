import React, { useState, useEffect } from 'react';
import { enterPosition } from '../utils/trade'; // ✅ trade.js import
import '../styles/Trade.css'; // ✅ CSS 파일 추가

export default function TradeGame({
  tradeData,
  balance,
  setBalance,
  setPositionArray,
}) {
  // console.log("📌 최신 코인 데이터:", tradeData);

  // ✅ 선택된 코인 Key와 가격 상태 관리
  const [selectedCoinKey, setSelectedCoinKey] = useState('KRW-BTC'); // 기본값: 비트코인
  const [selectedCoin, setSelectedCoin] = useState(
    tradeData['KRW-BTC']?.trade_price || 0
  );
  const [quantity, setQuantity] = useState(0.1); // 기본값: 0.1개
  const [positions, setPositions] = useState([]); // 포지션 목록

  // ✅ tradeData가 업데이트될 때마다 선택된 코인의 가격을 자동으로 갱신
  useEffect(() => {
    if (tradeData[selectedCoinKey]) {
      setSelectedCoin(tradeData[selectedCoinKey].trade_price);
    }
  }, [tradeData, selectedCoinKey]); // tradeData 또는 selectedCoinKey가 변경될 때 실행

  useEffect(() => {
    console.log('📌 현재 포지션 목록:', positions);
  }, [positions]); // positions 배열이 변경될 때마다 실행

  // ✅ 포지션 진입 (롱 or 숏)
  const handleEnter = (action, quantity) => {
    const coinType = selectedCoinKey; // ✅ 선택된 코인 키 사용
    const price = selectedCoin; // ✅ 현재 가격 사용

    if (!coinType || price <= 0) {
      alert('코인을 먼저 선택해주세요!');
      return;
    }
    if (quantity <= 0) {
      alert('수량을 입력해주세요!');
      return;
    }
    console.log('현재 잔고' + balance);
    const position = enterPosition(coinType, action, price, quantity, balance);
    console.log("포지션"+position)  

    console.log(JSON.stringify(position, null, 2));
    setBalance(balance - (quantity * price));
    setPositionArray(prevPositions => [...prevPositions, position]);
  };

  return (
    <div className="selected-coin-details pixel-borders-thin">
      {/* 🔥 실시간 코인 선택 드롭다운 */}
      <div className="form-row">
        <label className="form-label">SELECT COIN:</label>
        <select
          className="quantity-input"
          value={selectedCoinKey}
          onChange={(e) => setSelectedCoinKey(e.target.value)}
        >
          {Object.keys(tradeData).map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </select>
      </div>
      {/* 코인 이름 & 가격 */}
      <div className="coin-detail-header">
        <div className="coin-detail-name">
          {selectedCoinKey || '선택된 코인 없음'}
        </div>
        <div className="coin-detail-price">
          {selectedCoin.toLocaleString() + '원' || '가격 없음'}
        </div>
      </div>

      {/* 수량 입력 */}
      <div className="form-row">
        <label className="form-label">QUANTITY:</label>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="0.01"
          step="0.01"
        />
      </div>

      {/* BUY / SELL 버튼 */}
      <div className="trading-controls">
        <button
          className="trade-button buy-button"
          onClick={() => handleEnter('long', quantity)}
        >
          BUY
        </button>
        <button
          className="trade-button sell-button"
          onClick={() => handleEnter('short', quantity)}
        >
          SELL
        </button>
      </div>
    </div>
  );
}
