import React, { useState } from "react";
import { enterPosition, closePosition } from "../utils/trade"; // ✅ trade.js import

export default function TradeGame() {
    const [balance, setBalance] = useState(10000000000); // 초기 잔고
    const [positions, setPositions] = useState([]); // 현재 포지션 목록

    // ✅ 포지션 진입 (롱 or 숏)
    const handleEnter = (coinType, action, price, quantity) => {
        const position = enterPosition(coinType, action, price, quantity, balance);
        if (position.error) {
            alert(position.error);
            return;
        }
        setBalance(position.updatedBalance);
        setPositions([...positions, position]);
    };

    // ✅ 포지션 청산
    const handleClose = (index, exitPrice) => {
        const pos = positions[index];
        const result = closePosition(pos.action, pos.enterPrice, exitPrice, pos.quantity, balance);
        setBalance(result.updatedBalance);
        setPositions(positions.filter((_, i) => i !== index)); // 포지션 제거
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-center mb-4">📈 비트코인 모의 투자</h1>
            <p className="text-lg font-semibold">💰 현재 잔고: <strong>{balance.toLocaleString()}원</strong></p>

            {/* 롱 & 숏 버튼 */}
            <div className="mb-4 flex space-x-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEnter("BTC", "long", 50000, 1)}>
                    롱 (매수)
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEnter("BTC", "short", 50000, 1)}>
                    숏 (매도)
                </button>
            </div>

            {/* 현재 보유 중인 포지션 */}
            {positions.length > 0 ? (
                <div>
                    <h2 className="text-lg font-bold mt-4">📌 열린 포지션</h2>
                    {positions.map((pos, index) => (
                        <div key={index} className="p-2 border rounded mt-2">
                            <p>
                                {pos.coinType} ({pos.action.toUpperCase()}) {pos.enterPrice.toLocaleString()}원 x {pos.quantity}개
                            </p>
                            <label>청산 가격: </label>
                            <input className="border p-1 rounded" type="number" defaultValue={pos.enterPrice} id={`exitPrice${index}`} />
                            <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                onClick={() => handleClose(index, Number(document.getElementById(`exitPrice${index}`).value))}>
                                청산
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-gray-600">현재 열린 포지션이 없습니다.</p>
            )}
        </div>
    );
}
