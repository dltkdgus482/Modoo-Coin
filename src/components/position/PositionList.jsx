// Libraries
import styled from 'styled-components';
import { useEffect } from 'react';

// Components
import PositionItem from './PositionItem';

const PositionList = ({ positionArray, tradeData }) => {
  useEffect(() => {
    console.log('현재 포지션 업데이트')
  }, [positionArray])
  return (
    <Container>
      {positionArray.map((position, idx) => {
        return <PositionItem key={idx} position={position} tradeData={tradeData} />;
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
  flex-direction: row;
  align-items: center;
  gap: min(2%, 20px);
  overflow-x: scroll;
  
  // IE, Firefox 제외 스크롤바 디자인
  &::-webkit-scrollbar {
    height: 4px;
    bottom: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #008485;
  }

  &::-webkit-scrollbar-track {
    background: #E9F2F1;
  }
  // IE, Firefox 스크롤바 디자인
`;
