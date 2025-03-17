// DummyData
import { positionData } from '../../mocks/dummyData';

// Libraries
import { useState } from 'react';
import styled from 'styled-components';

// Components
import PositionHeader from './PositionHeader';
import PositionList from './PositionList';
import CornerList from '../corner/CornerList';

const PositionContainer = () => {
  const [positionArray, setPositionArray] = useState(positionData);

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
  height: 21%;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 3px solid black;
  background-color: #E9F2F1;
  padding: 1%;
`;
