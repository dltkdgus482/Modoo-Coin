// Libraries
import styled from 'styled-components';

// Components
import PositionHeader from './PositionHeader';
import PositionList from './PositionList';
import CornerList from '../corner/CornerList';

const PositionContainer = ({ tradeData, balance, setBalance, positionArray, setPositionArray, setTradeDataHistory, setLogData, tradeDataHistory, clearButtonRef}) => {
  return (
    <Container ref={clearButtonRef}>
      <PositionHeader tradeDataHistory={tradeDataHistory} setTradeDataHistory={setTradeDataHistory}/>
      <PositionList positionArray={positionArray} tradeData={tradeData} balance={balance} setBalance={setBalance} setPositionArray={setPositionArray} setTradeDataHistory={setTradeDataHistory} setLogData={setLogData} clearButtonRef={clearButtonRef}/>
      <CornerList />
    </Container>
  );
};

export default PositionContainer;

// Styled Components
const Container = styled.div`
  width: 70%;
  height: 30%;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 3px solid black;
  background-color: #e9f2f1;
  padding: 1%;
`;
