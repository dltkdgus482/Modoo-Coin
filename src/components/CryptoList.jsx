// Libraries
import { useEffect,useRef } from 'react';
import styled from 'styled-components';

// assets
import basicSound from '@/assets/sounds/basic.mp3';
import { COIN_LIST } from '../constants/coins';

const Container = styled.div`
  position: relative; // ✅ 헤더 고정 기준
  width: 95%;
  height: 44%;
  border: 3px solid #008485;
  color: var(--hana-dark-gray);
  overflow: hidden;
`;

const SelectedCoinHeader = styled.div`
  position: absolute; // ✅ 고정
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--hana-primary);
  color: #ffffff;
  padding: 10px;
  font-size: 12px;
  z-index: 1;
`;

const CoinListContainer = styled.div`
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
  padding-top: 40px; // ✅ 헤더 높이만큼 여백 추가
`;

const CoinListUL = styled.ul`
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const CoinListItem = styled.li`
  display: grid;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  // border-bottom: 2px solid var(--hana-light);
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.1s;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  &:hover {
    background-color: var(--hana-light);
  }
`;

const Symbol = styled.span`
  font-weight: bold;
  font-size: 9px;
`;

const Price = styled.span`
  justify-self: end;
  text-align: right;
  
  font-size: clamp(4px, 2vw, 8px);
`;

const Change = styled.span`
  justify-self: end;
  text-align: right;
  margin-left: 8px;
  
  font-size: clamp(4px, 2vw, 8px);
  color: ${(props) =>
    props.change === 'RISE' ? 'green' :
    props.change === 'FALL' ? 'red' :
    'gray'};
  font-weight: bold;
`;


const cryptoNames = COIN_LIST.RENDER;

const CryptoList = ({ tradeData, updateSelectedCoin, selectedCoinKey }) => {
  useEffect(() => {
    if (tradeData) {
      // console.log("💹 새로운 거래 데이터 수신:", tradeData);
    }
  }, [tradeData]);

  const basicSounds = useRef(new Audio(basicSound));
  const playSound = () => {
    basicSounds.current.currentTime = 0.3;
    basicSounds.current.play();
  }
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
              <CoinListItem key={code} onClick={() => {
                playSound();
                console.log("누름");
                updateSelectedCoin(code); 
              }}>
                <Symbol>{name}</Symbol>
                <Price>{info ? `${info.trade_price.toLocaleString()} KRW` : "데이터 없음"}</Price>
                {info && (
                  <Change change={info.change}>
                    {info.change_price.toLocaleString()} KRW {info.change === "RISE" ? "▲" : info.change === "FALL" ? "▼" : "-"}
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
