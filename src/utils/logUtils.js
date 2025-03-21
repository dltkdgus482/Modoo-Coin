export function createClearLog(result) {
    const boxWidth = 34;// 전체 박스 너비
    const contentWidth = boxWidth - 4; // 좌우 🟦 제외한 내용 너비

    const coinNameLine = `🪙 CoinName: ${result.coinName}`.padEnd(contentWidth, " ") + " ";
    const entryPriceLine = `💵 EntryPrice: ${result.entryPrice}`.padEnd(contentWidth, " ") + " ";
    const clearPriceLine = `💸 ClearPrice: ${result.clearPrice}`.padEnd(contentWidth, " ") + " ";

    let benefitIcon = parseInt(result.benefit) > 0 ? "😍" : "😥";
    let type = parseInt(result.benefit) > 0 ? "clear-win" : "clear-loose";
    if(parseInt(result.benefit) === 0) {
        type = 'none';
        benefitIcon = "😒";
    }
    const benefitLine = `${benefitIcon} Benefit: ${result.benefit}`.padEnd(contentWidth, " ") + " ";

    let border = "=".repeat(boxWidth); // 상하 경계 줄

    let log = `☑️ Clear Position \n`;
    log += `${border}\n`;
    log += ` ${coinNameLine}\n`;
    log += ` ${entryPriceLine}\n`;
    log += ` ${clearPriceLine}\n`;
    log += ` ${benefitLine}\n`;
    log += `${border}\n`;

    return  {type: type, content: log};
}


export function updateBalance(balance) {
    const boxWidth = 35; // 전체 박스 너비
    const contentWidth = boxWidth - 4; // 좌우 🟩 제외한 내용 너비

    const balanceLine = `💵 Current Balance: ${balance}`.padEnd(contentWidth, " ") + " ";

    let border = "=".repeat(boxWidth); // 상하 경계 줄

    let log = `${border}\n`;
    log += `${balanceLine}\n`;
    log += `${border}\n`;

    return  {type:'update', content: log};
}

export function enterPositionLog(position) {
    const boxWidth = 35; // 전체 박스 너비
    const contentWidth = boxWidth - 4; // 좌우 🟨 제외한 내용 너비

    const coinNameLine = `🪙 CoinName: ${position.coinName}`.padEnd(contentWidth, " ") + " ";
    const entryPriceLine = `💵 EntryPrice: ${position.entryPrice}`.padEnd(contentWidth, " ") + " ";
    const quantityLine = `📈 Quantity: ${position.quantity}`.padEnd(contentWidth, " ") + " ";
    const totalPrice = position.entryPrice * position.quantity;
    const totalPriceLine = `📋 Total Price: ${totalPrice}`.padEnd(contentWidth, " ") + " ";

    let border = "=".repeat(boxWidth); // 상하 경계 줄

    let log = `✅ Enter Position.\n`;
    log += `${border}\n`;
    log += ` ${coinNameLine}\n`;
    log += ` ${entryPriceLine}\n`;
    log += ` ${quantityLine}\n`;
    log += ` ${totalPriceLine}\n`;
    log += `${border}\n`;

    return  {type:'enter', content: log};
}

export function changeCoinTypeLog(coinKey, price) {
    const boxWidth = 40; // 전체 박스 너비
    const contentWidth = boxWidth - 4; // 좌우 🟦 제외한 내용 너비

    const coinLine = `🪙 Selected Coin: ${coinKey}`.padEnd(contentWidth, " ") + " 🟦";
    const priceLine = `💵 Current Price: ${price}`.padEnd(contentWidth, " ") + " 🟦";

    let border = "=".repeat(boxWidth); // 상하 경계 줄

    let log = `🔄 Coin Type Changed\n`;
    log += `${border}\n`;
    log += ` ${coinLine}\n`;
    log += ` ${priceLine}\n`;
    log += `${border}\n`;

    return  {type:'chnage', content: log};
}



