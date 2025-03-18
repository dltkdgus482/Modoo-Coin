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
 * @param {stirng} benefit - 이윤
 * @param {number} balance - 현재 잔고
 * @param {number} entryPrice - 진입가
 * @returns {Object} - 청산 결과 (청산시간, 이윤, 현재잔고)
 */
export const closePosition = (benefit,balance,entryPrice) => {
  const timestamp = new Date().toISOString();
  console.log("entryPrice" + entryPrice + "balance" + balance + "benefit" + benefit);
  const curBalance = balance  + entryPrice + benefit; // ✅ 잔고 계산

  return {
      timestamp,
      benefit,
      curBalance
  };
}

