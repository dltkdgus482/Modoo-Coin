export const generateFakeData = () => {
    let basePrice = 100000000; // 기본 가격
    let changeRate = (Math.random() * 0.1) - 0.05; // 일반적인 변동 ±5% ~ 10%
  
    // 🎯 특정 확률로 급등(펌핑) 또는 급락(덤핑) 이벤트 발생
    const eventProbability = Math.random();
    if (eventProbability < 0.1) { // 10% 확률로 펌핑
        changeRate = (Math.random() * 0.2) + 0.1; // +10% ~ +30%
    } else if (eventProbability > 0.9) { // 10% 확률로 덤핑
        changeRate = -(Math.random() * 0.2) - 0.1; // -10% ~ -30%
    }

    const newPrice = Math.floor(basePrice * (1 + changeRate)); // 변동 반영
    const changePrice = Math.abs(newPrice - basePrice); // 변동 값 계산

    return {
      "KRW-POT": {
        trade_price: newPrice,
        prev_closing_price: basePrice,
        change: changeRate > 0 ? "RISE" : "FALL",
        change_price: changePrice, 
        change_rate: Math.abs(changeRate), 
      }
    };
};
