export const handleEnter = (
  action,
  quantity,
  selectedCoinKey,
  selectedCoin,
  balance,
  enterPosition,
  setBalance,
  setPositionArray
) => {
  const coinType = selectedCoinKey;
  const price = selectedCoin;
  const totalCost = price * quantity;

  if (!coinType || price <= 0) {
    alert('코인을 먼저 선택해주세요!');
    return;
  }
  if (quantity <= 0) {
    alert('수량을 입력해주세요!');
    return;
  }
  if (totalCost > balance) {
    alert(
      '🚨 잔고가 부족합니다! 현재 잔고: ' + balance.toLocaleString() + '원'
    );
    return;
  }
  const position = enterPosition(coinType, action, price, quantity, balance);

  setBalance(balance - price * quantity);
  setPositionArray((prevPositions) => [...prevPositions, position]);
};

export const isValid = (selectedCoin, selectedCoinKey, quantity, balance) => {
  if (!selectedCoinKey || selectedCoin <= 0) {
    alert('코인을 먼저 선택해주세요!');
    return false;
  }
  if (quantity <= 0) {
    alert('수량을 입력해주세요!');
    return false;
  }
  if (quantity * selectedCoin > balance) {
    alert(
      '🚨 잔고가 부족합니다! 현재 잔고: ' + balance.toLocaleString() + '원'
    );
    return false;
  }
  return true;
}

export const lightenColor = (hex, percent) => {
  let num = parseInt(hex.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    r = (num >> 16) + amt,
    g = ((num >> 8) & 0x00ff) + amt,
    b = (num & 0x0000ff) + amt;

  return `rgb(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)})`;
};