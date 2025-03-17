import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  font-family: 'Press Start 2P', cursive;
  color: var(--hana-dark-gray);
`;

const SelectedCoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--hana-primary);
  color: #fff;
  padding: 10px;
  font-size: 12px;
`;

const CoinListContainer = styled.div`
  border: 2px solid var(--hana-primary);
  background-color: #fff;
  height: 180px;
  overflow-y: auto;
`;

const CoinListUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const CoinListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid var(--hana-light);
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--hana-light);
  }
`;

const Symbol = styled.span`
  font-weight: bold;
  font-size: 10px;
`;

const Price = styled.span`
  font-size: 10px;
`;

const Change = styled.span`
  font-size: 10px;
  margin-left: 8px;
  color: ${(props) => (props.value > 0 ? 'var(--hana-primary)' : 'var(--hana-blue)')};
`;

const cryptoNames = {
  "KRW-BTC": "비트코인 (BTC)",
  "KRW-ETH": "이더리움 (ETH)",
  "KRW-XRP": "리플 (XRP)",
  "KRW-DOT": "폴카닷 (DOT)",
  "KRW-ADA": "에이다 (ADA)",
};

const CryptoList = ({ tradeData }) => {
  useEffect(() => {
    if (tradeData) {
      // console.log("💹 새로운 거래 데이터 수신:", tradeData);
    }
  }, [tradeData]);

  const selectedCoinKey = Object.keys(tradeData)[0] || "KRW-BTC";
  const selectedCoin = tradeData[selectedCoinKey] || { trade_price: 0, change_price: 0, change: "" };

  return (
    <Container>
      <SelectedCoinHeader>
        <div>{cryptoNames[selectedCoinKey] || selectedCoinKey}</div>
        <div>{selectedCoin.trade_price.toLocaleString()} KRW</div>
      </SelectedCoinHeader>

      <CoinListContainer>
        <CoinListUL>
          {Object.entries(cryptoNames).map(([code, name]) => {
            const info = tradeData[code];
            return (
              <CoinListItem key={code}>
                <Symbol>{name}</Symbol>
                <Price>{info ? `${info.trade_price.toLocaleString()} KRW` : "데이터 없음"}</Price>
                {info && (
                  <Change value={info.change_price}>
                    {info.change === "RISE" ? "▲" : info.change === "FALL" ? "▼" : "-"} {info.change_price.toLocaleString()} KRW
                  </Change>
                )}
              </CoinListItem>
            );
          })}
        </CoinListUL>
      </CoinListContainer>
    </Container>
  );
};

export default CryptoList;
