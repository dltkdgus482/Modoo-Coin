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
      <CornerList />
      <PositionHeader 
        setPositionArray={setPositionArray}
      />
      <PositionList
        positionArray={positionArray}
      />
    </Container>
  );
};

export default PositionContainer;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 3px solid black;
  background-color: white;
`;
