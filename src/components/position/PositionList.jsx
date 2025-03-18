// Libraries
import styled from 'styled-components';

// Components
import PositionItem from './PositionItem';

const PositionList = ({ positionArray, setPositionArray }) => {
  return (
    <Container>
      {positionArray.map((position, idx) => {
        return (
          <PositionItem
            key={idx}
            position={position}
            handleClose={() => {
              setPositionArray((prev) => prev.filter((_, i) => i !== idx));
            }}
          />
        );
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
