import styled from 'styled-components';

const HistoryModal = ({ onClose, tradeDataHistory, setTradeDataHistory }) => {

    const createHistory = (trade, index) => {
        const parsedDate = new Date(trade.clearTime);
      
        const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
      
        const formattedTime = `${parsedDate.getHours().toString().padStart(2, '0')}:${parsedDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${parsedDate.getSeconds().toString().padStart(2, '0')}`;
      
        return (
          <TradeItem key={index}>
            🪙 코인 종류 : {trade.coinName} <br />
            💰 진입가 : {trade.entryPrice} <br />
            🔄 청산가 : {trade.clearPrice} <br />
            {trade.benefit !== undefined && (
              <>
                {parseFloat(trade.benefit) >= 0
                  ? `✅ 수익 : +${trade.benefit}`
                  : `❌ 손실 : ${trade.benefit}`}
              </>
            )}
            <br />
            📅 청산일 : {formattedDate} 🕒 {formattedTime}
          </TradeItem>
        );
      };        

  return (
    <Overlay>
      <ModalBox>
      <Header>
        <span>📜 Trade History</span>
        <HeaderButtons>
            <ClearBtn onClick={() => setTradeDataHistory([])}>🧹 Clear</ClearBtn>
            <CloseBtn onClick={onClose}>❌</CloseBtn>
        </HeaderButtons>
    </Header>
        
        <Content>
          {tradeDataHistory.length > 0 ? (
            <HistoryList>
              {tradeDataHistory.map((trade, index) => createHistory(trade, index))}
            </HistoryList>
          ) : (
            <NoHistory>🚫 No trade history available</NoHistory>
          )}
        </Content>
      </ModalBox>
    </Overlay>
  );
};

export default HistoryModal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 450px; /* ✅ 모달 너비 고정 */
  height: 500px; /* ✅ 모달 높이 고정 */
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Content = styled.div`
  overflow-y: auto; /* ✅ 스크롤 가능하도록 설정 */
  padding-right: 2px; /* 스크롤바와의 간격 */
  background-color:rgb(142, 160, 147);
  border-radius: 10px;
`;

const HistoryList = styled.div`
  max-height: 430px; /* ✅ 내용 영역 높이 제한 */
  gap: 20px;
`;

const TradeItem = styled.div`
  padding: 5px;
  border-bottom: 2px solid rgb(255, 255, 255);
  font-size: 12px;
  font-weight: bold;
`;

const NoHistory = styled.p`
  text-align: center;
  color: #777;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearBtn = styled.button`
  background-color:rgb(142, 160, 147);
  color: black;
  font-weight: bold;
  border: none;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Press Start 2P', 'Pixelify Sans', monospace;

  &:hover {
    background-color:rgb(60, 114, 82);
  }
`;
