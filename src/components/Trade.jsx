import React, { useState } from "react";
import { enterPosition, closePosition } from "../utils/trade"; // ✅ trade.js import
import "../styles/Trade.css"; // ✅ CSS 파일 추가

export default function TradeGame({ currentBalance, setBalance, selectedCoin }) {
    console.log("📌 전달된 잔고:", currentBalance);
    console.log("📌 전달된 선택된 코인:", selectedCoin);

    // ✅ 포지션 목록 & 수량 상태 추가
    const [positions, setPositions] = useState([]);
    const [quantity, setQuantity] = useState(0.1); // 기본값: 0.1개

    // ✅ 코인 정보 가져오기
    const coinType = selectedCoin?.coinType || "BTC";
    const coinPrice = selectedCoin?.price || 0;

    // ✅ 포지션 진입 (롱 or 숏)
    const handleEnter = (coinType, action, price, quantity) => {
        if (!coinType || price <= 0) {
            alert("코인을 먼저 선택해주세요!");
            return;
        }
        if (quantity <= 0) {
            alert("수량을 입력해주세요!");
            return;
        }

        const position = enterPosition(coinType, action, price, quantity, currentBalance);
        if (position.error) {
            alert(position.error);
            return;
        }

        console.log(JSON.stringify(position,null,2));
        setBalance(position.updatedBalance);
        setPositions([...positions, position]);
    };

    return (
        <div className="selected-coin-details pixel-borders-thin">
            <div>

            </div>
            {/* 코인 이름 & 가격 */}
            <div className="coin-detail-header">
                <div className="coin-detail-name">{selectedCoin?.coinType || "선택된 코인 없음"}</div>
                <div className="coin-detail-price">{selectedCoin?.price ? selectedCoin.price.toLocaleString() + "원" : "가격 없음"}</div>
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
                    onClick={() => handleEnter(selectedCoin.coinType, "long", selectedCoin.price, quantity)}
                >
                    BUY
                </button>
                <button 
                    className="trade-button sell-button"
                    onClick={() => handleEnter(selectedCoin.coinType, "short", selectedCoin.price, quantity)}
                >
                    SELL
                </button>
            </div>
        </div>
    );
}
