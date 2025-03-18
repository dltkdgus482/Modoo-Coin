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
        entryDate : timestamp,
        coinName: coinType, 
        entryPrice: enterPrice,
        quantity : quantity,
        orderType: action
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