import React from 'react';
import styled from 'styled-components';
import { useCoinInfo } from '../store/useCoinInfo';

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

const CryptoList = () => {
  const tradingInfo = useCoinInfo();

  const selectedCoin = tradingInfo[0] || { symbol: 'BTC', price: 0, change: 0 };

  return (
    <Container>
      <SelectedCoinHeader>
        <div>{selectedCoin.symbol}</div>
        <div>{selectedCoin.price.toLocaleString()} $</div>
      </SelectedCoinHeader>

      <CoinListContainer>
        <CoinListUL>
          {tradingInfo.map((crypto) => (
            <CoinListItem key={crypto.symbol}>
              <Symbol>{crypto.symbol}</Symbol>
              <Price>{crypto.price.toLocaleString()} $</Price>
              <Change value={crypto.change}>
                {crypto.change > 0 ? '▲' : '▼'} {crypto.change}%
              </Change>
            </CoinListItem>
          ))}
        </CoinListUL>
      </CoinListContainer>
    </Container>
  );
};

export default CryptoList;
