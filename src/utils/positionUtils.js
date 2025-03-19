/**
 * 
 * @param {any[]} data 
 * @param {any} key 
 * @param {"asc" || "desc"} order 
 */
export const customSort = (data, key, order = "asc") => {

}

/**
 * 코인 청산 함수 (포지션 탈출)
 * @param {number} balance - 잔고
 * @param {Object} position - 선택한 포지션
 * @param {Object} tradeData - 현재 거래 데이터
 * @param {number} benefit - 이윤
 * @returns {Object} - 청산 결과 (종목,수량,진입가,청산가,거래타입,순손익,청산타입,청산시간)
 */
export const closePosition = (balance,position, tradeData, benefit) => {
  const clearTime = new Date().toISOString(); // 청산 시간
  const curBalance = balance  + (position.entryPrice * position.quantity) + benefit; // ✅ 잔고 계산(현재 잔고 + 구매가 + 이윤)
  const currentPrice = getCurrentPrice(position,tradeData);
  const clearType = position.orderType === 'long' ? 'short' : position.orderType;


  return {
      coinName : position.coinName,
      quantity : position.quantity,
      entryPrice : position.entryPrice,
      clearPrice : currentPrice,
      orderType : position.orderType,
      benefit : benefit,
      clearType : clearType,
      clearTime : clearTime,
      curBalance : curBalance
  };
}

/**
 * 이윤 계산 함수 
 * @param {Object} position - 포지션
 * @param {Object} tradeData - 현재 시장가
 * @returns {number} - 이윤
 */
export function calBenefit ( position, tradeData) {
  // ✅ 현재 코인의 실시간 가격 찾기
const currentPrice = tradeData[position.coinName]?.trade_price || " ... $";
let currentBenefit = 0;
  // ✅ 현재 코인의 실시간 수익 계산  
if(currentPrice){
  currentBenefit += position.orderType == "long" ? 
  (position.entryPrice * position.quantity) - (currentPrice * position.quantity) : 
    (currentPrice * position.quantity) - (position.entryPrice * position.quantity);
}

  return currentBenefit;
}

export function getCurrentPrice ( position, tradeData ) {
  const currentPrice = tradeData[position.coinName]?.trade_price || " ... $";
  return currentPrice;
}