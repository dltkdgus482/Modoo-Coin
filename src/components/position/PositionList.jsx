// Libraries
import styled from 'styled-components';
import { useEffect } from 'react';

// Components
import PositionItem from './PositionItem';

const PositionList = ({ positionArray, tradeData, balance, setBalance, setPositionArray }) => {
  useEffect(() => {
    console.log('현재 포지션 업데이트')
  }, [positionArray])
  return (
    <Container>
      {positionArray.map((position, idx) => {
        return <PositionItem key={idx} position={position} tradeData={tradeData} balance={balance} setBalance={setBalance} positionArray={positionArray} setPositionArray={setPositionArray}/>;
      })}
    </Container>
  );
};

export default PositionList;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(2%, 20px);
  overflow-y: scroll;

  // IE, Firefox 제외 스크롤바 디자인
  &::-webkit-scrollbar {
    width: 4px;
    bottom: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #008485;
  }

  &::-webkit-scrollbar-track {
    background: #e9f2f1;
  }
  // IE, Firefox 스크롤바 디자인
`;
