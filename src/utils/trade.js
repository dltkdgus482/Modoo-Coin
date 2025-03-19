/**
 * 코인 거래 함수 (포지션 진입)
 * @param {string} coinName - 거래할 코인의 종류 ex) "BTC"
 * @param {stirng} orderType - Long or short 
 * @param {number} entryPrice - 현재 코인 가격
 * @param {number} quantity - 코인 수량
 * @param {number} currentBalance - 현재 잔고
 * @returns {Object} - 거래 결과 ( 코인 종류, 거래 종류, 가격, 수량, 현재 잔고, 거래 시간)
 */
export function enterPosition (coinName, orderType, entryPrice, quantity, currentBalance) {
    const timestamp = new Date().toISOString();
    let updatedBalance = currentBalance - (entryPrice * quantity);
    
    if (updatedBalance < 0) {
        return { error: "잔고 부족"};
    }
    
    return {
        entryDate : timestamp,
        coinName, 
        entryPrice,
        quantity,
        orderType,
    };
}