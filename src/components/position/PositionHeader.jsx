// Libraries
import styled from 'styled-components';

const PositionHeader = ({ setPositionArray }) => {
  return (
    <Container>
      <HeaderItem>종목</HeaderItem>
      <HeaderItem>수량</HeaderItem>
      <HeaderItem>가격</HeaderItem>
    </Container>
  );
};

export default PositionHeader;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const HeaderItem = styled.h3`
  cursor: pointer;
`;
