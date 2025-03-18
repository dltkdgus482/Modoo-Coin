import styled from 'styled-components';
import ChartHeader from './ChartHeader';
import ChartGraph from './ChartGraph';

const ChartContainer = ({ selectedTradeData, selectedCoinKey }) => {
  if (!selectedTradeData || !selectedCoinKey) return;
  return (
    <Container>
      {/* <ChartHeader cryptoName = {selectedCoinKey} cryptoPrice = {selectedTradeData.trade_price} /> */}
      <ChartGraph
        cryptoName={selectedCoinKey}
        cryptoPrice={selectedTradeData.trade_price}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 48%;
  position: relative;
  background-color: #e9f2f1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4%;
`;

export default ChartContainer;
