/**
 * 코인 거래 함수 (포지션 진입)
 * @param {string} coinType - 거래할 코인의 종류 ex) "BTC"
 * @param {stirng} action - Long or short 
 * @param {number} price - 현재 코인 가격
 * @param {number} quantity - 코인 수량
 * @param {number} currentBalance - 현재 잔고
 * @returns {Object} - 거래 결과 ( 코인 종류, 거래 종류, 가격, 수량, 현재 잔고, 거래 시간)
 */
export function enterPosition (coinType, action, enterPrice, quantity, currentBalance) {
    const timestamp = new Date().toISOString();
    let updatedBalance = currentBalance - (enterPrice * quantity);
    
    if (updatedBalance < 0) {
        return { error: "잔고 부족"};
       }
    
    return {
        coinType,
        action,
        enterPrice,
        quantity,
        updatedBalance,
        timestamp
    };
}
/**
 * 코인 청산 함수 (포지션 탈출)
 * @param {stirng} action - Long or short 
 * @param {number} enterPrice - 진입가
 * @param {number} exitPrice - 판매가
 * @param {number} quantity - 수량
 * @param {number} currentBalance - 현재 잔고
 * @returns {Object} - 청산 결과 (action, 진입가, 판매가, 수량, 수익, 현재 잔고, 거래 시간)
 */

export function closePosition (action, enterPrice, exitPrice, quantity, currentBalance) {
    const timestamp = new Date().toISOString();
    const buyPrice = enterPrice * quantity;
    let profitOrLoss = 0;

    if(action == "long") {
        profitOrLoss = (exitPrice - enterPrice) * quantity;
    } else if(action == "short") {
        profitOrLoss = (enterPrice - exitPrice) * quantity;
    } else {
        return { error : "잘못된 action 입력"};
    }

    let updatedBalance = currentBalance + buyPrice + profitOrLoss;

    return {
        action,
        enterPrice,
        exitPrice,
        quantity,
        profitOrLoss,
        updatedBalance,
        timestamp
    };
}

// ✅ 테스트 실행
const balance = 10000; // 초기 잔고

// 📌 롱 포지션 진입 (BTC 500원에 10개 매수)
const longPosition = enterPosition("BTC","long", 500, 10, balance);
console.log("📌 롱 포지션 진입:", longPosition);

// 📌 롱 포지션 청산 (BTC를 600원에 매도하여 수익 실현)
const longResult = closePosition("long", 500, 600, 10, longPosition.updatedBalance);
console.log("📌 롱 포지션 청산:", longResult);

// 📌 숏 포지션 진입 (BTC 700원에 공매도)
const shortPosition = enterPosition("BTC","short", 700, 5, longResult.updatedBalance);
console.log("📌 숏 포지션 진입:", shortPosition);

// 📌 숏 포지션 청산 (BTC를 600원에 매수하여 이익 실현)
const shortResult = closePosition("short", 700, 600, 5, shortPosition.updatedBalance);
console.log("📌 숏 포지션 청산:", shortResult);