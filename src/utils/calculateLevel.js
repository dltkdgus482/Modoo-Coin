export const calculateLevel = (balance) => {
    if (balance < 0) {
        return 0;
    }
    return parseInt(balance / 10000000);

}