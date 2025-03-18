// Libraries
import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { enterPosition } from '../utils/trade'; // ✅ trade.js import
import '../styles/Trade.css'; // ✅ CSS 파일 추가

export default function TradeGame({
  tradeData,
  balance,
  setBalance,
  setPositionArray,
  selectedCoinKey
}) {
  // console.log("📌 최신 코인 데이터:", tradeData);

  // ✅ 선택된 코인 Key와 가격 상태 관리
  const [selectedCoin, setSelectedCoin] = useState(
    tradeData['KRW-BTC']?.trade_price || 0
  );
  const [quantity, setQuantity] = useState(0.1); // 기본값: 0.1개
  
  const cryptoNames = {
    "KRW-BTC": "비트코인 (BTC)",
    "KRW-ETH": "이더리움 (ETH)",
    "KRW-XRP": "리플 (XRP)",
    "KRW-DOT": "폴카닷 (DOT)",
    "KRW-ADA": "에이다 (ADA)",
  };

  useEffect(() => {
        console.log("✅ 최종 업데이트된 잔고:", balance);
    }, [balance]); // ✅ balance가 변경될 때만 실행

  // ✅ tradeData가 업데이트될 때마다 선택된 코인의 가격을 자동으로 갱신
  useEffect(() => {
    if (tradeData[selectedCoinKey]) {
      setSelectedCoin(tradeData[selectedCoinKey].trade_price);
    }
  }, [tradeData, selectedCoinKey]); // tradeData 또는 selectedCoinKey가 변경될 때 실행

  // ✅ 포지션 진입 (롱 or 숏)
  const handleEnter = (action, quantity) => {
    const coinType = selectedCoinKey; // ✅ 선택된 코인 키 사용
    const price = selectedCoin; // ✅ 현재 가격 사용
    const totalCost = price * quantity;

    if (!coinType || price <= 0) {
      alert('코인을 먼저 선택해주세요!');
      return;
    }
    if (quantity <= 0) {
      alert('수량을 입력해주세요!');
      return;
    }
    if(totalCost > balance) {
        alert("🚨 잔고가 부족합니다! 현재 잔고: " + balance.toLocaleString() + "원");
        return; // 🚀 여기서 return하면 포지션이 생성되지 않음!
    }
    console.log('✅ 현재 잔고' + balance);
    const position = enterPosition(coinType, action, price, quantity, balance);
    
    setBalance(balance - (price * quantity));
    setPositionArray(prevPositions => [...prevPositions, position]);
  };

  return (

    <Container className="selected-coin-details pixel-borders-thin">
    <div className="selected-coin-details pixel-borders-thin">
      {/* 코인 이름 & 가격 */}
      <div className="coin-detail-header">
        <div className="coin-detail-name">
          {cryptoNames[selectedCoinKey] || '선택된 코인 없음'}
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
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 92%;
  height: 44%;
  border: 3px solid #008485;
`;
