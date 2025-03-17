// Libraries
import styled from 'styled-components';

// Components
import CryptoList from '../CryptoList';
import RULComponent from './RULComponent';
import CornerList from '../corner/CornerList';

// 캐릭터 정보 창이 위치할 더미 컴포넌트입니다.
const RUComponent = ({ tradeData }) => {
  return (
    <Container>
      <CryptoList tradeData={tradeData} />
      <RULComponent />
      <CornerList />
    </Container>
  );
};

export default RUComponent;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  border: 3px solid black;
  background-color: #e9f2f1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4%;
`;
