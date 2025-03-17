// Libraries
import styled from 'styled-components';

// Components
import CornerList from '../corner/CornerList';

// 캐릭터 정보 창이 위치할 더미 컴포넌트입니다.
const LUComponent = () => {
  return (
    <Container>
      <CornerList />
    </Container>
  );
};

export default LUComponent;

// Styled Components
const Container = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  border: 3px solid black;
  background-color: #e9f2f1;
`;
