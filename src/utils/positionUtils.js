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
 * @param {stirng} action - Long or short 
 * @param {number} enterPrice - 진입가
 * @param {number} exitPrice - 판매가
 * @param {number} quantity - 수량
 * @param {number} currentBalance - 현재 잔고
 * @returns {Object} - 청산 결과 (action, 진입가, 판매가, 수량, 수익, 현재 잔고, 거래 시간)
 */
export const closePosition = (position,tradeData) => {
  console.log("closePosition");
  console.log(position);
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