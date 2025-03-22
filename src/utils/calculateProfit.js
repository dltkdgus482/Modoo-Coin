export const calculateProfit = (balance, positionArray) => {
    const positionSum = positionArray.reduce((acc, position)=> acc + position.quantity * position.entryPrice, 0)
    return balance + positionSum - 1000000000;
}