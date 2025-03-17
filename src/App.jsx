// Libraries
import styled from 'styled-components';

// Components
import LUComponent from './components/dummyComponents/LUComponent';
import RUComponent from './components/dummyComponents/RUComponent';
import PositionContainer from './components/position/PositionContainer';

function App() {
  return (
    <Container>
      <UpperContainer>
        <LUComponent />
        <RUComponent />
      </UpperContainer>
      <PositionContainer />
    </Container>
  );
}

export default App;

// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

const UpperContainer = styled.div`
  width: 70%;
  height: 57%;
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;