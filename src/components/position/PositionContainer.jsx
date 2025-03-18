// Libraries
import styled from 'styled-components';

// Components
import PositionHeader from './PositionHeader';
import PositionList from './PositionList';
import CornerList from '../corner/CornerList';

const PositionContainer = ({ positionArray, setPositionArray }) => {
  return (
    <Container>
      <PositionHeader setPositionArray={setPositionArray} />
      <PositionList positionArray={positionArray} />
      <CornerList />
    </Container>
  );
};

export default PositionContainer;

// Styled Components
const Container = styled.div`
  width: 68%;
  height: 26%;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 3px solid black;
  background-color: #e9f2f1;
  padding: 1%;
`;
