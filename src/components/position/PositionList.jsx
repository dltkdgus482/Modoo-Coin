// Libraries
import styled from 'styled-components';

// Components
import PositionItem from './PositionItem';

const PositionList = ({ positionArray }) => {
  return (
    <Container>
      {positionArray.map((position, idx) => {
        return <PositionItem key={idx} position={position} />;
      })}
    </Container>
  );
};

export default PositionList;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
`