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

/**
 * 이윤 계산 함수 
 * @param {Object} position - 포지션
 * @param {Object} tradeData - 현재 시장가
 * @returns {String} - 이윤
 */

export function calBenefit ( position, tradeData) {
    // ✅ 현재 코인의 실시간 가격 찾기
  const currentPrice = tradeData[position.coinName]?.trade_price || " ... $";
  // ✅ 현재 코인의 실시간 수익 계산
  const currentBenefit = position.orderType == "long" ? 
    (position.entryPrice * position.quantity) - (currentPrice * position.quantity) : 
      (currentPrice * position.quantity) - (position.entryPrice * position.quantity);

    return currentBenefit.toLocaleString();
}
